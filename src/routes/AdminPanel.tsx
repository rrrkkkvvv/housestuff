import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../contexts/login-context';
import '../styles/admin_panel_styles/index.css'
import { IOrder } from '../contexts/context types/IOrdersContext';
import CreateProductForm from '../components/forms/CreateProductForm';
import Products from '../components/products/Products';
import Modal from '../components/modal/Modal';
import CreateCategoryForm from '../components/forms/CreateCategoryForm';
const AdminPanel = () => {
  const loginData = useContext(LoginContext);
  if (!loginData) {
    return <div>failed...</div>;
}
const {  isLoggedIn } = loginData;

if(isLoggedIn){
  
  let [items, setItems] = useState<IOrder[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  let [showCurrentItem, setShowCurrentItem] = useState(false);
  let [currentEditItem, setCurrentEditItem] = useState<IOrder>(Object);

    useEffect(()=>{
      fetch('http://localhost/projects/housestuffbackend/servicies/product_service.php')
      .then((response) => response.json())
      .then((data) => {
        if(data.records.length >=1){

          setItems(data.records);
        }else{
          setItems([]);

        }
      })
      .catch((error) => {
        console.error('Error here!:', error);
        setItems([]);
      })
    },[])




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
    function onShowItem(item: IOrder) {
      console.log(item)
      setCurrentEditItem(currentEditItem = item);
      setShowCurrentItem(showCurrentItem = !showCurrentItem);
      document.body.classList.toggle('lock');
  
    }
    function onUpdateProduct(product: IOrder){
      try {
        fetch('http://localhost/projects/housestuffbackend/servicies/product_service.php', {
            method: 'POST',
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
  return (
    <div className='wrapper'>

      <h1 className='admin-panel-title'>Admin Panel</h1>


      <h1 className='admin-panel-subtitle'>Products</h1>

      <CreateProductForm/>

      <h3 className='admin-panel-subtitle'>Update products</h3>
      <Products onShowItem={onShowItem} type='admin' onDelete={onDeleteProduct} onUpdate={onUpdateProduct}  items={items} />

      
      
      <h1 className='admin-panel-subtitle'>Categories</h1>
      <CreateCategoryForm/>
      <Modal type='edit product' item={currentEditItem} onShowItem={()=>{
        setShowCurrentItem(!showCurrentItem); 
        document.body.classList.toggle('lock');
      }} show={showCurrentItem} updateProduct={onUpdateProduct}/>

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
