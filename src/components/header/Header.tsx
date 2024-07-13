import { useState, useEffect } from 'react'
import Order from '../Order';

import { FaShoppingCart, FaCartPlus, FaAdjust } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"

import { Link } from 'react-router-dom';

import './Header.css'
import { IHeaderProps } from '../../types/IHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { IProduct } from '../../types/IProducts';
import { showPopUpFn } from '../../store/slices/popUpSlice';
import { toggleTheme } from '../../store/slices/themeSlice';


export default function Header({ onShowModal }: IHeaderProps) {

    const dispatch = useDispatch<AppDispatch>();
    
    const orders:IProduct[] = useSelector((state:RootState)=> state.orders.orders);

    const currentTheme = useSelector((state:RootState)=> state.theme.currentTheme)
    

    const  isLoggedIn = useSelector((state:RootState)=> state.login.isLoggedIn);

 

    let [showMenu, setShowMenu] = useState(false);
    let [cartOpen, setCartOpen] = useState(false);


    useEffect(() => {
        if (showMenu === true) {

            document.body.classList.add('lock');
        } else {
            document.body.classList.remove('lock');

        }
    }, [showMenu])




    function showOrders() {

        let summ = 0;
        orders.forEach(el => { summ += Number.parseFloat(el.price) });
        return (
            <div style={{ background: currentTheme.background, color: currentTheme.color }}>
                <h3  className="shop-cart-title" >Product Cart{<FaShoppingCart className='cart-icon' />}</h3>
                {orders.map(el => (
                    <Order key={el.id} item={el} />
                ))}
                <p className='summ'>Summ: <span style={{ color: "#5fa36a" }}>{summ.toFixed(2)}$</span></p>
            </div>
        )


    }
    function showNothing() {
        return (
            <div style={{ background: currentTheme.background, color: currentTheme.color }}>
                <h3 className='shop-cart-title'>Product Cart{<FaShoppingCart className='cart-icon' />}</h3>
                <div className="empty">
                    <h2> No products</h2>
                </div>
            </div>

        )
    }

    return (
        <header className='header' style={{ background: currentTheme.background, color: currentTheme.color }} >
            <div className='wrapper'>
                <div className='logo'>House Stuff<img src="./imgs-public/icons8-furniture-64.png" alt="" /></div>

                <ul className={`nav ${showMenu && 'visible'}`} style={{ background: currentTheme.background, color: currentTheme.color }}>


                    { isLoggedIn &&
                           <li  onClick={() => { onShowModal("management"), setShowMenu(false) }}>
                                <Link style={{ color: currentTheme.color }} to="/admin">Admin Panel</Link>
                            </li>

                    }
                      
                    <li onClick={() => { onShowModal("login"), setShowMenu(false) }}>Login as admin</li>
                    <li onClick={() => { onShowModal("about"), setShowMenu(false) }}>About us</li>
                    <li onClick={() => { onShowModal("contacts"), setShowMenu(false) }}>Contacts</li>

                    <li className={`shop-cart-button  ${cartOpen && ' active'}`} onClick={() => { setCartOpen(!cartOpen), setShowMenu(showMenu = false) }}>Open Cart {orders.length ? <span > <FaCartPlus className='cart-frequency-icon' /> <sup className='count-of-orders'>{ orders.length}</sup></span> : <FaShoppingCart />}
                    </li>
                    <li onClick={()=> dispatch(toggleTheme())} >{
                        <FaAdjust className='change-theme-button' />
                    }</li>
                    <div className="close-menu-button" style={{ color: currentTheme.color }} onClick={() => setShowMenu(showMenu = false)}><AiOutlineClose></AiOutlineClose></div>

                </ul>
                <div className="open-menu-button" onClick={() => setShowMenu(!showMenu)}>Open menu</div>

                <div className={`shop-cart ${cartOpen && 'visible'}`} style={{ background: currentTheme.background, color: currentTheme.color }} >
                    <div className="close-cart-button" onClick={() => setCartOpen(!cartOpen)} >X</div>

                    {orders.length > 0 ? showOrders() : showNothing()}
                    <button className='make-order-button' onClick={() => dispatch(showPopUpFn({popUpBg:"red", popUpText:"This is not a real shop!!"}))}>Make an order</button>
                </div>

            </div>
        </header>
    )
}
