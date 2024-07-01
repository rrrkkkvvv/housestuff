import { useContext } from 'react';
import { IPaginationProps } from './IPagination';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ThemeContext } from '../../contexts/theme-context';
import '../../styles/app_styles/pagination.css'
export default function Pagination({ itemsPerPage, totalItems, paginateFn, currentPage, prevPage, nextPage }: IPaginationProps) {

    const themeData = useContext(ThemeContext);

    if (!themeData) {
        return <div>failed...</div>;
    }


    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    if (pageNumbers.length > 1) {
        return (
            <div className='pag-wrapper' >
                <button className="pag-btn" style={{ background: themeData.reversedCurrentTheme.background, color: themeData.reversedCurrentTheme.color }} onClick={prevPage}><FaAngleLeft /></button>

                <div className='pagination'>

                    {
                        pageNumbers.map((number) => (
                            <div className={`page-item ${number === currentPage ? 'current' : ''}`} style={{ background: themeData.reversedCurrentTheme.background, color: themeData.reversedCurrentTheme.color }} key={number} onClick={(e) => paginateFn(number, e)}>
                                <span className='page-link' >
                                    {number}
                                </span >

                            </div>
                        ))
                    }

                </div>
                <button className="pag-btn" style={{ background: themeData.reversedCurrentTheme.background, color: themeData.reversedCurrentTheme.color }} onClick={nextPage}><FaAngleRight /></button>

            </div>
        )
    }

}
