export function Loader({ text = "Procesando..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <div className="flex flex-row gap-2">
        <div className="w-3 h-3 rounded-full bg-[#00c2ff] animate-bounce [animation-delay:.7s]" />
        <div className="w-3 h-3 rounded-full bg-[#00c2ff] animate-bounce [animation-delay:.3s]" />
        <div className="w-3 h-3 rounded-full bg-[#00c2ff] animate-bounce [animation-delay:.7s]" />
      </div>
      {text && (
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {text}
        </span>
      )}
    </div>
  );
}

export default Loader;
