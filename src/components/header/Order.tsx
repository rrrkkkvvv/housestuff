import { useContext } from 'react'
import { FaTrash } from 'react-icons/fa'
import { OrdersContext } from '../../contexts/orders-context';
import { IOrderProps } from './IOrder';

export default function Order({ item }: IOrderProps) {
    const ordersData = useContext(OrdersContext);

    return (

        <div className="item">
            <img src={"./imgs-public/" + item.img} alt="" />
            <h2>{item.title}</h2>
            <p>{item.price}$</p>
            <FaTrash className='delete-icon' onClick={() => { ordersData?.deleteOrder(item.id) }} />
        </div>

    )
}




