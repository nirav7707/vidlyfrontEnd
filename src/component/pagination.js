import React from 'react';
import _ from "lodash"
const Pagination = (props) => {
    
    const {pageSize ,totalItem ,currentPage,onClick,handlePrevious,handleNext}=props;
    let countPage = Math.ceil(totalItem/pageSize)
    countPage = countPage === 1 ? 0 :countPage; 
    const pages = _.range(1,countPage+1)

    return ( 
        
        <ul className="pagination">
        {currentPage > 1 ?<li className="page-item"><a className="page-link" onClick={handlePrevious}>Previous</a></li>: null }
        {pages.map(page =>(
            <li key={page} className={currentPage === page ? "page-item active" : "page-item"}><a onClick={()=>onClick(page)} className="page-link">{page}</a></li>
        ))}
        {currentPage<pages.length ?<li className="page-item"><a className="page-link" onClick={handleNext}>Next</a></li>:null}
        </ul>

    );
}
 
export default Pagination;