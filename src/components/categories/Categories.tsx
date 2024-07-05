import { useCallback, useContext, useEffect, useState } from 'react'

import { ThemeContext } from '../../contexts/theme-context'
import { ICategoriesProps } from '../../types/ICategories';
import './Categories.css'
import fetchCategories from '../../api/fetchCategories';
const categoryHeight = 50;

export default function Categories({ chooseCategory }: ICategoriesProps) {
    const [maxHeight, setMaxHeight] = useState(50);
    const [isExpanded, setIsExpanded] = useState(false);

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

    const memoizedFetchCategories = useCallback(async () => {
        const fetchedCategories = await fetchCategories();
        setCategories([{
            id: 0,
            title:"all",
            visible_title:"All",
          }, ...fetchedCategories]
        );
        
     }, []);

    useEffect(()=>{
        memoizedFetchCategories()
    },[memoizedFetchCategories])





    return (
        <div className='categories'   style={{ borderColor: themeData.reversedCurrentTheme.background,  maxHeight: isExpanded ? `${maxHeight}px` : `${categoryHeight}px` } }>
            <div className="category category-choose" style={{ background: themeData.reversedCurrentTheme.background, color: themeData.reversedCurrentTheme.color }} onClick={() => showCategories()}>Choose Category </div>
            {categories.map(el => (
                <div className="category" style={{ background: "#eee", color: "#000" }} onClick={() => chooseCategory(el.title)} key={el.title}>{el.visible_title}</div>
            ))}
        </div>
    )
    function showCategories() {

        if(window.innerWidth <=710){
            if(isExpanded === false){
                setIsExpanded(true)
                setMaxHeight(categories.length * categoryHeight + categoryHeight)

            }else{
                setIsExpanded(false)
                setMaxHeight(categoryHeight)
            }
        }else{

            document.querySelector('.categories')?.classList.toggle('visible');
        }

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



