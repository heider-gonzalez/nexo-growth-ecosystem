import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold cursor-pointer transition-all duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-t border-white/35 shadow-[0_1px_2px_rgba(0,194,255,0.2),0_4px_16px_-2px_rgba(0,194,255,0.38)] hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        outline:
          "border border-border/80 bg-background/60 backdrop-blur-xs shadow-2xs hover:bg-accent hover:text-accent-foreground hover:border-border hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-2xs hover:bg-secondary/80 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
        ghost: "hover:bg-accent/70 hover:text-accent-foreground active:scale-[0.97]",
        link: "text-primary underline-offset-4 hover:underline active:scale-[0.99]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-2xl px-7 text-base",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
