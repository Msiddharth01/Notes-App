import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Note = Tables<"notes">;

export const useNotes = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const notesQuery = useQuery({
    queryKey: ["notes", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Note[];
    },
    enabled: !!user,
  });

  const createNote = useMutation({
    mutationFn: async (note: { title: string; content: string; tag?: string }) => {
      const { data, error } = await supabase
        .from("notes")
        .insert({ ...note, user_id: user!.id } as TablesInsert<"notes">)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast({ title: "Note created", description: "Your note has been saved." });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteNote = useMutation({
    mutationFn: async (noteId: string) => {
      const { error } = await supabase.from("notes").delete().eq("id", noteId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast({ title: "Note deleted", description: "Your note has been removed." });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return { notes: notesQuery.data ?? [], isLoading: notesQuery.isLoading, createNote, deleteNote };
};
