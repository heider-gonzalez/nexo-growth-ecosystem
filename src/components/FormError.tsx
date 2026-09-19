import { AlertCircle, X } from "lucide-react";

interface FormErrorProps {
  message?: string;
  onDismiss?: () => void;
  className?: string;
}

export function FormError({ message, onDismiss, className = "" }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className={`flex items-start gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 ${className}`}>
      <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
      <p className="text-sm text-destructive flex-1">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-destructive/60 hover:text-destructive transition-colors"
          aria-label="Cerrar error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default FormError;