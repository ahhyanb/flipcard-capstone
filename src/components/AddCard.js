import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDeck() {
      try {
        const response = await fetch(`http://mockhost/decks/${deckId}`);
        if (!response.ok) {
          throw new Error("Deck not found");
        }
        const fetchedDeck = await response.json();
        setDeck(fetchedDeck);
      } catch (error) {
        console.error("There was an error fetching the deck:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDeck();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://mockhost/decks/${deckId}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ front, back }),
      });
      setFront("");
      setBack(""); // Clear the form after adding a card
    } catch (error) {
      console.error("There was an error adding the card:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!deck) {
    return <p>Deck not found</p>;
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>

      <h1>Add Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Front</label>
          <textarea
            className="form-control"
            id="front"
            rows="3"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">Back</label>
          <textarea
            className="form-control"
            id="back"
            rows="3"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">Save</button>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">Done</Link>
      </form>
    </>
  );
}

export default AddCard;
