import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Deck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDeck() {
      try {
        const response = await fetch(`http://mockhost/decks/${deckId}`);
        if (response.status === 404) {
          navigate("/");
          return;
        }
        const fetchedDeck = await response.json();
        setDeck(fetchedDeck);
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching the deck", error);
        setIsLoading(false);
      }
    }
    loadDeck();
  }, [deckId, navigate]);

  useEffect(() => {
    async function loadCards() {
      try {
        const response = await fetch(`http://mockhost/decks/${deckId}/cards`);
        const fetchedCards = await response.json();
        setCards(fetchedCards);
      } catch (error) {
        console.error("There was an error fetching the cards", error);
      }
    }
    loadCards();
  }, [deckId]);

  const handleDeleteDeck = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this deck? This action cannot be undone."
    );

    if (shouldDelete) {
      try {
        await fetch(`http://mockhost/decks/${deckId}`, { method: "DELETE" });
        navigate("/"); // Navigate back to the home page after deletion
      } catch (error) {
        console.error("There was an error deleting the deck", error);
      }
    }
  };

  const handleDeleteCard = async (cardId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this card? This action cannot be undone."
    );

    if (shouldDelete) {
      try {
        await fetch(`http://mockhost/cards/${cardId}`, { method: "DELETE" });
        setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      } catch (error) {
        console.error("There was an error deleting the card", error);
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav className="container my-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: 'black' }}>Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      {/* Deck Details */}
      <div className="container my-4">
        <div className="card p-4" style={{ backgroundColor: '#F5F5DC' }}>
          <h2 style={{ color: '#3B2F2F' }}>{deck.name}</h2>
          <p style={{ color: '#3B2F2F' }}>{deck.description}</p>
          <div className="d-flex justify-content-start gap-3">
            <button
              className="btn"
              style={{ backgroundColor: 'black', color: 'white' }}
              onClick={() => navigate(`/decks/${deckId}/edit`)}
            >
              <i className="bi bi-pencil-square"></i> Edit
            </button>
            <button
              className="btn"
              style={{ backgroundColor: '#8B4513', color: 'white' }}
              onClick={() => navigate(`/decks/${deckId}/study`)}
            >
              <i className="bi bi-book"></i> Study
            </button>
            <button
              className="btn"
              style={{ backgroundColor: '#8B4513', color: 'white' }}
              onClick={() => navigate(`/decks/${deckId}/cards/new`)}
            >
              <i className="bi bi-plus-lg"></i> Add Cards
            </button>
            <button
              className="btn"
              style={{ backgroundColor: '#A52A2A', color: 'white' }}
              onClick={handleDeleteDeck}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>

      <hr />

      {/* Cards List */}
      <div className="container my-4">
        <h2>Cards</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Front / Questions</th>
              <th scope="col">Back / Answers</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card.id}>
                <td>{card.front}</td>
                <td>{card.back}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: 'black', color: 'white', marginRight: '10px' }}
                    onClick={() => navigate(`/decks/${deckId}/cards/${card.id}/edit`)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: '#A52A2A', color: 'white' }}
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Deck;
