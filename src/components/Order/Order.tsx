import { FaTrash } from 'react-icons/fa'
import { IOrderProps } from '../../types/compontentTypes/TOrder';
import { removeOrder } from '../../store/slices/orders/';
import { useAppDispatch } from '../../store/store';

export default function Order({ item }: IOrderProps) {
    const dispatch = useAppDispatch();

    return (

        <div className="item">
            <img src={"./imgs-public/" + item.img} alt="" />
            <h2>{item.title}</h2>
            <p>{item.price}$</p>
            <FaTrash className='delete-icon' onClick={() => { dispatch(removeOrder(item.id)) }} />
        </div>

    )
}




