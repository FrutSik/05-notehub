import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      pageCount={totalPages}
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
