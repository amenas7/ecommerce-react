import { useContext } from "react";
import "./Header.css";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();

  const { cartProducts } = useContext(ShoppingCartContext);
  const handleNavigationBack = () => {
    navigate(`/`);
  };

  const handleNavigationCart = () => {
    navigate(`/cart`);
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" style={{ cursor: 'pointer' }} onClick={handleNavigationBack}>
          <img
            className="d-inline-block"
            src="https://alicorpdigital.atlassian.net/s/g2slup/b/9/5baf1cfdd74f421b9dd904b9d35631b8/_/jira-logo-scaled.png"
            width="100"
            alt="Logo"
            style={{height: '40px', width: '100%'}}
          />
        </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
            </ul> */}
            <button className="btn ms-auto btn-outline-dark" onClick={handleNavigationCart}>
              <i className="bi-cart-fill me-1"></i> Carrito
              <span> {cartProducts.length} </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
