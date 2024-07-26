import {   FormEvent, useState  } from 'react';
import { showPopUpFn } from '../../store/slices/popUpSlice';
import { useAppDispatch } from '../../store/store';
import { usePostCategoryMutation } from '../../api/categoriesApi';

 

const CreateCategoryForm = () => {
  const [title, setTitle] = useState('');
  const [visibleTitle, setVisibleTitle] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [postCategory] = usePostCategoryMutation();

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCategory = {
      title: title,
      visible_title: visibleTitle,
      id: -1
    }
    try {
      
      const result = await postCategory(newCategory).unwrap()
      
      if (result.message === "Category was created") {
        dispatch(showPopUpFn({popUpBg:"green", popUpText:"Category was added successfully"}))
       } else {
        setError(result.message);
        dispatch(showPopUpFn({popUpBg:"red", popUpText:`Error: ${result.message}`}))

      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='create-product-wrapper'>
    <div className="header">
     <h3>Create Category</h3>
      <button onClick={handleVisibility}>
        {isVisible ? 'Hide Form' : 'Show Form'}
      </button>
    </div>
    <div className={`form-container ${isVisible ? 'visible' : 'hidden'}`}>

    <form className='create-category-form  ' onSubmit={handleSubmit}>
      <div>
        <label><h3>Title of category:</h3></label>
        <input
          className='input'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label><h3>Visible title:</h3></label>
        <input
          className='input'
          type="text"
          value={visibleTitle}
          onChange={(e) => setVisibleTitle(e.target.value)}
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

export default CreateCategoryForm;
