 
const fetchProducts = async()=>{
    try{
      let response = await fetch("http://localhost/projects/housestuffbackend/servicies/product_service.php");
      const data = await response.json();
      if(data.records.length >=1 ){
        return data.records;
      }else{
        return [];
      }
    }catch(error){
      console.error('Error fetching products:', error);
    }
}

export default fetchProducts;