import { useCallback, useEffect, useState } from 'react'

 import './AdminCategories.css'
import { ICategory } from '../../types/ICategories';
import { IAdminCategoriesProps } from '../../types/ICategories';
import fetchCategories from '../../api/fetchCategories';
import { selectReversedCurrentTheme } from '../../store/slices/themeSlice';
import { useAppSelector } from '../../store/store';
export default function AdminCategories({onDelete,onShowCategory}:IAdminCategoriesProps) {


    const reversedCurrentTheme = useAppSelector(selectReversedCurrentTheme)
  
    let [categories, setCategories] = useState<ICategory[]>([])

    const memoizedFetchCategories = useCallback(async () => {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      }, []);
  
      useEffect(()=>{
        memoizedFetchCategories()
      },[memoizedFetchCategories])
  
  
  



    return (
        <div className='admin-categories' style={{ borderColor:reversedCurrentTheme.background }}>
            {categories.map(el => (
                <div className="category" style={{ background: "#eee", color: "#000" }}  key={el.title}>
                    <p className='category-title'>{el.visible_title}</p>
                    <p className="category-link" onClick={()=>onDelete(el.id)}>Delete</p>
                    <p className="category-link" onClick={()=>onShowCategory(el)}>Edit</p>
                    </div>
            ))}
        </div>
    )
   
}



