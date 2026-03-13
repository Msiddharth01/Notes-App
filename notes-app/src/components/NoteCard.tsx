import { Trash2, Tag } from "lucide-react";
import type { Note } from "@/hooks/useNotes";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  const date = new Date(note.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group rounded-lg border border-border bg-card p-5 transition-fast hover:shadow-card-hover animate-fade-in">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-base font-semibold leading-snug line-clamp-1">{note.title}</h3>
        <button
          onClick={() => onDelete(note.id)}
          className="opacity-0 group-hover:opacity-100 transition-fast h-8 w-8 flex items-center justify-center rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
        {note.content || "No content"}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{date}</span>
        {note.tag && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            <Tag className="h-3 w-3" />
            {note.tag}
          </span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
