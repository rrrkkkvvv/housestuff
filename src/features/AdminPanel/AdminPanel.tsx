import {  useEffect, useMemo, useState } from 'react';
import { TProduct } from '../../types/objectTypes/TProduct';
import CreateProductForm from '../../components/CreateProductForm';
import Products from '../Products';
import Modal from '../../components/Modal/Modal';
import AdminCategories from '../../components/AdminCategories';
import './AdminPanel.css'
import { selectPopUp } from '../../store/slices/popUp/popUpSlice';
import { selectCurrentTheme } from '../../store/slices/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useDeleteProductMutation, useGetProductsQuery, usePostProductMutation, useUpdateProductMutation } from '../../api/modules/productsApi';
import Pagination from '../../components/Pagination';
import { TOnAddProduct } from '../../types/objectTypes/TOnAddProduct';
import { itemsPerPage } from '../../values/intValues';
import { authError, errorMessage, producsValues, responseMessages, titles } from '../../values/stringValues';
import { showPopUpCaller } from '../../store/slices/popUp/thunks/showPopUpThunk';

const category = "all";

const AdminPanel = () => {

  const  isLoggedIn = useAppSelector((state)=> state.login.isLoggedIn);

  if(isLoggedIn){
    const dispatch = useAppDispatch();
    const { popUpBg, popUpText, showPopUp } = useAppSelector(selectPopUp);
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    let [items, setItems] = useState<TProduct[]>([]);

    
    let [showCurrentItem, setShowCurrentItem] = useState(false);
    let [currentEditItem, setCurrentEditItem] = useState<TProduct>(Object);



    const currentTheme = useAppSelector(selectCurrentTheme)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItemsQuantity, setTotalItemsQuantity] = useState<number>(1);

    const { data } = useGetProductsQuery({ page: currentPage, limit: itemsPerPage, category:category });
    const [postProduct] = usePostProductMutation();

    useEffect(() => {
      if (data) {
        setItems(data.records);
        setTotalItemsQuantity(data.pagination.total);
      }
    }, [data]);



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
        let deleteConfirm = confirm(producsValues.deleteConfirm);
        if(deleteConfirm){

          try {
            const result = await deleteProduct(removedProductId).unwrap();
            
            if (result.message === responseMessages.producsResponses.successDelete) {
              dispatch(showPopUpCaller({popUpBg:"green", popUpText:producsValues.successDelete}))
          } else {
            dispatch(showPopUpCaller({popUpBg:"red", popUpText:`Error: ${result.message}`}))
            console.error(result.message);

          }

        
      } catch (error) {
          console.error(errorMessage);
      }
    }

    }
    const onShowItem = (item: TProduct) =>{
        setCurrentEditItem(item);
        setShowCurrentItem(!showCurrentItem);
        document.body.classList.toggle('lock');
    
    }

    const onAddProduct:TOnAddProduct = async (newProduct)=>{
      try {
    
        const result = await postProduct(newProduct).unwrap();
        if (result.message === responseMessages.producsResponses.successAdd) {
          return {type:"success", message: producsValues.successAdd};
        } else {
          console.error(result.message);
          return {type:"error", message:result.message};

        }
      } catch (error) {
        console.error(error);

        return {type:"error", message:errorMessage};
      }
    }

    const onUpdateProduct = async (product: TProduct)=>{
        
        try {
          const result = await updateProduct(product).unwrap()
          if (result.message === responseMessages.producsResponses.successUpdate) {
            dispatch(showPopUpCaller({popUpBg:"green", popUpText:producsValues.successUpdate}))

 
          } else {
            dispatch(showPopUpCaller({popUpBg:"red", popUpText:`Error: ${result.message}`}))
            console.error(result.message);
          }
      } catch (error) {
          console.error(errorMessage);
      }
    }
      

    


    return (
      <div className='wrapper' style={{ background:  currentTheme.background, color:  currentTheme.color }}>

        <h1 className='admin-panel-title'>{titles.adminPanel}</h1>


        <h1 className='admin-panel-subtitle'>{titles.products}</h1>

        <CreateProductForm onAddProduct={onAddProduct}/>

        <h3 className='admin-panel-subtitle'>{titles.editProdcut}</h3>
        <Products onShowItem={onShowItem} type='admin' onDelete={onDeleteProduct}  items={items} />
        <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
        paginateFn={paginate}
        itemsPerPage={itemsPerPage}
        totalItems={totalItemsQuantity}
        />
        
        
    
        <AdminCategories />
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
     
      <div className={`notification ${showPopUp ? 'visible' : ''} ${popUpBg}`}>
        <p>{popUpText}</p>
      </div>
      </div>

    );
  }else{
    
    return (
      <div>
        <h1>{authError}</h1>
      </div>
    );
  }
};

export default AdminPanel;