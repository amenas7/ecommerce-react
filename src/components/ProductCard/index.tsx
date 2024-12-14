import { IProduct } from "../../types/product";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";


function ProductCard({ images, title, price, id }: IProduct) {

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/products/${id}`);
  };


  return (

    <div className="col-sm-12 col-md-3 principal" key={id} onClick={handleNavigation} style={{cursor: 'pointer'}}>
      <div className="card h-100 p-2">
        <img
          src={images[0]}
          className="card-img-top card-img"
          alt={title}
        />
        <div className="card-body">
          <p className="card-title" style={{fontWeight: '500', fontSize: '20px'}}>{title}</p>
          <p className="label label-price" style={{fontSize: '20px', color: '#0B9369'}}>S/ {price}</p>
        </div>
      </div>
    </div>

  );
}

export default ProductCard;
