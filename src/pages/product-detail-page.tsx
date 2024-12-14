import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import { IProduct } from "../types/product";
import { API_URL } from "../utils";
import { ShoppingCartContext } from "../context";
import { useFetch } from "./../hooks/useFetch";
import { RespProduct } from "../types/product";
import BeatLoader from "react-spinners/SyncLoader";

//components
import SliderProductsRandom from "../components/Sliderproducts";

export default function ProductDetailPage() {
  const { id } = useParams();

  const URL = `${API_URL}/product_list.php?id=${id}`;
  const [color] = useState("#694BEC");
  const { data, loader, error } = useFetch<RespProduct>(URL);

  const [quantity, setQuantity] = useState(1); // Establecer la cantidad inicial

  //const context = useContext(ShoppingCartContext);
  const { onAdd } = useContext(ShoppingCartContext);

  //console.log("producto...", data?.data)

  useEffect(() => {
    // Carga los datos del producto basado en el ID
    fetchProductData(id);
  }, [id]); // Se ejecuta cada vez que `id` cambia

  const fetchProductData = (productId) => {
    // Lógica para obtener la información del producto
    console.log(`Cargando datos para el producto con ID: ${productId}`);
    // Aquí haces la llamada al servidor o actualizas el estado.
  };

  const navigate = useNavigate();

  const handleNavigationBack = () => {
    navigate(`/`);
  };

  const handleIncrease = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loader)
    return (
      <div className="loader-container">
        <BeatLoader color={color} size={15} />
      </div>
    );

  if (error) return <p>Error: {error}</p>;


  function onAddProduct() {
    //context.setCount(context.count + quantity);
    //setQuantity()
    onAdd(data?.data, quantity);
  };

  //console.log(context)
  return (
    
    <>
    <div className="app-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
          <main className="container my-5">
          <div className="row" style={{ alignItems: 'center' }} >
            
            <div className="col-md-6" style={{ textAlign: 'center' }}>
              <img src={data?.data.images[0]} alt="Producto"className="img-fluid rounded"/>
            </div>

              <div className="col-md-6">
              <h2 className="fw-bold">{data?.data.title}</h2>
              <p className="text-muted">Código Sku: #{data?.data.sku}</p>
              <h3 className="text-success fw-bold">S/ {data?.data.price}</h3>

              <p className="mt-4">{data?.data.name}</p>

              <div className="d-flex align-items-center mt-4">
                <label className="me-3">Cantidad:</label>
                <button
                  className="btn btn-primary me-2"
                  onClick={handleDecrease}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  className="form-control w-25"
                  value={quantity}
                  min="1"
                  max="50"
                  readOnly
                />
                <button
                  className="btn btn-primary ms-2"
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>
              
              <div className="mt-4">
                <button className="btn btn-primary btn-lg me-3" onClick={onAddProduct}>Añadir al carrito</button>
                <button className="btn btn-info btn-lg me-3 bg-white border-black" onClick={handleNavigationBack}>Seguir comprando</button>
              </div>
            </div>
      </div>

    
          {/* <div className="mt-5">
            <h4>Detalles adicionales</h4>
            <ul>
              <li>Material: 100% algodón</li>
              <li>Dimensiones: 30x20x10 cm</li>
              <li>Color: Azul</li>
              <li>Garantía: 1 año</li>
            </ul>
          </div> */}

            {/* <SliderProductsRandom id={id} /> */}




        </main>
          </div>
        </div>
        
      </div>
    </div>
    
  
  </>
  );
}
