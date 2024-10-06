import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    async function loadCard() {
      try {
        const response = await fetch(`http://mockhost/decks/${deckId}/cards/${cardId}`);
        if (response.status === 404) {
          navigate(deckId ? `/decks/${deckId}` : "/"); // Redirect appropriately if not found
          return;
        }
        const fetchedCard = await response.json();
        setCard(fetchedCard);
        setFront(fetchedCard.front);
        setBack(fetchedCard.back);
      } catch (error) {
        console.log("There was an error fetching the card", error);
        navigate(deckId ? `/decks/${deckId}` : "/");
      }
    }
    loadCard();
  }, [deckId, cardId, navigate]);

  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);

  const handleSaveButton = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://mockhost/decks/${deckId}/cards/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          front: front,
          back: back,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the card");
      }

      navigate(`/decks/${deckId}`); // Navigate to the deck page after saving
    } catch (error) {
      console.error("Error updating the card:", error);
    }
  };

  const handleCancelButton = () => navigate(`/decks/${deckId}`);

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
              <Link to={`/decks/${deckId}`} style={{ color: 'black' }}>{card.deckName}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card
            </li>
          </ol>
        </nav>

        {/* Edit Card Form */}
        <div className="card p-4" style={{ backgroundColor: '#F5F5DC', borderRadius: '10px' }}>
          <h2 className="mb-4" style={{ color: '#3B2F2F' }}>Edit Card</h2>
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
                onClick={handleCancelButton}
              >
                <i className="bi bi-x-lg"></i> Cancel
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

export default EditCard;
