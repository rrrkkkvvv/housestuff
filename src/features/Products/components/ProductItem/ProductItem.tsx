import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
  import { IProductProps } from '../../../../types/IProducts';
import { ThemeContext } from '../../../../contexts/theme-context';
import { OrdersContext } from '../../../../contexts/orders-context';
export default function Product({ onShowItem, item }: IProductProps) {

    const ordersData = useContext(OrdersContext);
    const themeData = useContext(ThemeContext);
    if (!ordersData || !themeData) {
        return <div>failed...</div>;
    }
    let product = item;

    return (

        <div className="item" style={{ background: themeData.currentTheme.background, color: themeData.currentTheme.color }}>

            <LazyLoadImage
                src={"./imgs-public/" + product.img}
                effect="blur"

                delayMethod='debounce'
                alt={product.img}
            />

            <h2 style={{ background: themeData.currentTheme.background, color: themeData.currentTheme.color }}>{product.title}</h2>
            <p className='full-item-link' onClick={() => onShowItem(product)}>Open full description</p>

            <p style={{ background: themeData.currentTheme.background, color: themeData.currentTheme.color }}>{product.description}</p>
            <b >{product.price}$</b>
            <div className='add-to-cart' onClick={() => { ordersData.addToOrder(product) }}>+</div>
        </div>
    )
}



