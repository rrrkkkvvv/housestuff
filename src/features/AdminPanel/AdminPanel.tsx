import { useCallback, useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../contexts/login-context';
import { IProduct } from '../../types/IProducts';
import CreateProductForm from '../../components/CreateProductForm';
import Products from '../Products';
import CreateCategoryForm from '../../components/CreateCategoryForm';
import Modal from '../../components/Modal/Modal';
import { ThemeContext } from '../../contexts/theme-context';
import AdminCategories from '../../components/AdminCategories';
import { ICategory } from '../../types/ICategories';
import fetchProducts from '../../api/fetchProducts';
import './AdminPanel.css'

const AdminPanel = () => {
  const loginData = useContext(LoginContext);
  if (!loginData) {
    return <div>failed...</div>;
}
const {  isLoggedIn } = loginData;

if(isLoggedIn){
  
  let [items, setItems] = useState<IProduct[]>([]);

  
  let [showCurrentItem, setShowCurrentItem] = useState(false);
  let [currentEditItem, setCurrentEditItem] = useState<IProduct>(Object);

  let [showCurrentCategory, setShowCurrentCategory] = useState(false);
  let [currentEditCategory, setCurrentEditCategory] = useState<ICategory>(Object);

  const themeData = useContext(ThemeContext);
 
  if (!themeData ) {
      return <div>failed...</div>;
  }
   const { currentTheme} = themeData;
   
   
    const memoizedFetchProducts = useCallback(async () => {
      const fetchedProducts = await fetchProducts(1, 6);
      setItems(fetchedProducts.records);
    }, []);

    useEffect(()=>{
      memoizedFetchProducts()
    },[memoizedFetchProducts])




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
                alert('Product was deleted succesefully')
            } else {
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
                alert('Product was updated succesefully')
            } else {
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
                alert('Category was deleted succesefully')
            } else {
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
                alert('Category was updated succesefully')
            } else {
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
