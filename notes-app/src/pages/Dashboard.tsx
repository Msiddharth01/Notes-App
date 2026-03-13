import { useState, useMemo } from "react";
import { Plus, Search, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/hooks/useNotes";
import NoteCard from "@/components/NoteCard";
import CreateNoteModal from "@/components/CreateNoteModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import EmptyState from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { notes, isLoading, createNote, deleteNote } = useNotes();
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return notes;
    const q = search.toLowerCase();
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tag?.toLowerCase().includes(q)
    );
  }, [notes, search]);

  const handleCreate = (note: { title: string; content: string; tag?: string }) => {
    createNote.mutate(note, { onSuccess: () => setShowCreate(false) });
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteNote.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">{notes.length} note{notes.length !== 1 ? "s" : ""}</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Create Note
        </Button>
      </div>

      {notes.length > 0 && (
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-fast"
          />
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        notes.length === 0 ? (
          <EmptyState
            icon={StickyNote}
            title="No notes yet"
            description="Create your first note to get started."
            action={
              <Button onClick={() => setShowCreate(true)} className="gap-2">
                <Plus className="h-4 w-4" /> Create Note
              </Button>
            }
          />
        ) : (
          <EmptyState
            icon={Search}
            title="No results"
            description="No notes match your search. Try different keywords."
          />
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={setDeleteId} />
          ))}
        </div>
      )}

      <CreateNoteModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreate}
        isSubmitting={createNote.isPending}
      />

      <ConfirmationModal
        open={!!deleteId}
        title="Delete note?"
        description="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default Dashboard;
