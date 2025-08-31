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

    return(
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((p) => (
                    <li key={p._id}>
                        <Link to={`/product/${p._id}`}>{p.name}</Link> - ${p.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

