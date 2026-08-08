import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const AdminForm = () => {
  const { addManualProduct } = useContext(ProductContext);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    categoryId: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...form,
      id: `local-${Date.now()}`,
      images: [form.image],
      price: Number(form.price),
    };

    addManualProduct(newProduct);
    alert("Product added successfully to Local Storage!");
    setForm({
      title: "",
      price: "",
      description: "",
      image: "",
      categoryId: 1,
    });
  };

  return (
    <main className="admin-page">
      <h2>List a New Product</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          rows={5}
        />
        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </main>
  );
};

export default AdminForm;
