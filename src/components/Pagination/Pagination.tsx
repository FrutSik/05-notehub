import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { noteService } from "../../services/noteService";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  searchTerm: string;
  onPageChange: (selectedPage: number) => void;
}

const Pagination = ({
  currentPage,
  searchTerm,
  onPageChange,
}: PaginationProps) => {
  const { data } = useQuery({
    queryKey: ["notes", currentPage, searchTerm],
    queryFn: () =>
      noteService.fetchNotes({
        page: currentPage,
        perPage: 12,
        search: searchTerm || undefined,
      }),
  });

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  if (!data || data.totalPages <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      pageCount={data.totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      previousClassName={css.nav}
      nextClassName={css.nav}
      previousLinkClassName={css.navLink}
      nextLinkClassName={css.navLink}
      breakClassName={css.break}
      breakLinkClassName={css.breakLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
