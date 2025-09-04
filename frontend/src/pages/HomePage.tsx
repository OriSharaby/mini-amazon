import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Link } from "react-router-dom";

interface Product{
    _id: string;
    name: string;
    price: number;
}

export default function HomePage(){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts()
        .then((data) => {
            setProducts(data.products || data);
        })
        .finally(() => setLoading(false));
    }, []);

    if(loading) return <div>Loading products...</div>

   return (
    <div className="home-container">
      <h1 className="home-title">🛒 Products</h1>
      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <Link to={`/product/${p._id}`} className="product-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

