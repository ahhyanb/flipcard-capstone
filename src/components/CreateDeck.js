import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://mockhost/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, cards: [] }),
      });
      const newDeck = await response.json();
      navigate(`/decks/${newDeck.id}`);
    } catch (error) {
      console.error("There was an error creating the deck:", error);
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>

      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">Submit</button>
        <Link to="/" className="btn btn-secondary">Cancel</Link>
      </form>
    </>
  );
}

export default CreateDeck;
