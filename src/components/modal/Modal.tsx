import { ChangeEvent, FormEvent,  useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { TModalProps } from '../../types/compontentTypes/TModal';
import './Modal.css';
import { TCategory } from '../../types/objectTypes/TCategory';
import { login } from '../../store/slices/login/loginSlice';
import { useAppDispatch } from '../../store/store';
import { useGetCategoriesQuery, useGetCategoryQuery } from '../../api/modules/categoriesApi';
import { errorMessage } from '../../values/stringValues';
import { addOrder } from '../../store/slices/orders/thunks/addOrderThunk';
import { useGetProductQuery } from '../../api/modules/productsApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { TProduct } from '../../types/objectTypes/TProduct';
const Modal: React.FC<TModalProps> = (props) => {

    const dispatch = useAppDispatch();

    
    if (props.type === "full-item") {
        const { data:getProductData } = useGetProductQuery(props.productId? { id: props.productId  }: skipToken);
        const [currentProduct, setCurrentProduct] = useState<TProduct>(Object);
        useEffect(()=>{
            if(getProductData){
                setCurrentProduct(getProductData.records[0]);
            }

        },[getProductData])
        return (
            <div className={`modal full-item  ${props.show && 'visible'}`} onClick={() => props.onShowItem(currentProduct)}>
                <div className='modal-body' onClick={(e) => e.stopPropagation()} >
                    <span className='close-modal-x' onClick={() => props.onShowItem(currentProduct)}><AiOutlineClose></AiOutlineClose></span>
                    <img onClick={() => props.onShowItem(currentProduct)} src={"./imgs-public/" + currentProduct.img} alt={currentProduct.img} />
                    <h2>{currentProduct.title}</h2>
                    <p>{currentProduct.fullDesc}</p>
                    <b>{currentProduct.price}$</b>
                    <div className='add-to-cart' onClick={() => dispatch(addOrder(currentProduct))}>+</div>
                </div>
            </div>)
    } else if(props.type === "information") {
        return (
            <div className={`modal  ${props.show && 'visible'}`} onClick={() => props.onShowModal("close")}>

                <div className='modal-body' onClick={(e) => e.stopPropagation()}>
                    <span className='close-modal-x' onClick={() => props.onShowModal("close")}><AiOutlineClose></AiOutlineClose></span>
                    <h1 className='modal-title'>{props.title}</h1>
                    <div className='modal-text-content'>{props.textContent}</div>
                </div>
            </div>
        )
    }else if(props.type=="login"){

 
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');


        const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
                fetch('http://localhost/projects/housestuffbackend/servicies/admin_service.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        method: "login",
                        params: { username, password }
                    }),
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "Login successful") {
                        dispatch(login());
                        props.onShowModal("close");
                    } else {
                        setError(data.message);
                    }
                })
          
    
         
            } catch (error) {
                setError(errorMessage);
            }
        };
        return (
            <div className={`modal  ${props.show && 'visible'}`} onClick={() => props.onShowModal("close")}>

                <div className='modal-body' onClick={(e) => e.stopPropagation()}>
                    <span className='close-modal-x' onClick={() => props.onShowModal("close")}><AiOutlineClose></AiOutlineClose></span>
                    <h1 className='modal-title'>Login</h1>
                    <div className='modal-text-content'>
                    <form onSubmit={handleSubmit}>
                <div>
                    <label><h3>Username:</h3></label>
                    <input
                        className='input'

                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label><h3>Password:</h3></label>
                    <input
                        className='input'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className='search-button' type="submit">Login</button>
            </form>
                    </div>
                </div>
            </div>
        )
    }else if(props.type === "edit product"){

        const [title, setTitle] = useState('');
        const [price, setPrice] = useState(0);
        const [category, setCategory] = useState('');
        const [img, setImg] = useState('');
        const [description, setDescription] = useState('');
        const [fullDesc, setFullDesc] = useState('');
        const [categories, setCategories] = useState<TCategory[]>([]);
        
        const {data} = useGetCategoriesQuery();
        const { data:getProductData } = useGetProductQuery(props.productId? { id: props.productId  }: skipToken);
        useEffect(()=>{
            if(getProductData){
                const product = getProductData.records[0]
                setTitle(product.title);
                setDescription(product.description);
                setFullDesc(product.fullDesc);
                setImg(product.img);
                setCategory(product.category);
                setPrice(product.price );
    
            }
        },[getProductData]);

        useEffect(()=>{
          if(data){
          setCategories(data.records);
          if(data.records && data.records[0].title){
            setCategory(data.records[0].title);
          }}
        },[data])
    

       

       
        const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
            setCategory(event.target.value);
        };
      
    
      
        const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          
          props.updateProduct({
            title:title,
            category:category,
            description:description,
            fullDesc:fullDesc,
            id: props.productId,
            img:img,
            price: price
          })
        };
      

        return(
            <div className={`modal  ${props.show && 'visible'}`} onClick={() => props.onShowItem()}>

                <div className='modal-body' onClick={(e) => e.stopPropagation()}>
                <span className='close-modal-x' onClick={() => props.onShowItem()}><AiOutlineClose></AiOutlineClose></span>
                <h1 className='modal-title'>Edit product</h1>
                    <div className='modal-text-content'>

                        <form className='create-product-form ' onSubmit={handleSubmit}>
                                <div>
                                    <label><h3>Title of product:</h3></label>
                                    <input
                                        className='input'
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            <div>
                            <label><h3>Category:</h3></label>
                            <select name=" " id=" " className='select' onChange={handleChange}>
                                {
                                categories.map((cat) => (
                                    <option key={cat.title} value={cat.title}>
                                    {cat.visible_title}
                                    </option>
                                ))
                                }
                            </select>
                            </div>
                            <div>
                            <label><h3>Price:</h3></label>
                            <input
                                className='input'
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                            />
                            </div>
                            <div>
                            <label><h3>Img route/name:</h3></label>
                            <input
                                className='input'
                                type="text"
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                            />
                            </div>
                            <div>
                            <label><h3>Short description:</h3></label>
                            <textarea
                                className='input'
                                maxLength={255}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            </div>
                            <div>
                            <label><h3>Full description:</h3></label>
                            <textarea
                                className='input'
                                maxLength={500}
                                value={fullDesc}
                                onChange={(e) => setFullDesc(e.target.value)}
                            />
                            </div>
                            <br />
                        <button className='search-button' type="submit">Edit</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }else if(props.type === "edit category"){

        const [title, setTitle] = useState('');
        const [visibleTitle, setVisibleTitle] = useState('');
        
        const { data:getCategoryData } = useGetCategoryQuery(props.categoryId ? { id: props.categoryId} : skipToken);
        useEffect(()=>{
            if(getCategoryData){

            const category = getCategoryData?.records[0]
            setTitle(category.title);
            setVisibleTitle(category.visible_title);
            }
        },[getCategoryData])
  
     
  
   
     
       const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
         event.preventDefault();
         
         props.updateCategory({
           title:title,
           visible_title:visibleTitle,
           id: props.categoryId,
    
         })
        };
     

       return(
           <div className={`modal  ${props.show && 'visible'}`} onClick={() => props.onShowCategory()}>

               <div className='modal-body' onClick={(e) => e.stopPropagation()}>
               <span className='close-modal-x' onClick={() => props.onShowCategory()}><AiOutlineClose></AiOutlineClose></span>
               <h1 className='modal-title'>Edit product</h1>
                   <div className='modal-text-content'>

                       <form className='create-product-form ' onSubmit={handleSubmit}>
                       <div>
                       <label><h3>Title of product:</h3></label>
                       <input
                           className='input'
                           type="text"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                       />
                       </div>
                       <div>
                       <label><h3>Visible title of product:</h3></label>
                       <input
                           className='input'
                           type="text"
                           value={visibleTitle}
                           onChange={(e) => setVisibleTitle(e.target.value)}
                       />
                       </div>
                       <br />
                        <button className='search-button' type="submit">Edit</button>
                   </form>
               </div>
           </div>
       </div>
       )
   }

}

export default Modal;