import { useState } from "react";
import axios from "axios";
import "../styles/AddProductPage.css"

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [countInStock, setCountInStock] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/products",
        {
          name,
          description,
          price,
          countInStock,
          category,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("userInfo") || "{}"
            ).token}`,
          },
        }
      );
      alert(`Product "${data.name}" created successfully!`);
    } catch (error) {
      alert("Error creating product.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Add New Product</h2>
        
          <label>
            Product Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Price ($)
            <input
              type="text" // כאן אנו משתמשים ב-"text" כדי למנוע את חיצי המספר
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </label>

          <label>
            Count In Stock
            <input
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
              required
            />
          </label>

          <label>
            Category
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </label>

          <label>
            Image URL
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>

          <button type="submit">Create Product</button>
      </form>

    </div>
  );
}
