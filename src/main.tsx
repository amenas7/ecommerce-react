//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page.tsx";
import ProductDetailPage from "./pages/product-detail-page.tsx";
import Cart from "./components/Cart";
import { ShoppingCartProvider } from "./context/index.tsx";
import Layout from "./components/Layout";


const router = createBrowserRouter([
  {
    // parent route component
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    // child route components
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      }
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <ShoppingCartProvider>
    <RouterProvider router={router} />
  </ShoppingCartProvider>
)
