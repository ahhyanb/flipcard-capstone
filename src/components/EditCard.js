import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDeckAndCard() {
      try {
        // Fetch the deck
        const deckResponse = await fetch(`http://mockhost/decks/${deckId}`);
        if (!deckResponse.ok) {
          throw new Error("Deck not found");
        }
        const fetchedDeck = await deckResponse.json();
        setDeck(fetchedDeck);

        // Fetch the card
        const cardResponse = await fetch(`http://mockhost/decks/${deckId}/cards/${cardId}`);
        if (!cardResponse.ok) {
          throw new Error("Card not found");
        }
        const fetchedCard = await cardResponse.json();
        setCard(fetchedCard);

      } catch (error) {
        console.error("There was an error fetching the deck or card:", error);
        if (error.message === "Deck not found") {
          navigate("/"); // Redirect to home if the deck is not found
        } else if (error.message === "Card not found") {
          navigate(`/decks/${deckId}`); // Redirect to deck page if the card is not found
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadDeckAndCard();
  }, [deckId, cardId, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!deck || !card) {
    return <p>Deck or card not found</p>;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCard({
      ...card,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://mockhost/decks/${deckId}/cards/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      });
      if (response.ok) {
        navigate(`/decks/${deckId}`);
      } else {
        console.error("Failed to update the card");
      }
    } catch (error) {
      console.error("There was an error updating the card:", error);
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
      </nav>

      <h1>Edit Card</h1>

      {/* Edit Card Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            value={card.front}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            value={card.back}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">Save</button>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
      </form>
    </>
  );
}

export default EditCard;
