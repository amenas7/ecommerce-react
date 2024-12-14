import { useContext, useState, useEffect } from "react";
import { ShoppingCartContext } from "../../context";

function Cart() {
  const { cartProducts = [], setCartProducts } = useContext(ShoppingCartContext); // Valor predeterminado como array vacío
  const [finalPrice, setFinalPrice] = useState(0);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;

    const updatedCart = cartProducts.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );

    setCartProducts(updatedCart);
    calculateFinalPrice(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cartProducts.filter((item) => item.id !== id);
    setCartProducts(updatedCart);
    calculateFinalPrice(updatedCart);
  };

  const calculateFinalPrice = (cartItems = []) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setFinalPrice(total.toFixed(2));
  };

  useEffect(() => {
    if (Array.isArray(cartProducts)) {
      calculateFinalPrice(cartProducts);
    }
  }, [cartProducts]);

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>

      {cartProducts?.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                  {item.title}
                </td>
                <td>S/ {item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
                    }
                    style={{ width: "60px" }}
                  />
                </td>
                <td>S/ {(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 text-end">
        <h4>Precio Final: S/ {finalPrice}</h4>
      </div>
    </div>
  );
}

export default Cart;
