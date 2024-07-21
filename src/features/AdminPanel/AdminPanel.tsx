import { useCallback, useEffect, useMemo, useState } from 'react';
import { IProduct } from '../../types/compontentTypes/IProducts';
import CreateProductForm from '../../components/CreateProductForm';
import Products from '../Products';
import CreateCategoryForm from '../../components/CreateCategoryForm';
import Modal from '../../components/Modal/Modal';
import AdminCategories from '../../components/AdminCategories';
import { ICategory } from '../../types/compontentTypes/ICategories';
import fetchProducts from '../../api/fetchProducts';
import './AdminPanel.css'
import { showPopUpFn } from '../../store/slices/popUpSlice';
import { selectCurrentTheme } from '../../store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useGetProductsQuery } from '../../api/productsApi';
import Pagination from '../../components/Pagination';

const category = "all";
const itemsPerPage = 6;

const AdminPanel = () => {

  const  isLoggedIn = useAppSelector((state)=> state.login.isLoggedIn);

  if(isLoggedIn){
    const dispatch = useAppDispatch();
    
    let [items, setItems] = useState<IProduct[]>([]);

    
    let [showCurrentItem, setShowCurrentItem] = useState(false);
    let [currentEditItem, setCurrentEditItem] = useState<IProduct>(Object);

    let [showCurrentCategory, setShowCurrentCategory] = useState(false);
    let [currentEditCategory, setCurrentEditCategory] = useState<ICategory>(Object);


    const currentTheme = useAppSelector(selectCurrentTheme)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItemsQuantity, setTotalItemsQuantity] = useState<number>(1);

    const { data, error, isLoading } = useGetProductsQuery({ page: currentPage, limit: itemsPerPage, category:category });

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
  



      function onDeleteProduct(removedProductId:number){
        let deleteConfirm = confirm("Are you sure want to delete this product?");
        if(deleteConfirm){

        setItems(items = items.filter(el => el.id !== removedProductId));
        try {
          fetch('http://localhost/projects/housestuffbackend/servicies/product_service.php', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  id:removedProductId
              }),
          })
          .then((response) => {
            console.log(response)
            return response.json()
          
          })
          .then((data) => {
              console.log(data)
              if (data.message === "Product was deleted") {
                dispatch(showPopUpFn({popUpBg:"green", popUpText:"Product was deleted succesefully"}))

              } else {
                dispatch(showPopUpFn({popUpBg:"red", popUpText:`Error: ${data.message}`}))

                console.error(data.message);
              }
          })
      } catch (error) {
          console.error('An error occurred. Please try again.');
      }
    }

      }
      function onShowItem(item: IProduct) {
        console.log(item)
        setCurrentEditItem(item);
        setShowCurrentItem(!showCurrentItem);
        document.body.classList.toggle('lock');
    
      }
      function onUpdateProduct(product: IProduct){
        try {
          fetch('http://localhost/projects/housestuffbackend/servicies/product_service.php', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  title:product.title,
                  price:product.price,
                  category: product.category,
                  description:product.description,
                  fullDesc:product.fullDesc,
                  img:product.img,
                  id:product.id
              }),
          })
          .then((response) => response.json())
          .then((data) => {
              if (data.message === "Product was updated") {
                dispatch(showPopUpFn({popUpBg:"green", popUpText:"Product was updated succesefully"}))

              } else {
                dispatch(showPopUpFn({popUpBg:"red", popUpText:`Error: ${data.message}`}))

                console.error(data.message);
              }
          })
      } catch (error) {
          console.error('An error occurred. Please try again.');
      }
      }
      

      function onDeleteCategory(removedCategoryId:number){
        let deleteConfirm = confirm("Are you sure want to delete this product?");
        if(deleteConfirm){

        try {
          fetch('http://localhost/projects/housestuffbackend/servicies/categories_service.php', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  id:removedCategoryId
              }),
          })
          .then((response) => {
            console.log(response)
            return response.json()
          
          })
          .then((data) => {
              console.log(data)
              if (data.message === "Category was deleted") {
                  dispatch(showPopUpFn({popUpBg:"green", popUpText:"Category was deleted succesefully"}))

              } else {
                dispatch(showPopUpFn({popUpBg:"red", popUpText: `Error: ${data.message}`}))

                console.error(data.message);
              }
          })
      } catch (error) {
          console.error('An error occurred. Please try again.');
      }
    }

      }
      function onShowCategory(category: ICategory) {
        setCurrentEditCategory(category);
        setShowCurrentCategory(!showCurrentCategory);
        document.body.classList.toggle('lock');
    
      }
      function onUpdateCategory(category: ICategory){
        console.log(category)
        try {
          fetch('http://localhost/projects/housestuffbackend/servicies/categories_service.php', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  title:category.title,
                  visible_title:category.visible_title,
                  id:category.id
              }),
          })
          .then((response) => response.json())
          .then((data) => {
              if (data.message === "Category was updated") {
                  dispatch(showPopUpFn({popUpBg:"green", popUpText:"Category was updated succesefully"}))

              } else {
                dispatch(showPopUpFn({popUpBg:"red", popUpText:`Error: ${data.message}`}))

                console.error(data.message);
              }
          })
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
