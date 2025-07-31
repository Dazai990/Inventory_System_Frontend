import { useState,useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {useNavigate} from 'react-router-dom'


export const PRODUCT_API_BASE_URL = process.env.REACT_APP_BACKEND + '/api/products';

const ProductView = () =>{
    const [products,setProducts] = useState([])
    const [searchTerm,setSearchTerm] = useState('')  //filtered search
    const [suggestions,setSuggestions] = useState([])
    const navigate = useNavigate();

    //component service method to get all products from backend rest api 
    const getAllProducts = (base_url)=>{

        //fetch api to call backend rest api (restful web service)
        //asyncronous call

        //configure request method, headers, body, etc
        fetch(base_url + "/all",{
             method:"GET",
             headers:{
                accept:'application/json'
             }
        }) 
        
        //get the server http response
          .then(response=>{
            if(response.ok)
                return response.json()
            else if(response.status==="404")
                return response.json()
            else 
            throw Error(`Server Error: ${response.statusText}`)
          })

          //get the data of response
          .then(data=>setProducts(data)) //get the data of response and update
          //  components state using backend data

         .catch(err=>console.error(err))  //handle server error if any
    }

    //calling useEffect hook
    useEffect( ()=>{
        getAllProducts(PRODUCT_API_BASE_URL)
    },[] );

    //delete product by calling backend rest api
    const deleteProduct = async (base_url, product) => {
  const response = await fetch(base_url + '/delete-product', {
    method: "DELETE",
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      name: product.name,
      brand: product.brand,
      price: product.price
    })
  });

  if (!response.ok) {
    throw new Error(`Server Error ${response.statusText}`);
  }

  const data = await response.json();
  alert(data.message);

  return await getAllProducts(base_url);
};


    const handleDelete = (product)=>{
      deleteProduct(PRODUCT_API_BASE_URL,product)
    }
    const handleEdit = (product)=>{
  navigate(`/edit/${product.name}/${product.brand}/${product.price}`)
    }

    // Filtering search...
    const filteredSearch = products.filter((product)=>
       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Update suggestions list on search term change
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
    } else {
      const matchedNames = products.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((p) => p.name);

      // Remove duplicates
      const uniqueNames = [...new Set(matchedNames)];
      setSuggestions(uniqueNames.slice(0, 5)); // Limit to 5 suggestions
    }
  }, [searchTerm, products]);

   // Handle clicking a suggestion
  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
  };

    //rendering logic
    return (
        <div className="container mt-4" style={{ position: "relative" }}>
            <input
            type="text"
            placeholder="Search By Name and Brand"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            className="form-control mb-3"
            />
              {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="list-group mb-3" style={{ position: "absolute", zIndex: 10, width: "100%" }}>
          {suggestions.map((name, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              onClick={() => handleSuggestionClick(name)}
              style={{ cursor: "pointer" }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
            <table className="table table-striped table-primary">
                <thead>
                    <tr className="table-secondary">
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <td colSpan={2}></td>
                    </tr>
                </thead>
                <tbody>
                    { filteredSearch.map(p=>
                        <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>{p.brand}</td>
                        <td>{p.price}</td>
                        <td><button title="Edit" className="btn btn-warning" onClick={()=>handleEdit(p)}><MdEdit /></button></td>
                        <td><button title="Delete" className="btn btn-danger" onClick={()=>handleDelete(p)}><MdDelete /></button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )


}

export default ProductView;