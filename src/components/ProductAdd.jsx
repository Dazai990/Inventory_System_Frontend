import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_API_BASE_URL } from "./ProductView";
const ProductAdd = ()=>{
  const [product,setProduct] = useState({
    name:'',
    brand:'',
    price:''
  })

  const navigate = useNavigate();


  //to add product by calling backend rest api
  const addProduct = (base_url,product)=>{
    fetch(base_url+"/add-product",{
      method:"POST",
      headers:{
        'content-type':'application/json',
        'accept':'application/json'
      },
      body: JSON.stringify({
        name:product.name,
        brand:product.brand,
        price:product.price
      })
    })
     .then(response=>{
      if(response.ok)
        return response.json()
        else throw Error(`server Error: ${response.statusText}`)
     })
     .then(data=>{
      alert(data.message);
        setProduct({ name:'', brand:'', price:''});
        navigate('/');
     })
     .catch(err=>console.error(err));
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    addProduct(PRODUCT_API_BASE_URL,product);
  }

  return(
    <div className="container w-50 border border-dark rounded my-3 p-3">
        <h2 style={{fontFamily:'initial'}}>Product Add Form</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label style={{fontFamily:'monospace'}} className="form-label" for='nm'>Product Name</label>
                <input className="form-control" id="nm" value={product.name} onChange={e=>setProduct({...product,name:e.target.value})} style={{textTransform:'capitalize'}} required/>  
            </div>
            <div className="mb-3">
            <label style={{fontFamily:'monospace'}} className="form-label" for='br'>Product Brand</label>
            <input className="form-control" id="br" value={product.brand} onChange={e=>setProduct({...product,brand:e.target.value})} style={{textTransform:'capitalize'}} required/>
            </div>
            <div className="mb-3">
            <label style={{fontFamily:'monospace'}} className="form-label" for='br'>Product Price</label>
            <input type="number" className="form-control" id="br" value={product.price} onChange={e=>setProduct({...product,price:e.target.value})} required/>
            </div>
            <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-success" type="submit">Save</button>
                <button className="btn btn-outline-secondary" type="reset" onClick={()=>setProduct({
                  name:'',
                  brand:'',
                  price:''
                })}>Reset</button>
            </div>
        </form>
    </div>
  )

}
export default ProductAdd;