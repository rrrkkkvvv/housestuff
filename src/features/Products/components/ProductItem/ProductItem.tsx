import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IProductProps } from '../../../../types/IProducts';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../../../../store/slices/ordersSlice';
import { AppDispatch, RootState } from '../../../../store/store';
export default function Product({ onShowItem, item }: IProductProps) {
    const dispatch = useDispatch<AppDispatch>();


    const currentTheme = useSelector((state:RootState)=> state.theme.currentTheme)
    
    let product = item;

    return (

        <div className="item" style={{ background: currentTheme.background, color: currentTheme.color }}>

            <LazyLoadImage
                src={"./imgs-public/" + product.img}
                effect="blur"

                delayMethod='debounce'
                alt={product.img}
            />

            <h2 style={{ background: currentTheme.background, color: currentTheme.color }}>{product.title}</h2>
            <p className='full-item-link' onClick={() => onShowItem(product)}>Open full description</p>

            <p style={{ background: currentTheme.background, color: currentTheme.color }}>{product.description}</p>
            <b >{product.price}$</b>
            <div className='add-to-cart' onClick={() => {dispatch(increment(product))}}>+</div>
        </div>
    )
}



