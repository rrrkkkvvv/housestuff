import {  useEffect, useMemo, useState } from 'react';
import { IProduct } from '../../types/compontentTypes/IProducts';
import CreateProductForm from '../../components/CreateProductForm';
import Products from '../Products';
import CreateCategoryForm from '../../components/CreateCategoryForm';
import Modal from '../../components/Modal/Modal';
import AdminCategories from '../../components/AdminCategories';
import { ICategory } from '../../types/compontentTypes/ICategories';
import './AdminPanel.css'
import { selectPopUp, showPopUpFn } from '../../store/slices/popUpSlice';
import { selectCurrentTheme } from '../../store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../../api/productsApi';
import Pagination from '../../components/Pagination';
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from '../../api/categoriesApi';

const category = "all";
const itemsPerPage = 6;

const AdminPanel = () => {

  const  isLoggedIn = useAppSelector((state)=> state.login.isLoggedIn);

  if(isLoggedIn){
    const dispatch = useAppDispatch();
    const { popUpBg, popUpText, showPopUp } = useAppSelector(selectPopUp);
    //  [..., {isLoading, isSuccess, isError, error: postError}]
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    let [items, setItems] = useState<IProduct[]>([]);

    
    let [showCurrentItem, setShowCurrentItem] = useState(false);
    let [currentEditItem, setCurrentEditItem] = useState<IProduct>(Object);

    let [showCurrentCategory, setShowCurrentCategory] = useState(false);
    let [currentEditCategory, setCurrentEditCategory] = useState<ICategory>(Object);


    const currentTheme = useAppSelector(selectCurrentTheme)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItemsQuantity, setTotalItemsQuantity] = useState<number>(1);

    const { data, refetch } = useGetProductsQuery({ page: currentPage, limit: itemsPerPage, category:category });

    useEffect(() => {
      if (data) {
        setItems(data.records);
        setTotalItemsQuantity(data.pagination.total);
      }
    }, [data]);

    useEffect(() => {
      refetch();
    }, [items,refetch]);

    const pageQuantity = useMemo(() => {
      return Math.ceil(totalItemsQuantity / itemsPerPage);
    }, [totalItemsQuantity]);
  
    const paginate = (pageNumber: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();
      setCurrentPage(pageNumber);
    };
  
    const nextPage = (): void => {
      setCurrentPage((prev) => (prev < pageQuantity ? prev + 1 : 1));
    };
  
    const prevPage = (): void => {
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : pageQuantity));
    };
  



    const onDeleteProduct = async(removedProductId:number)=>{
        let deleteConfirm = confirm("Are you sure want to delete this product?");
        if(deleteConfirm){

          try {
            const result = await deleteProduct(removedProductId).unwrap();
            
            if (result.message === "Product was deleted") {
            setItems(items = items.filter(el => el.id !== removedProductId));
            dispatch(showPopUpFn({popUpBg:"green", popUpText:"Product was deleted succesefully"}))
          } else {
            dispatch(showPopUpFn({popUpBg:"red", popUpText:`Error: ${result.message}`}))
            console.error(result.message);

          }

        
      } catch (error) {
          console.error('An error occurred. Please try again.');
      }
    }

    }
    const onShowItem = (item: IProduct) =>{
        setCurrentEditItem(item);
        setShowCurrentItem(!showCurrentItem);
        document.body.classList.toggle('lock');
    
    }
    const onUpdateProduct = async (product: IProduct)=>{
        
        try {
          const result = await updateProduct(product).unwrap()
          if (result.message === "Product was updated") {
            dispatch(showPopUpFn({popUpBg:"green", popUpText:"Product was updated succesefully"}))
            const updatedItems = items.filter((item)=>item.id === product.id ? product : item)
            setItems(updatedItems)
 
          } else {
            dispatch(showPopUpFn({popUpBg:"red", popUpText:`Error: ${result.message}`}))
            console.error(result.message);
          }
      } catch (error) {
          console.error('An error occurred. Please try again.');
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
    const onShowCategory = (category: ICategory)=> {
      setCurrentEditCategory(category);
      setShowCurrentCategory(!showCurrentCategory);
      document.body.classList.toggle('lock');
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
      

    return (
      <div className='wrapper' style={{ background:  currentTheme.background, color:  currentTheme.color }}>

        <h1 className='admin-panel-title'>Admin Panel</h1>


        <h1 className='admin-panel-subtitle'>Products</h1>

        <CreateProductForm/>

        <h3 className='admin-panel-subtitle'>Update/Delete products</h3>
        <Products onShowItem={onShowItem} type='admin' onDelete={onDeleteProduct}  items={items} />
        <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        paginateFn={paginate}
        itemsPerPage={itemsPerPage}
        totalItems={totalItemsQuantity}
        />
        
        
        <h1 className='admin-panel-subtitle'>Categories</h1>
        <CreateCategoryForm/>
        <h3 className='admin-panel-subtitle'>Update/Delete categories</h3>
        <AdminCategories onDelete={onDeleteCategory} onShowCategory={onShowCategory}/>
        <Modal
          type='edit product'
          item={currentEditItem} 
          onShowItem={()=>{
            setShowCurrentItem(!showCurrentItem); 
            document.body.classList.toggle('lock');
          }}
          show={showCurrentItem} 
          updateProduct={onUpdateProduct}
        />
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
      <div className={`notification ${showPopUp ? 'visible' : ''} ${popUpBg}`}>
        <p>{popUpText}</p>
      </div>
      </div>

    );
  }else{
    
    return (
      <div>
        <h1>Firstly you must login as admin</h1>
      </div>
    );
  }
};

export default AdminPanel;