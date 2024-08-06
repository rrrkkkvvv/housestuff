import {  useEffect, useState } from 'react'

import './AdminCategories.css'
import { ICategory } from '../../types/compontentTypes/ICategories';
import { selectReversedCurrentTheme } from '../../store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useDeleteCategoryMutation, 
    useGetCategoriesQuery, 
    usePostCategoryMutation,
    useUpdateCategoryMutation } from '../../api/modules/categoriesApi';
import CreateCategoryForm from '../CreateCategoryForm';
import { IOnAddCategory } from '../../types/objectTypes/IOnAddCategory';
import { showPopUpFn } from '../../store/slices/popUpSlice';
import Modal from '../Modal';
import { categoriesValues, colors, errorMessage, responseMessages, titles } from '../../values/stringValues';
export default function AdminCategories() {


    const reversedCurrentTheme = useAppSelector(selectReversedCurrentTheme)
    const dispatch = useAppDispatch();
    let [showCurrentCategory, setShowCurrentCategory] = useState(false);
    let [currentEditCategory, setCurrentEditCategory] = useState<ICategory>(Object);

    let [categories, setCategories] = useState<ICategory[]>([])
    const {data} = useGetCategoriesQuery();
    const [postCategory] = usePostCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    useEffect(()=>{
        if(data){
            setCategories(data.records);
        }
    },[data])
  
    

    const onAddCategory:IOnAddCategory = async(newCategory)=>{
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
                dispatch(showPopUpFn({popUpBg:"green", popUpText:categoriesValues.successDelete}));
            } else {
              dispatch(showPopUpFn({popUpBg:"red", popUpText: `Error: ${result.message}`}));
              console.error(result.message);
            }
        } catch (error) {
          console.error(errorMessage);
          }
      }
      }
      const onUpdateCategory = async(category: ICategory)=>{
        try {
          const result = await updateCategory(category).unwrap();
  
          if (result.message === responseMessages.categoriesResponses.successUpdate) {
            dispatch(showPopUpFn({popUpBg:"green", popUpText:categoriesValues.successUpdate}))
  
          } else {
            dispatch(showPopUpFn({popUpBg:"red", popUpText:`Error: ${result.message}`}))
  
            console.error(result.message);
          }
        } catch (error) {
          console.error(errorMessage);
        }
      }
      const onShowCategory = (category: ICategory)=> {
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



