import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TProductProps } from '../../../../types/compontentTypes/TProducts';
import { selectCurrentTheme } from '../../../../store/slices/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { addOrder } from '../../../../store/slices/orders/thunks/addOrderThunk';
import { usePrefetch } from '../../../../api/modules/productsApi';
export default function Product({ onShowItem, item }: TProductProps) {
    
    const dispatch = useAppDispatch();
    const prefetchProduct = usePrefetch('getProduct');

    const currentTheme = useAppSelector(selectCurrentTheme)
    
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
            <p className='full-item-link' onMouseEnter={()=>prefetchProduct({id: item.id})} onClick={() => onShowItem(product)}>Open full description</p>

            <p style={{ background: currentTheme.background, color: currentTheme.color }}>{product.description}</p>
            <b >{product.price}$</b>
            <div className='add-to-cart' onClick={() => {dispatch(addOrder(product))}}>+</div>
        </div>
    )
}



