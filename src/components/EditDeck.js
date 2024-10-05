import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function EditDeck() {
  const { deckId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDeck() {
      try {
        const response = await fetch(`http://mockhost/decks/${deckId}`);
        if (!response.ok) {
          throw new Error("Deck not found");
        }
        const fetchedDeck = await response.json();
        setName(fetchedDeck.name);
        setDescription(fetchedDeck.description);
      } catch (error) {
        console.error("There was an error fetching the deck:", error);
        navigate("/"); // Redirect to home if there's an error
      } finally {
        setIsLoading(false);
      }
    }

    loadDeck();
  }, [deckId, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://mockhost/decks/${deckId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("There was an error updating the deck:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>

      <h1>Edit Deck</h1>
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
        <button type="submit" className="btn btn-primary me-2">Save</button>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
      </form>
    </>
  );
}

export default EditDeck;
