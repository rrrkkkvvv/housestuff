import { IPaginationProps } from '../../types/IPagination';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import './Pagination.css'
import { useAppSelector } from '../../hooks/reduxHooks';
export default function Pagination({ itemsPerPage, totalItems, paginateFn, currentPage, prevPage, nextPage }: IPaginationProps) {

    
    const reversedCurrentTheme = useAppSelector((state)=> state.theme.reversedCurrentTheme)
    


    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    if (pageNumbers.length > 1) {
        return (
            <div className='pag-wrapper' >
                <button className="pag-btn" style={{ background: reversedCurrentTheme.background, color: reversedCurrentTheme.color }} onClick={prevPage}><FaAngleLeft /></button>

                <div className='pagination'>

                    {
                        pageNumbers.map((number) => (
                            <div className={`page-item ${number === currentPage ? 'current' : ''}`} style={{ background: reversedCurrentTheme.background, color: reversedCurrentTheme.color }} key={number} onClick={(e) => paginateFn(number, e)}>
                                <span className='page-link' >
                                    {number}
                                </span >

                            </div>
                        ))
                    }

                </div>
                <button className="pag-btn" style={{ background: reversedCurrentTheme.background, color: reversedCurrentTheme.color }} onClick={nextPage}><FaAngleRight /></button>

            </div>
        )
    }

}
