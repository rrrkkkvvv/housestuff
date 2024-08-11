import {   FormEvent, useState  } from 'react';
import { CreateCategoryFormProps } from '../../types/compontentTypes/ICreateCategoryForm';
import { useAppDispatch } from '../../store/store';
import { showPopUpCaller } from '../../store/slices/popUp/thunks/showPopUpThunk';

 

const CreateCategoryForm = ({onAddCategory}:CreateCategoryFormProps) => {
  const [title, setTitle] = useState('');
  const [visibleTitle, setVisibleTitle] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();


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
    const result = await onAddCategory(newCategory);
    if(result.type === "success"){
      dispatch(showPopUpCaller({popUpBg:"green", popUpText:result.message}));
    }else if(result.type === "error"){
      setError(result.message);
      dispatch(showPopUpCaller({popUpBg:"red", popUpText:`Error: ${result.message}`}));
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
