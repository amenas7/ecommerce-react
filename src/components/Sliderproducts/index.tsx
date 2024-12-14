import React, { useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { API_URL } from "../../utils";
import { useFetch } from "../../hooks/useFetch";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";

function SliderProductsRandom({ id }) {
  const context = useContext(ShoppingCartContext);

  const URL = `${API_URL}/product_random.php?id=${id}`;
  const { data, loader, error } = useFetch<any>(URL);
  const navigate = useNavigate();

  // Navegar a la página del producto seleccionado
  const handleNavigationProduct = (productId) => {
    console.log("go...", productId)
    navigate(`/products/${productId}`);
    //navigate(`/`);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container" style={{ marginTop: '50px', textAlign: 'center' }}>
      <h2 style={{ textAlign: 'left', color: '#694BEC', fontWeight: 'bold' }}>
        Productos sugeridos
      </h2>
      <Slider {...settings}>
        {data?.data.map((product) => (
          <div
            key={product.id}
            onClick={() => handleNavigationProduct(product.id)} // Pasa el ID del producto
            style={{ cursor: 'pointer' }}
          >
            <div style={{ margin: '10px' }}>
              <div className="card">
                <img src={product?.images[0]} className="card-img-top" alt={product?.title} />
                <div className="card-body" style={{ marginBottom: '15px' }}>
                  <h5 className="card-title">{product?.title}</h5>
                  <p
                    className="card-text"
                    style={{ fontWeight: '500', color: '#369E6F', fontSize: '20px' }}
                  >
                    S/ {product?.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderProductsRandom;
