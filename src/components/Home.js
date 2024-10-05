import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      try {
        const response = await fetch("http://mockhost/decks");
        const fetchedDecks = await response.json();
        setDecks(fetchedDecks);
      } catch (error) {
        console.log("There was an error fetching the decks", error);
      }
    }
    loadDecks();
  }, []);

  const handleStudyButton = (deckId) => {
    navigate(`/decks/${deckId}/study`);
  };

  const handleViewButton = (deckId) => {
    navigate(`/decks/${deckId}`);
  };

  const handleDeleteButton = (deckId) => {
    if (window.confirm("Do you want to DELETE this deck?")) {
      // Filter out the deck with the specified ID
      const newDecks = decks.filter((deck) => deck.id !== deckId);
      // Update state with the filtered decks array
      setDecks(newDecks);
    }
  };

  return (
    <>
      {/* Create Deck Button */}
      <div className="text-center my-4">
        <button
          className="btn"
          style={{ backgroundColor: '#8B4513', color: 'white' }} // Dark brown color
          onClick={() => navigate("/decks/new")}
        >
          <i className="bi bi-plus-lg"></i> Create Deck
        </button>
      </div>
      <hr />

      {/* Decks List */}
      <div className="container">
        <div className="row">
          {decks.map((deck) => (
            <div className="col-md-6 mb-4" key={deck.id}>
              <div
                className="card"
                style={{ backgroundColor: '#F5F5DC' }} // Light brown/beige color
              >
                <div className="card-body">
                  <h2 className="card-title" style={{ color: '#3B2F2F' }}>{deck.name}</h2> {/* Dark brown */}
                  <p className="card-subtitle mb-2" style={{ color: '#3B2F2F' }}> {/* Dark brown */}
                    {deck.cards.length} Cards
                  </p>
                  <p className="card-text" style={{ color: '#3B2F2F' }}>{deck.description}</p> {/* Dark brown */}
                  <div className="d-flex justify-content-start gap-2">
                    <button
                      className="btn"
                      style={{ backgroundColor: 'black', color: 'white' }} // Black button
                      onClick={() => handleStudyButton(deck.id)}
                    >
                      <i className="bi bi-book"></i> Study
                    </button>
                    <button
                      className="btn"
                      style={{ backgroundColor: '#8B4513', color: 'white' }} // Dark brown button
                      onClick={() => handleViewButton(deck.id)}
                    >
                      <i className="bi bi-eye"></i> View
                    </button>
                    <button
                      className="btn"
                      style={{ backgroundColor: '#A52A2A', color: 'white' }} // Red-brown color
                      onClick={() => handleDeleteButton(deck.id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
