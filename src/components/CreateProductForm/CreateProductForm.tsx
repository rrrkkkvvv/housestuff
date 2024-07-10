import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { ICategory } from '../../types/ICategories';
import fetchCategories from '../../api/fetchCategories';
import { showPopUpFn } from '../../store/slices/popupSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
 


const CreateProductForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  
  const memoizedFetchCategories = useCallback(async () => {
    const fetchedCategories = await fetchCategories();
    setCategories(fetchedCategories);
    if(fetchedCategories && fetchedCategories[0].title){
      setCategory(fetchedCategories[0].title);
    }
 }, []);

  useEffect(()=>{
      memoizedFetchCategories()
  },[memoizedFetchCategories])



 
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      title: title,
      price: price,
      category: category,
      description: description,
      fullDesc: fullDesc,
      img: img
    });
    try {
        console.log({title: title,
            price: price,
            category: category,
            description: description,
            fullDesc: fullDesc,
            img: img})
      const response = await fetch('http://localhost/projects/housestuffbackend/servicies/product_service.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          price: price,
          category: category,
          description: description,
          fullDesc: fullDesc,
          img: img
        }),
      });
      const data = await response.json();
      if (data.message === "Product was created") {
         dispatch(showPopUpFn({popUpBg:"green", popUpText:"Product was added successfully"}))

      } else {
        setError(data.message);
        dispatch(showPopUpFn({popUpBg:"red", popUpText:`Error: ${data.message}`}))

      }
    } catch (error) {
      setError('An error occurred. Please try again.');
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
