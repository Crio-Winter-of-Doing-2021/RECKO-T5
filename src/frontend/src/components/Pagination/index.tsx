import ReactPaginate from 'react-paginate'
import './style.css'
export interface PaginationProps {
  page : number
  totalPages : number
  handlePageClick: (selectedItem : {selected: number}) => void
}
 
const Pagination: React.FC<PaginationProps> = ({page, totalPages, handlePageClick}) => {
  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      initialPage={page}
      previousClassName={'previous'}
      nextClassName={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageClassName={'page'}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
  );
}
 
export default Pagination;