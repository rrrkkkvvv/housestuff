import { useContext, useEffect, useState } from 'react'

import { ThemeContext } from '../../contexts/theme-context'
import { ICategoriesProps } from './ICategories';
import '../../styles/app_styles/categories.css'
export default function Categories({ chooseCategory }: ICategoriesProps) {

    let themeData = useContext(ThemeContext);
    if (!themeData) {
        return <div>failed...</div>;
    }
    let [categories, setCategories] = useState([
        {
            id: 0,
            title: 'all',
            visible_title: "All"
        },
])
    useEffect(()=>{
        fetch('http://localhost/projects/housestuffbackend/servicies/categories_service.php')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setCategories([{
                id: 0,
                title:"all",
                visible_title:"All",
              }, ...data.records])
        })
        .catch((error) => {
          console.error('Error here!:', error);
          setCategories([{
            id: 0,
            title:"all",
            visible_title:"All",
          }])
        //   setCurrentItems([]);
        //   setItems([]);
        })
    },[])


    return (
        <div className='categories' style={{ borderColor: themeData.reversedCurrentTheme.background }}>
            <div className="category category-choose" style={{ background: themeData.reversedCurrentTheme.background, color: themeData.reversedCurrentTheme.color }} onClick={() => showCategories()}>Choose Category </div>
            {categories.map(el => (
                <div className="category" style={{ background: "#eee", color: "#000" }} onClick={() => chooseCategory(el.title)} key={el.title}>{el.visible_title}</div>
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



