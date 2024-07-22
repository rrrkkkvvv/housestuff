 
const fetchCategories = async()=>{
    try{
      let response = await fetch("http://localhost/projects/housestuffbackend/servicies/categories_service.php");
      const data = await response.json();

      if(data.records && data.records.length >=1 ){
        return data.records;
      }else{
        return [];
      }
    }catch(error){
      console.error('Error fetching categories:', error);
    }
}

export default fetchCategories;