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
            
            if (result.message === "Category was created") {
              dispatch(showPopUpFn({popUpBg:"green", popUpText:"Category was added successfully"}));
              return {type:"success", message:"Category was added successfully"};

             } else {
              return {type:"error", message:result.message};

      
            }
          } catch (error) {
            console.error(error);
            return {type:"error", message:"An error occurred. Please try again"};

        }
    }

    const onDeleteCategory = async(removedCategoryId:number) =>{
        let deleteConfirm = confirm("Are you sure want to delete this category?");
        if(deleteConfirm){
          try {
          const result = await deleteCategory(removedCategoryId).unwrap();
            if (result.message === "Category was deleted") {
                dispatch(showPopUpFn({popUpBg:"green", popUpText:"Category was deleted succesefully"}));
            } else {
              dispatch(showPopUpFn({popUpBg:"red", popUpText: `Error: ${result.message}`}));
              console.error(result.message);
            }
        } catch (error) {
          console.error('An error occurred. Please try again.');
          }
      }
      }
      const onUpdateCategory = async(category: ICategory)=>{
        try {
          const result = await updateCategory(category).unwrap();
  
          if (result.message === "Category was updated") {
            dispatch(showPopUpFn({popUpBg:"green", popUpText:"Category was updated succesefully"}))
  
          } else {
            dispatch(showPopUpFn({popUpBg:"red", popUpText:`Error: ${result.message}`}))
  
            console.error(result.message);
          }
        } catch (error) {
          console.error('An error occurred. Please try again.');
        }
      }
      const onShowCategory = (category: ICategory)=> {
        setCurrentEditCategory(category);
        setShowCurrentCategory(!showCurrentCategory);
        document.body.classList.toggle('lock');
      }
      
    return (
        <>
            <h1 className='admin-panel-subtitle'>Categories</h1>
            <div className='admin-categories' style={{ borderColor:reversedCurrentTheme.background }}>
                {categories.map(el => (
                    <div className="category" style={{ background: "#eee", color: "#000" }}  key={el.title}>
                        <p className='category-title'>{el.visible_title}</p>
                        <p className="category-link" onClick={()=>onDeleteCategory(el.id)}>Delete</p>
                        <p className="category-link" onClick={()=>onShowCategory(el)}>Edit</p>
                        </div>
                ))}
            </div>
            <h3 className='admin-panel-subtitle'>Update/Delete categories</h3>
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



