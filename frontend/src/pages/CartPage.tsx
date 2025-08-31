import { useEffect, useState } from "react";
import {getCartFromServer, removeItemFromCart, updateCartQty} from '../services/api';

interface CartItem {
    _id: string,
    name: string,
    price: string,
    qty: number,
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const removeFromCart = async (productId: string) => {
        try{
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

            if(!userInfo){
                console.log("User not logged in!");
                return;
            }

            const data = await removeItemFromCart(productId, userInfo.token);
            setCartItems(data.items || []);
        }
        catch(error){
            console.error("Failed to remove item:", error);
        }
    };

    const updateQty = async (productId: string, change: number) => {
        try{
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

            if(!userInfo){
                console.log("User not logged in!");
                return;
            }
            const item = cartItems.find((item) =>  item._id === productId);
            if(!item) return;

            const newQty = item.qty + change;
            if(newQty < 1) return;

            const data = await updateCartQty(productId, newQty, userInfo.token);
            setCartItems( data.items || []);
        }   
        catch(error){
            console.error("Failed to update cart:", error);
        }
    }

    useEffect(()=>{
        const fetchCart = async () => {
            try{
                const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

                if(!userInfo){
                    console.log("User not logged in!");
                    return;
                }

                const data = await getCartFromServer(userInfo.token);
                setCartItems(data.items || []);
            }
            catch(error){
                console.error("Failed to fetch cart:", error);
            }
        }
        fetchCart();
    }, []);

    if(cartItems.length === 0){
        return (
            <div>The cart is empty!</div>
        );
    }
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

    return (
        <div>
            <h1>Your Cart Guy </h1>
            <ul>
                {cartItems.map((p)=>(
                    <li key={p._id}>
                        {p.name} - {p.price} × {p.qty}
                        &nbsp;
                        <button onClick={() => updateQty(p._id, -1)}> - </button>
                        <span>{p.qty}</span>
                        <button onClick={() => updateQty(p._id, 1)}> + </button>
                        &nbsp;
                        <button onClick={() => removeFromCart(p._id)}>Remove 🗑️</button>
                    </li>
                ))}
            </ul>
            <p> Total Items: {totalItems}</p>
        </div>
    );
}

