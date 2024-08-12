import {  useEffect, useState } from 'react'

import { TCategoriesProps } from '../../types/compontentTypes/TCategories';
import './Categories.css'
import { selectReversedCurrentTheme } from '../../store/slices/theme/themeSlice';
import { useAppSelector } from '../../store/store';
import { useGetCategoriesQuery } from '../../api/modules/categoriesApi';
import { categoryHeight } from '../../values/intValues';
import { colors } from '../../values/stringValues';

export default function Categories({ chooseCategory }: TCategoriesProps) {
    const [maxHeight, setMaxHeight] = useState(50);
    const [isExpanded, setIsExpanded] = useState(false);

    const reversedCurrentTheme = useAppSelector(selectReversedCurrentTheme)
  
    let [categories, setCategories] = useState([
        {
            id: 0,
            title: 'all',
            visible_title: "All"
        },
    ])
    const {data} = useGetCategoriesQuery();

    useEffect(()=>{
        if(data){
            setCategories([{
                id: 0,
                title:"all",
                visible_title:"All",
              }, ...data.records]
            );
        }
    },[data])
  





    return (
        <div className='categories'   style={{ borderColor: reversedCurrentTheme.background,  maxHeight: isExpanded ? `${maxHeight}px` : `${categoryHeight}px` } }>
            <div className="category category-choose" style={{ background: reversedCurrentTheme.background, color: reversedCurrentTheme.color }} onClick={() => showCategories()}>Choose Category </div>
            {categories.map(el => (
                <div className="category" style={{ background: colors.lightGrayColor, color: colors.blackColor }} onClick={() => chooseCategory(el.title)} key={el.title}>{el.visible_title}</div>
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



