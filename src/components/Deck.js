import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
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
        setDeck(fetchedDeck);
      } catch (error) {
        console.error("There was an error fetching the deck:", error);
        navigate("/"); // Redirect to home if the deck is not found
      } finally {
        setIsLoading(false);
      }
    }

    loadDeck();
  }, [deckId, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!deck) {
    return <p>Deck not found</p>;
  }

  return (
    <>
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
      </nav>

      {/* Deck Information */}
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>

      {/* Actions */}
      <div className="mb-3">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary me-2">Edit</Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary me-2">Study</Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary me-2">Add Card</Link>
        <button className="btn btn-danger" onClick={handleDeleteDeck}>Delete</button>
      </div>

      {/* Cards List */}
      <h2>Cards</h2>
      {deck.cards && deck.cards.length === 0 ? (
        <p>No cards found in this deck.</p>
      ) : (
        <ul className="list-group">
          {deck.cards && deck.cards.map((card) => (
            <li key={card.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p><strong>Q:</strong> {card.front}</p>
                  <p><strong>A:</strong> {card.back}</p>
                </div>
                <div>
                  <Link
                    to={`/decks/${deckId}/cards/${card.id}/edit`}
                    className="btn btn-secondary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  async function handleDeleteDeck() {
    const confirmDelete = window.confirm("Are you sure you want to delete this deck?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://mockhost/decks/${deckId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          navigate("/");
        } else {
          console.error("Failed to delete the deck");
        }
      } catch (error) {
        console.error("There was an error deleting the deck:", error);
      }
    }
  }

  async function handleDeleteCard(cardId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this card?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://mockhost/decks/${deckId}/cards/${cardId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Remove the card from the current deck state
          setDeck((prevDeck) => ({
            ...prevDeck,
            cards: prevDeck.cards.filter((card) => card.id !== cardId),
          }));
        } else {
          console.error("Failed to delete the card");
        }
      } catch (error) {
        console.error("There was an error deleting the card:", error);
      }
    }
  }
}

export default Deck;
