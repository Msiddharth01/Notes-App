import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CreateNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (note: { title: string; content: string; tag?: string }) => void;
  isSubmitting?: boolean;
}

const CreateNoteModal = ({ open, onClose, onSubmit, isSubmitting }: CreateNoteModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim(), tag: tag.trim() || undefined });
    setTitle("");
    setContent("");
    setTag("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-lg mx-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-bold">Create Note</h2>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted transition-fast">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Note title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea placeholder="Write your note..." value={content} onChange={(e) => setContent(e.target.value)} rows={5} />
          <Input placeholder="Tag (optional)" value={tag} onChange={(e) => setTag(e.target.value)} />
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!title.trim() || isSubmitting}>
              {isSubmitting ? "Saving..." : "Create Note"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;
