import { useCallback, useContext, useEffect, useState } from 'react'

import { ThemeContext } from '../../contexts/theme-context'
import './AdminCategories.css'
import { ICategory } from '../../types/ICategory';
import { IAdminCategoriesProps } from '../../types/IAdminCategory';
import fetchCategories from '../../hooks/fetchCategories';
export default function AdminCategories({onDelete,onShowCategory}:IAdminCategoriesProps) {

    let themeData = useContext(ThemeContext);
    if (!themeData) {
        return <div>failed...</div>;
    }
    let [categories, setCategories] = useState<ICategory[]>([])

    const memoizedFetchCategories = useCallback(async () => {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      }, []);
  
      useEffect(()=>{
        memoizedFetchCategories()
      },[memoizedFetchCategories])
  
  
  



    return (
        <div className='admin-categories' style={{ borderColor: themeData.reversedCurrentTheme.background }}>
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



