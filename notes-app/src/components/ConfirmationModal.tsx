import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({ open, title, description, onConfirm, onCancel }: ConfirmationModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-lg mx-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="font-display text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-5">{description}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
