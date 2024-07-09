import { FaTrash } from 'react-icons/fa'
import { IOrderProps } from '../../types/IOrder';
import { useDispatch } from 'react-redux';
import { decrement } from '../../store/slices/ordersSlice';

export default function Order({ item }: IOrderProps) {
    const dispatch = useDispatch();

    return (

        <div className="item">
            <img src={"./imgs-public/" + item.img} alt="" />
            <h2>{item.title}</h2>
            <p>{item.price}$</p>
            <FaTrash className='delete-icon' onClick={() => { dispatch(decrement(item.id)) }} />
        </div>

    )
}




