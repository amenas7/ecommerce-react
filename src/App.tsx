//core
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./app.css";
//
import ProductCard from "./components/ProductCard";
import { RespProduct } from "./types/product";
import { API_URL } from "./utils";
//import { ShoppingCartContext } from "./context";
import { useFetch } from "./hooks/useFetch";
import Banner from "./components/Banner/Index";
import { useState, useEffect } from "react";
import BeatLoader from "react-spinners/SyncLoader";

function App() {
  const [color, setColor] = useState("#694BEC");
  const [sortOption, setSortOption] = useState("asc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const URL = `${API_URL}/product_list.php?order=${sortOption}&idcategory=${selectedCategories.join(",")}`;
  const { data, loader, error } = useFetch<RespProduct>(URL, [sortOption, selectedCategories]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSortOption(selectedValue);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== value));
    }
  };

  if (loader)
    return (
      <div className="loader-container">
        <BeatLoader color={color} size={15} />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app-container pt-0">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Banner />
          </div>

          <div className="container">
            <div className="row mt-4">
              <div className="col-3">
                <h2 style={{ textAlign: "left", color: "#694BEC", fontWeight: "bold" }}>Filtros</h2>
              </div>

              <div className="col-9 d-flex justify-content-end align-items-center">
                <span style={{ fontSize: "20px", marginRight: "10px" }}>Ordenar por:</span>
                <select
                  className="form-select w-auto"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="asc">Precio: Menor a Mayor</option>
                  <option value="desc">Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>

            <div className="row mt-4 pe-0">
              <div className="col-3">
                <div className="card">
                  <div className="card-header" style={{ background: "none" }}>
                    <h5 className="mb-0">Categorías</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled" style={{ marginLeft: "15px", marginTop: "15px" }}>
                      {[
                        { id: "1", label: "Detergentes" },
                        { id: "2", label: "Salsas" },
                        { id: "3", label: "Enlatados" },
                        { id: "4", label: "Galletas" },
                      ].map((category) => (
                        <li key={category.id}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`category-${category.id}`}
                              value={category.id}
                              checked={selectedCategories.includes(category.id)} // Mantener estado
                              onChange={handleCheckboxChange}
                              style={{ cursor: "pointer" }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`category-${category.id}`}
                            >
                              {category.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-9">
                <div className="row g-3">
                  {data?.data.map((product) => (
                    <ProductCard {...product} key={product.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
