import Product from './Product/Product'
import AdminProduct from './Product/AdminProduct'
import { IProductsProps } from './IProducts'

export default function Products(props: IProductsProps) {

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

