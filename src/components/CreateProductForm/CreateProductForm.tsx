import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { showPopUpFn } from '../../store/slices/popUpSlice';
import { useAppDispatch } from '../../store/store';
import { ICategory } from '../../types/compontentTypes/ICategories';
import { useGetCategoriesQuery } from '../../api/modules/categoriesApi';
import { CreateProductFormProps } from '../../types/compontentTypes/ICreateProductForm';


const CreateProductForm = ({onAddProduct}:CreateProductFormProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);

  const dispatch = useAppDispatch();
  const {data} = useGetCategoriesQuery();

    useEffect(()=>{
      if(data){
      setCategories(data.records);
      if(data.records && data.records[0].title){
        setCategory(data.records[0].title);
      }}
    },[data])

 



 
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProduct = {
      title: title,
      price: price,
      category: category,
      description: description,
      fullDesc: fullDesc,
      img: img,
      id: -1,
    };
    const result = await onAddProduct(newProduct);
    if(result.type === "success"){
      dispatch(showPopUpFn({popUpBg:"green", popUpText:result.message}));
    }else if(result.type === "error"){
      setError(result.message);
      dispatch(showPopUpFn({popUpBg:"red", popUpText:`Error: ${result.message}`}));
    }
    

  };

  return (
    <div className='create-product-wrapper'>
      <div className="header">
       <h3>Create product</h3>
        <button onClick={handleVisibility}>
          {isVisible ? 'Hide Form' : 'Show Form'}
        </button>
      </div>
      <div className={`form-container ${isVisible ? 'visible' : 'hidden'}`}>
        <form className='create-product-form ' onSubmit={handleSubmit}>
          <div>
            <label><h3>Title of product:</h3></label>
            <input
              className='input'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label><h3>Category:</h3></label>
            <select name=" " id=" " className='select' onChange={handleChange}>
              {
                categories.map((cat) => (
                  <option key={cat.title} value={cat.title}>
                    {cat.visible_title}
                  </option>
                ))
              }
            </select>
          </div>
          <div>
            <label><h3>Price:</h3></label>
            <input
              className='input'
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label><h3>Img route/name:</h3></label>
            <input
              className='input'
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <div>
            <label><h3>Short description:</h3></label>
            <textarea
              className='input'
              maxLength={255}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label><h3>Full description:</h3></label>
            <textarea
              className='input'
              maxLength={500}
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
            />
          </div>
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='search-button' type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProductForm;
