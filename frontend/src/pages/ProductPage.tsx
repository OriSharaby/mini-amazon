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
        <div>
            <button onClick={() => navigate(-1)}>⬅ חזרה</button>
            <h1> {product.name}</h1>
            <img src={product.image} alt={product.name} width="200" />
            <p> {product.description}</p>
            <p> Price: ${product.price}</p>
            <p> In stock: ${product.countInStock}</p>
            <p> Category: ${product.category}</p>
            <button onClick={addToCart}>Add to cart 🛒 </button>
        </div>
    );
}