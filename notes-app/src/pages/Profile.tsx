import { useState } from "react";
import { User, StickyNote, Calendar, Edit2, Check, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useNotes } from "@/hooks/useNotes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { user } = useAuth();
  const { profile, isLoading, updateProfile } = useProfile();
  const { notes } = useNotes();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  const startEdit = () => {
    setName(profile?.name ?? "");
    setEditing(true);
  };

  const saveEdit = () => {
    updateProfile.mutate({ name }, { onSuccess: () => setEditing(false) });
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6 md:p-8">
        <Skeleton className="h-8 w-40 mb-8" />
        <Skeleton className="h-60 w-full max-w-lg rounded-xl" />
      </div>
    );
  }

  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="flex-1 p-6 md:p-8 animate-fade-in">
      <h1 className="font-display text-2xl font-bold mb-8">Profile</h1>

      <div className="max-w-lg space-y-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <User className="h-7 w-7" />
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="flex items-center gap-2">
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="h-9" />
                  <Button size="icon" variant="ghost" onClick={saveEdit} disabled={updateProfile.isPending}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setEditing(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-semibold">{profile?.name}</h2>
                  <button onClick={startEdit} className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-muted transition-fast">
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
              )}
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <StickyNote className="h-4 w-4" />
                <span className="text-xs font-medium">Total Notes</span>
              </div>
              <p className="font-display text-2xl font-bold">{notes.length}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-medium">Joined</span>
              </div>
              <p className="font-display text-sm font-bold mt-1">{joined}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
