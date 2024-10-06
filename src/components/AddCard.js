import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function AddCard() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

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
      } catch (error) {
        console.log("There was an error fetching the deck", error);
        navigate("/");
      }
    }
    loadDeck();
  }, [deckId, navigate]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSaveButton = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://mockhost/decks/${deckId}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          front: front,
          back: back,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save the card");
      }

      // Reset the form fields after saving the card
      setFront("");
      setBack("");
    } catch (error) {
      console.error("Error saving the card:", error);
    }
  };

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" style={{ color: 'black' }}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`} style={{ color: 'black' }}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Card
            </li>
          </ol>
        </nav>

        {/* Add Card Form */}
        <div className="card p-4" style={{ backgroundColor: '#F5F5DC', borderRadius: '10px' }}>
          <h2 className="mb-4" style={{ color: '#3B2F2F' }}>Create Card</h2>
          <form onSubmit={handleSaveButton}>
            <div className="mb-3">
              <label htmlFor="front" className="form-label">
                Front side
              </label>
              <textarea
                className="form-control"
                id="front"
                rows="3"
                value={front}
                onChange={handleFrontChange}
                placeholder="Enter front of the card"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="back" className="form-label">
                Back side
              </label>
              <textarea
                className="form-control"
                id="back"
                rows="3"
                value={back}
                onChange={handleBackChange}
                placeholder="Enter back of the card"
              />
            </div>

            <div className="d-flex justify-content-start gap-3">
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: 'black', color: 'white' }}
                onClick={() => navigate(`/decks/${deckId}`)}
              >
                <i className="bi bi-x-lg"></i> Done
              </button>
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: '#8B4513', color: 'white' }}
              >
                <i className="bi bi-check-lg"></i> Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCard;
