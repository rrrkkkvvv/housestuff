import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { OrdersContext } from '../../contexts/orders-context';
import { IModalProps } from '../../types/IModal';
import { LoginContext } from '../../contexts/login-context';
import './Modal.css';
import { ICategory } from '../../types/ICategories';
import fetchCategories from '../../api/fetchCategories';
const Modal: React.FC<IModalProps> = (props) => {
    const ordersData = useContext(OrdersContext);

    if (!ordersData) {
        return <div>failed...</div>;
    }


    if (props.type === "full-item") {
        return (
            <div className={`modal full-item  ${props.show && 'visible'}`} onClick={() => props.onShowItem(props.item)}>
                <div className='modal-body' onClick={(e) => e.stopPropagation()} >
                    <span className='close-modal-x' onClick={() => props.onShowItem(props.item)}><AiOutlineClose></AiOutlineClose></span>
                    <img onClick={() => props.onShowItem(props.item)} src={"./imgs-public/" + props.item.img} alt={props.item.img} />
                    <h2>{props.item.title}</h2>
                    <p>{props.item.fullDesc}</p>
                    <b>{props.item.price}$</b>
                    <div className='add-to-cart' onClick={() => ordersData.addToOrder(props.item)}>+</div>
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

        const loginData = useContext(LoginContext);

        if (!loginData) {
            return <div>failed...</div>;
        }
    
        const { handleLogin } = loginData;

        
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
                        handleLogin();
                        props.onShowModal("close");
                    } else {
                        setError(data.message);
                    }
                })
          
    
         
            } catch (error) {
                setError('An error occurred. Please try again.');
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
        const [categories, setCategories] = useState<ICategory[]>([]);

          
        const memoizedFetchCategories = useCallback(async () => {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
            if(fetchedCategories[0].title){
            setCategory(fetchedCategories[0].title);
            }
            setTitle(props.item.title);
            setDescription(props.item.description);
            setFullDesc(props.item.fullDesc);
            setImg(props.item.img);
            setCategory(props.item.category);
            setPrice(parseFloat(props.item.price) );
        }, [props.item]);

        useEffect(()=>{
            memoizedFetchCategories()
        },[memoizedFetchCategories, ])

       
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
            id: props.item.id,
            img:img,
            price: price.toString()
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
        
 
       useEffect(() => {
       
        setTitle(props.category.title);
        setVisibleTitle(props.category.visible_title);
           
       }, [props.category]);
     
  
   
     
       const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
         event.preventDefault();
         console.log({
            title:title,
            visible_title: visibleTitle,
            id: props.category.id,
     
          })
         props.updateCategory({
           title:title,
           visible_title:visibleTitle,
           id: props.category.id,
    
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