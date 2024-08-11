import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IAdminProductProps } from '../../../../types/compontentTypes/IProducts';
import { selectCurrentTheme } from '../../../../store/slices/theme/themeSlice';
import { useAppSelector } from '../../../../store/store';
 
export default function AdminProduct({ onShowItem, item, onDelete }: IAdminProductProps) {

    
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
            <p className='full-item-link' onClick={() => onShowItem(product)}>Edit product</p>

            <p style={{ background: currentTheme.background, color: currentTheme.color }}>{product.description}</p>
            <b >{product.price}$</b>
            <div className='add-to-cart' onClick={() => { onDelete(product.id) }}>X</div>
        </div>
    )
}



