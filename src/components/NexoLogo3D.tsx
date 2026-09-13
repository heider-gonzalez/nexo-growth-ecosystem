import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface NexoLogo3DProps {
  onHoverChange?: (hovered: boolean) => void;
  onDragChange?: (dragging: boolean) => void;
}

function NexoXModel({
  onHoverChange,
  onDragChange,
}: {
  onHoverChange: (h: boolean) => void;
  onDragChange: (d: boolean) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const elapsedRef = useRef(0);
  const assemblyRef = useRef(0);
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: -0.05, y: 0.1, z: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const reducedMotionRef = useRef(false);
  const uniformsRef = useRef({ uTime: { value: 0 } });

  const { viewport } = useThree();

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    draggingRef.current = true;
    dragStartRef.current = { x: event.nativeEvent.clientX, y: event.nativeEvent.clientY };
    velocityRef.current = { x: 0, y: 0 };
    event.target.setPointerCapture(event.pointerId);
    onDragChange(true);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const rect =
      event.nativeEvent.target instanceof HTMLElement
        ? event.nativeEvent.target.getBoundingClientRect()
        : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };

    const normX = ((event.nativeEvent.clientX - rect.left) / (rect.width || 1)) * 2 - 1;
    const normY = -(((event.nativeEvent.clientY - rect.top) / (rect.height || 1)) * 2 - 1);
    pointerPosRef.current = { x: normX, y: normY };

    if (!draggingRef.current) return;

    const currentX = event.nativeEvent.clientX;
    const currentY = event.nativeEvent.clientY;
    const deltaX = currentX - dragStartRef.current.x;
    const deltaY = currentY - dragStartRef.current.y;
    const sensitivity = 0.007;

    dragStartRef.current = { x: currentX, y: currentY };
    velocityRef.current = { x: deltaY * sensitivity, y: deltaX * sensitivity };
    targetRotationRef.current.y += deltaX * sensitivity;
    targetRotationRef.current.x += deltaY * sensitivity;

    targetRotationRef.current.x = THREE.MathUtils.clamp(
      targetRotationRef.current.x,
      -Math.PI * 0.5,
      Math.PI * 0.5,
    );
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (draggingRef.current) event.target.releasePointerCapture(event.pointerId);
    draggingRef.current = false;
    onDragChange(false);
  };

  const handlePointerCancel = () => {
    draggingRef.current = false;
    onDragChange(false);
  };

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    const clampedDelta = Math.min(delta, 0.05);
    elapsedRef.current += clampedDelta;
    assemblyRef.current = Math.min(1, assemblyRef.current + clampedDelta / 1.0);
    
    // Actualizar tiempo del shader
    uniformsRef.current.uTime.value = elapsedRef.current;

    const isReduced = reducedMotionRef.current;
    const assembly = 1 - Math.pow(1 - assemblyRef.current, 3);
    const motionStrength = isReduced ? 0 : draggingRef.current ? 0 : 1;

    // Levitación suave anti-gravedad
    const levitationY = isReduced
      ? 0
      : (Math.sin(elapsedRef.current * 0.9) * 0.045 + Math.cos(elapsedRef.current * 0.6) * 0.02) *
        motionStrength;

    // Inclinación parallax sutil reactiva al cursor
    const parallaxTiltX = isReduced ? 0 : -pointerPosRef.current.y * 0.2 * motionStrength;
    const parallaxTiltY = isReduced ? 0 : pointerPosRef.current.x * 0.25 * motionStrength;

    // Física de inercia y fricción natural
    if (!draggingRef.current && !isReduced) {
      targetRotationRef.current.y += velocityRef.current.y * clampedDelta * 60;
      targetRotationRef.current.x += velocityRef.current.x * clampedDelta * 60;
      const friction = Math.pow(0.9, clampedDelta * 60);
      velocityRef.current.x *= friction;
      velocityRef.current.y *= friction;

      // Retorno suave a la perspectiva isométrica elegante
      targetRotationRef.current.x = THREE.MathUtils.lerp(
        targetRotationRef.current.x,
        -0.05,
        0.025 * clampedDelta * 60,
      );
      targetRotationRef.current.y = THREE.MathUtils.lerp(
        targetRotationRef.current.y,
        0.1,
        0.025 * clampedDelta * 60,
      );
    }

    const springDamping = 1 - Math.pow(0.003, clampedDelta);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationRef.current.x + parallaxTiltX,
      springDamping,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationRef.current.y + parallaxTiltY,
      springDamping,
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotationRef.current.z + Math.sin(elapsedRef.current * 0.45) * 0.015 * motionStrength,
      springDamping,
    );
    groupRef.current.position.y = levitationY;

    // Micro-escala responsiva en hover
    const responsiveScale = THREE.MathUtils.clamp(viewport.width / 5.0, 0.78, 1.15);
    const targetScale = hoveredRef.current ? 1.04 : 1.0;
    const currentScale = groupRef.current.scale.x / (responsiveScale * Math.max(0.001, assembly));
    const smoothScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.15);
    groupRef.current.scale.setScalar(responsiveScale * smoothScale * Math.max(0.001, assembly));

    // Luz de brillo dinámico
    if (glowLightRef.current) {
      glowLightRef.current.intensity = THREE.MathUtils.lerp(
        glowLightRef.current.intensity,
        hoveredRef.current ? 1.4 : 0.85,
        0.1,
      );
    }
  });

  // Geometrías precisas de la "X"
  const { barGeometryA, barGeometryB, edgesA, edgesB } = useMemo(() => {
    const shapeA = new THREE.Shape();
    shapeA.moveTo(-1.55, 1.32);
    shapeA.lineTo(-0.85, 1.32);
    shapeA.lineTo(1.55, -1.32);
    shapeA.lineTo(0.85, -1.32);
    shapeA.closePath();

    const shapeB = new THREE.Shape();
    shapeB.moveTo(1.55, 1.32);
    shapeB.lineTo(0.85, 1.32);
    shapeB.lineTo(-1.55, -1.32);
    shapeB.lineTo(-0.85, -1.32);
    shapeB.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.045,
      bevelThickness: 0.035,
    };

    const geomA = new THREE.ExtrudeGeometry(shapeA, extrudeSettings);
    const geomB = new THREE.ExtrudeGeometry(shapeB, extrudeSettings);
    geomA.center();
    geomB.center();

    const edgeA = new THREE.EdgesGeometry(geomA, 28);
    const edgeB = new THREE.EdgesGeometry(geomB, 28);

    return { barGeometryA: geomA, barGeometryB: geomB, edgesA: edgeA, edgesB: edgeB };
  }, []);

  // Material de la X: Restaurando colores exactos de Nexo con shader sutil inyectado
  const { armMaterialCyan, armMaterialDeepBlue } = useMemo(() => {
    const onBeforeCompile = (shader: THREE.Shader) => {
      shader.uniforms.uTime = uniformsRef.current.uTime;
      shader.vertexShader = `
        varying vec3 vPos;
        ${shader.vertexShader}
      `.replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
         vPos = position;`
      );
      
      shader.fragmentShader = `
        uniform float uTime;
        varying vec3 vPos;
        ${shader.fragmentShader}
      `.replace(
        `#include <color_fragment>`,
        `#include <color_fragment>
        
        vec2 uv = vPos.xy * 1.2;
        float time = uTime * 0.6;
        
        // Distorsión líquida
        vec2 flow = uv;
        flow.x += sin(uv.y * 2.5 + time) * 0.1;
        flow.y += cos(uv.x * 2.5 + time * 0.8) * 0.1;
        
        // Efecto líquido interior (Mantiene el cyan, solo agrega un brillo sutil en movimiento)
        float wave = sin(flow.x * 3.0 - time) * cos(flow.y * 3.0 + time);
        wave = smoothstep(-1.0, 1.0, wave);
        
        // Mezcla muy suave de luz hacia blanco/cyan más claro
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.5, 0.95, 1.0), wave * 0.3);
        `
      ).replace(
        `#include <emissivemap_fragment>`,
        `#include <emissivemap_fragment>
        
        // Re-calculamos flow para emisivo (Circuitos)
        vec2 uv2 = vPos.xy * 0.85; // Menos líneas, más espaciadas
        float t2 = uTime * 0.35; // Animación mucho más lenta y elegante
        vec2 flow2 = uv2;
        flow2.x += sin(uv2.y * 2.0 + t2) * 0.12;
        flow2.y += cos(uv2.x * 2.0 + t2 * 0.8) * 0.12;

        // Trazos de circuito rectos (más finos y suaves)
        float gridX = smoothstep(0.985, 1.0, abs(sin(flow2.x * 6.0)));
        float gridY = smoothstep(0.985, 1.0, abs(sin(flow2.y * 6.0)));
        
        // Pulsos de datos más amplios y sutiles
        float pulseX = smoothstep(0.6, 1.0, sin(flow2.x * 3.0 - t2 * 3.0));
        float pulseY = smoothstep(0.6, 1.0, sin(flow2.y * 3.0 - t2 * 3.0));
        
        // Nodos en intersecciones (reducidos en intensidad)
        float nodes = smoothstep(0.98, 1.0, abs(sin(flow2.x * 6.0))) * smoothstep(0.98, 1.0, abs(sin(flow2.y * 6.0)));
        float nodePulse = smoothstep(0.5, 1.0, sin(flow2.x * 2.0 + flow2.y * 2.0 - t2 * 2.0));
        
        // Combinamos malla de circuito + datos (menos intensidad general)
        float circuit = max(gridX * pulseX, gridY * pulseY) * 0.5 + (nodes * nodePulse * 1.0);
        
        // Emitir luz brillante pura blanca/cyan por donde pasa el dato
        vec3 techGlow = vec3(0.9, 1.0, 1.0);
        totalEmissiveRadiance += techGlow * circuit * 1.2;
        `
      );
    };

    // Color EXACTO Nexo Cyan (#00c2ff)
    const matCyan = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#00c2ff"),
      emissive: new THREE.Color("#00c2ff"),
      emissiveIntensity: 0.15,
      metalness: 0.6,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    matCyan.onBeforeCompile = onBeforeCompile;

    // Color Nexo Azul Profundo (#0284c7)
    const matBlue = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0284c7"),
      emissive: new THREE.Color("#0284c7"),
      emissiveIntensity: 0.1,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.8,
    });
    matBlue.onBeforeCompile = onBeforeCompile;

    return { armMaterialCyan: matCyan, armMaterialDeepBlue: matBlue };
  }, []);

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        hoveredRef.current = true;
        onHoverChange(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        if (!draggingRef.current) {
          hoveredRef.current = false;
          onHoverChange(false);
        }
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerMissed={handlePointerCancel}
    >
      <pointLight
        ref={glowLightRef}
        position={[0, 0, 1.8]}
        color="#00c2ff"
        intensity={0.9}
        distance={5}
      />

      {/* Brazo Diagonal 1 (Frente - Cyan) */}
      <mesh geometry={barGeometryA} material={armMaterialCyan} position={[0, 0, 0.02]} />
      {/* Bordes High-Tech en blanco translucido para limpieza visual */}
      <lineSegments geometry={edgesA} position={[0, 0, 0.02]}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </lineSegments>

      {/* Brazo Diagonal 2 (Fondo - Azul Profundo) */}
      <mesh geometry={barGeometryB} material={armMaterialDeepBlue} position={[0, 0, -0.04]} />
      <lineSegments geometry={edgesB} position={[0, 0, -0.04]}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

export default function NexoLogo3D() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const cursorClass = dragging ? "cursor-grabbing" : hovered ? "cursor-grab" : "cursor-grab";

  return (
    <div className={`relative h-full w-full select-none ${cursorClass}`}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onPointerMissed={() => setDragging(false)}
      >
        <ambientLight intensity={0.8} color="#ffffff" />
        <directionalLight position={[4, 5, 4]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-4, -2, -2]} intensity={1.0} color="#00c2ff" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#00c2ff" distance={6} />

        <NexoXModel onHoverChange={(h) => setHovered(h)} onDragChange={(d) => setDragging(d)} />
      </Canvas>
    </div>
  );
}
