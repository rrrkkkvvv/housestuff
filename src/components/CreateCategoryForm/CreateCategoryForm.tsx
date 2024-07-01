import {   FormEvent, useState  } from 'react';

 

const CreateCategoryForm = () => {
  const [title, setTitle] = useState('');
  const [visibleTitle, setVisibleTitle] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost/projects/housestuffbackend/servicies/categories_service.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          visible_title: visibleTitle,
        }),
      });
      const data = await response.json();
      if (data.message === "Category was created") {
        alert('Category was added successfully');
      } else {
        setError(data.message);
        console.log(data.message);

      }
    } catch (error) {
      console.log(error);
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
