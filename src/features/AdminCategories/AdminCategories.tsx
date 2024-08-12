import {  useEffect, useState } from 'react'

import './AdminCategories.css'
import { TCategory } from '../../types/objectTypes/TCategory';
import { selectReversedCurrentTheme } from '../../store/slices/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useDeleteCategoryMutation, 
    useGetCategoriesQuery, 
    usePostCategoryMutation,
    useUpdateCategoryMutation } from '../../api/modules/categoriesApi';
import CreateCategoryForm from './CreateCategoryForm';
import { TOnAddCategory } from '../../types/objectTypes/TOnAddCategory';
import Modal from '../Modal';
import { categoriesValues, colors, errorMessage, responseMessages, titles } from '../../values/stringValues';
import { showPopUpCaller } from '../../store/slices/popUp/thunks/showPopUpThunk';
export default function AdminCategories() {


    const reversedCurrentTheme = useAppSelector(selectReversedCurrentTheme)
    const dispatch = useAppDispatch();
    let [showCurrentCategory, setShowCurrentCategory] = useState(false);
    let [currentEditCategory, setCurrentEditCategory] = useState<TCategory>(Object);

    let [categories, setCategories] = useState<TCategory[]>([])
    const {data} = useGetCategoriesQuery();
    const [postCategory] = usePostCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    useEffect(()=>{
        if(data){
            setCategories(data.records);
        }
    },[data])
  
    

    const onAddCategory:TOnAddCategory = async(newCategory)=>{
        try {
      
            const result = await postCategory(newCategory).unwrap()
            
            if (result.message === responseMessages.categoriesResponses.successAdd) {
              return {type:"success", message:categoriesValues.successAdd};

             } else {
              return {type:"error", message:result.message};

      
            }
          } catch (error) {
            console.error(error);
            return {type:"error", message: errorMessage};

        }
    }

    const onDeleteCategory = async(removedCategoryId:number) =>{
        let deleteConfirm = confirm(categoriesValues.deleteConfirm);
        if(deleteConfirm){
          try {
          const result = await deleteCategory(removedCategoryId).unwrap();
            if (result.message === responseMessages.categoriesResponses.successDelete) {
                dispatch(showPopUpCaller({popUpBg:"green", popUpText:categoriesValues.successDelete}));
            } else {
              dispatch(showPopUpCaller({popUpBg:"red", popUpText: `Error: ${result.message}`}));
              console.error(result.message);
            }
        } catch (error) {
          console.error(errorMessage);
          }
      }
      }
      const onUpdateCategory = async(category: TCategory)=>{
        try {
          const result = await updateCategory(category).unwrap();
  
          if (result.message === responseMessages.categoriesResponses.successUpdate) {
            dispatch(showPopUpCaller({popUpBg:"green", popUpText:categoriesValues.successUpdate}))
  
          } else {
            dispatch(showPopUpCaller({popUpBg:"red", popUpText:`Error: ${result.message}`}))
  
            console.error(result.message);
          }
        } catch (error) {
          console.error(errorMessage);
        }
      }
      const onShowCategory = (category: TCategory)=> {
        setCurrentEditCategory(category);
        setShowCurrentCategory(!showCurrentCategory);
        document.body.classList.toggle('lock');
      }
      
    return (
        <>
            <h1 className='admin-panel-subtitle'>{titles.categories}</h1>
            <div className='admin-categories' style={{ borderColor:reversedCurrentTheme.background }}>
                {categories.map(el => (
                    <div className="category" style={{ background:colors.lightGrayColor, color: colors.blackColor}}  key={el.title}>
                        <p className='category-title'>{el.visible_title}</p>
                        <p className="category-link" onClick={()=>onDeleteCategory(el.id)}>Delete</p>
                        <p className="category-link" onClick={()=>onShowCategory(el)}>Edit</p>
                        </div>
                ))}
            </div>
            <h3 className='admin-panel-subtitle'>{titles.editCategory}</h3>
            <CreateCategoryForm onAddCategory={onAddCategory} />
            <Modal
          type='edit category'
          category={currentEditCategory} 
          onShowCategory={()=>{
            setShowCurrentCategory(!showCurrentCategory); 
            document.body.classList.toggle('lock');
          }}
          show={showCurrentCategory}
          updateCategory={onUpdateCategory}
        />
        </>
    )
   
}



