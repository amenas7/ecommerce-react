import { createContext, ReactNode, useState } from "react";
import { IProduct } from "../types/product";

interface ShoppingCartContextType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  cartProducts: IProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  onAdd: (product: IProduct, quantity: number) => void; // Añadir onAdd al tipo
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>(
  {} as ShoppingCartContextType
);


interface ShoppingCartProviderProps {
  children: ReactNode;
}

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [count, setCount] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);

  console.log("Listado...", cartProducts)

  function onAdd(product, quantity){

    const isAlreadyAdded = isInCart(product);

    if (isAlreadyAdded) {

      const productToModify = cartProducts.find(
        (cartProducts) => cartProducts.id === product.id
      );

      if (!productToModify) return; // Manejo de caso inesperado

      const productModified = {
        ...productToModify,
        quantity: (productToModify.quantity || 0) + quantity
      }

      setCartProducts((prevState) => 
        prevState.map((cartProducts) => 
          cartProducts.id === product.id ? productModified : cartProducts
        )
      );

    }else{
      const newProduct: IProduct = { ...product, quantity };
      setCartProducts((prevState) => prevState.concat(newProduct));
    }

  }

  function isInCart(product: IProduct): boolean {
    return cartProducts.some((cartproducts) => cartproducts.id === product.id);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        cartProducts,
        setCartProducts,
        onAdd
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
