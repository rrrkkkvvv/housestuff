import { useContext, useEffect, useState } from 'react'

import { ThemeContext } from '../../contexts/theme-context'
import './AdminCategories.css'
import { ICategory } from '../../types/ICategory';
import { IAdminCategoriesProps } from '../../types/IAdminCategory';
export default function AdminCategories({onDelete,onShowCategory}:IAdminCategoriesProps) {

    let themeData = useContext(ThemeContext);
    if (!themeData) {
        return <div>failed...</div>;
    }
    let [categories, setCategories] = useState<ICategory[]>([])
    useEffect(()=>{
        fetch('http://localhost/projects/housestuffbackend/servicies/categories_service.php')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setCategories(data.records)
        })
        .catch((error) => {
          console.error('Error here!:', error);
          setCategories([])
        })
    },[])


    return (
        <div className='admin-categories' style={{ borderColor: themeData.reversedCurrentTheme.background }}>
            {/* <div className="category category-choose" style={{ background: themeData.reversedCurrentTheme.background, color: themeData.reversedCurrentTheme.color }} onClick={() => showCategories()}>Choose Category </div> */}
            {categories.map(el => (
                <div className="category" style={{ background: "#eee", color: "#000" }}  key={el.title}>
                    <p className='category-title'>{el.visible_title}</p>
                    <p className="category-link" onClick={()=>onDelete(el.id)}>Delete</p>
                    <p className="category-link" onClick={()=>onShowCategory(el)}>Edit</p>
                    </div>
            ))}
        </div>
    )
    function showCategories() {
        document.querySelector('.categories')?.classList.toggle('visible');

        // if (window.screen.width <= 645) {

        //     if (document.querySelector('.categories')?.classList.contains('visible')) {
        //         document.querySelector('.categories')?.classList.remove('height-transition');

        //         setTimeout(() => {
        //             document.querySelector('.categories')?.classList.remove('visible');
        //         }, 500)
        //     } else {
        //         document.querySelector('.categories')?.classList.add('visible');
        //         setTimeout(() => {
        //             document.querySelector('.categories')?.classList.add('height-transition');
        //         }, 500);
        //     }
        // } else {
        //     document.querySelector('.categories')?.classList.remove('height-transition');
        //     document.querySelector('.categories')?.classList.toggle('visible');

        // }
    }
}



