import { useMutation, useQueryClient } from "@tanstack/react-query";
import { noteService } from "../../services/noteService";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: noteService.deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = async (noteId: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteMutation.mutateAsync(noteId);
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  if (!notes || notes.length === 0) {
    return <div className={css.empty}>No notes found</div>;
  }

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
