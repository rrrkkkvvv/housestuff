import {  useEffect, useMemo, useState } from 'react';
import { IProduct } from '../../types/compontentTypes/IProducts';
import CreateProductForm from '../../components/CreateProductForm';
import Products from '../Products';
import Modal from '../../components/Modal/Modal';
import AdminCategories from '../../components/AdminCategories';
import './AdminPanel.css'
import { selectPopUp, showPopUpFn } from '../../store/slices/popUpSlice';
import { selectCurrentTheme } from '../../store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useDeleteProductMutation, useGetProductsQuery, usePostProductMutation, useUpdateProductMutation } from '../../api/modules/productsApi';
import Pagination from '../../components/Pagination';
import { IOnAddProduct } from '../../types/objectTypes/IOnAddProduct';

const category = "all";
const itemsPerPage = 6;

const AdminPanel = () => {

  const  isLoggedIn = useAppSelector((state)=> state.login.isLoggedIn);

  if(isLoggedIn){
    const dispatch = useAppDispatch();
    const { popUpBg, popUpText, showPopUp } = useAppSelector(selectPopUp);
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    let [items, setItems] = useState<IProduct[]>([]);

    
    let [showCurrentItem, setShowCurrentItem] = useState(false);
    let [currentEditItem, setCurrentEditItem] = useState<IProduct>(Object);



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
        let deleteConfirm = confirm("Are you sure want to delete this product?");
        if(deleteConfirm){

          try {
            const result = await deleteProduct(removedProductId).unwrap();
            
            if (result.message === "Product was deleted") {
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

    const onAddProduct:IOnAddProduct = async (newProduct)=>{
      try {
    
        const result = await postProduct(newProduct).unwrap();
        if (result.message === "Product was created") {
          return {type:"success", message:"Product was added successfully"};
        } else {
          console.error(result.message);
          return {type:"error", message:result.message};

        }
      } catch (error) {
        console.error(error);

        return {type:"error", message:"An error occurred. Please try again."};
      }
    }

    const onUpdateProduct = async (product: IProduct)=>{
        
        try {
          const result = await updateProduct(product).unwrap()
          if (result.message === "Product was updated") {
            dispatch(showPopUpFn({popUpBg:"green", popUpText:"Product was updated succesefully"}))

 
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

        <CreateProductForm onAddProduct={onAddProduct}/>

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
        <h1>Firstly you must login as admin</h1>
      </div>
    );
  }
};

export default AdminPanel;