import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Product{
    _id: string;
    name: string;
    description: string;
    price: string;
    countInStock: number;
    category: string;
    image: string;
}

export default function ProductPage(){
    const { id } = useParams<{ id: string }>();
    const [product, setProducts] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
        try{
            const res = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProducts(res.data);
        } catch(error){
            console.error("Error fetching product:", error);
        } finally{
            setLoading(false);
        }
    }
    fetchProduct();
    },[id]);

    const addToCart = async () => {
        if (!product) return;

        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

        if (!userInfo?.token) {
            alert("You must be logged in to add to cart");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.post(
            "http://localhost:5000/api/cart",
            {
                productId: product._id,
                qty: 1,
            },
            {
                headers: {
                Authorization: `Bearer ${userInfo.token}`,
                },
            }
            );

            console.log("Cart updated:", res.data);
            navigate("/cart");
        }  catch (error: any) {
            console.error("Failed to add to cart:", error);
            alert("Error adding to cart");
        }
    };

    if(loading) return <div>Loading products...</div>;
    if(!product) return <div>Product not found!</div>;

    return (
        <div className="product-page-container">
            <button className="back-button" onClick={() => navigate(-1)}>⬅ חזרה</button>

            <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />

            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ${product.price}</p>
                <p className="product-stock">
                {product.countInStock > 0
                    ? `In stock: ${product.countInStock}`
                    : "Out of stock"}
                </p>
                <p className="product-category">Category: {product.category}</p>

                <button
                className="add-to-cart-btn"
                onClick={addToCart}
                disabled={product.countInStock === 0}
                >
                Add to Cart 🛒
                </button>
            </div>
            </div>
        </div>
    );

}