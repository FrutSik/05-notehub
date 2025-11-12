import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { noteService } from "../../services/noteService";
import css from "./NoteList.module.css";

interface NoteListProps {
  currentPage: number;
  searchTerm: string;
}

const NoteList = ({ currentPage, searchTerm }: NoteListProps) => {
  const queryClient = useQueryClient();
  const perPage = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", currentPage, searchTerm],
    queryFn: () =>
      noteService.fetchNotes({
        page: currentPage,
        perPage,
        search: searchTerm || undefined,
      }),
  });

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

  if (isLoading) return <div className={css.loading}>Loading...</div>;
  if (error) return <div className={css.error}>Error loading notes</div>;
  if (!data?.notes || data.notes.length === 0) {
    return <div className={css.empty}>No notes found</div>;
  }

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {data.notes.map((note) => (
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
