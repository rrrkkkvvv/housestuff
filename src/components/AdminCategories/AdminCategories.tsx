import {  useEffect, useState } from 'react'

import './AdminCategories.css'
import { ICategory } from '../../types/compontentTypes/ICategories';
import { IAdminCategoriesProps } from '../../types/compontentTypes/ICategories';
import { selectReversedCurrentTheme } from '../../store/slices/themeSlice';
import { useAppSelector } from '../../store/store';
import { useGetCategoriesQuery } from '../../api/categoriesApi';
export default function AdminCategories({onDelete,onShowCategory}:IAdminCategoriesProps) {


    const reversedCurrentTheme = useAppSelector(selectReversedCurrentTheme)
  
    let [categories, setCategories] = useState<ICategory[]>([])
    const {data, refetch} = useGetCategoriesQuery();

    useEffect(()=>{
        if(data){
            setCategories(data.records);
        }
    },[data])
  
    
    useEffect(()=>{
        refetch();
    },[categories, refetch])



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



