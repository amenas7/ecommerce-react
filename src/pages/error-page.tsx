import { useRouteError, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError() as RouteError;

  const backHome = () => {
    navigate(`/`);
  };


  //console.error(error);
  // <i>{error.statusText || error.message}</i>
  return (
    <main>
       <div className="container">

          <Header />
         
          <section className="py-5">
            <div className="d-flex justify-content-center 
                  align-items-center flex-column 
                  text-center w-100">
              <div className="bg_img w-50">
              </div>
              <div>
                <p className="display-4">Ocurrio un error</p>
                <p>
                  <i>{error?.statusText || error?.message || "Error desconocido"}</i>
                </p>
                <button className="btn btn-primary" onClick={backHome}>
                  Volver al inicio
                </button>
              </div>
            </div>
          </section>
          
       </div>
       <Footer />
    </main>
    
  );
}
