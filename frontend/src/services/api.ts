import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getProducts = async () => {
    const {data} = await axios.get(`${API_URL}/products`);
    return data;
};

export const getCartFromServer = async (token: string) => {
    const res = await axios.get("http://localhost:5000/api/cart", {
        headers:{
            Authorization: `Bearer ${token}`,
        } ,
    });
    return res.data;
};

export const removeItemFromCart = async (productId: string ,token: string) => {
    const res = await axios.delete(`http://localhost:5000/api/cart/${productId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
}

export const updateCartQty = async (productId: string ,qty: number, token: string) => {
    const res = await axios.post(
        "http://localhost:5000/api/cart",
        {productId, qty},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
}

