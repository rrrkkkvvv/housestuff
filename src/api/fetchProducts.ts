 
const fetchProducts = async(page:number, limit:number)=>{
    try{
      let response = await fetch(`http://localhost/projects/housestuffbackend/servicies/product_service.php?page=${page}&limit=${limit}`);
      const data = await response.json();
      if(data.records.length >=1 ){
        return data;
      }else{
        return [];
      }
    }catch(error){
      console.error('Error fetching products:', error);
    }
}

export default fetchProducts;