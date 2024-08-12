import { TProductsProps } from '../../types/compontentTypes/TProducts'
import AdminProduct from './components/AdminProductItem/AdminProduct'
import Product from './components/ProductItem/ProductItem'
import "./Products.css"
export default function Products(props: TProductsProps) {

    if(props.type === "user"){
        return (
            <main >
                {props.items.map((el) => (
                    <Product onShowItem={props.onShowItem} key={el.id} item={el} />
                ))}
            </main>
        )
    }else if(props.type === "admin"){
        return (
            <main >
                {props.items.map((el) => (
                    <AdminProduct onDelete={props.onDelete} onShowItem={props.onShowItem} key={el.id} item={el} />
                ))}
            </main>
        )
    }

}

