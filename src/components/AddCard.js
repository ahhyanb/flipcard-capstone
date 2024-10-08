import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";

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

  const handleSaveButton = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://mockhost/decks/${deckId}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ front, back }),
      });
      console.log(response);
     
      setFront(""); // Clear the form after saving
      setBack("");
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error saving the card:", error);
    }
  };

  return (
    <>
      <div className="container my-3">
        {/* Breadcrumb Navigation */}
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

        {/* Use FormComponent */}
        <div className="card p-4" style={{ backgroundColor: '#F5F5DC', borderRadius: '10px' }}>
          <h2 className="mb-4" style={{ color: '#3B2F2F' }}>Create Card</h2>
          <FormComponent
            front={front}
            back={back}
            onFrontChange={(e) => setFront(e.target.value)}
            onBackChange={(e) => setBack(e.target.value)}
            onSubmit={handleSaveButton}
            onCancel={() => navigate(`/decks/${deckId}`)}
            isEditMode={false}
          />
        </div>
      </div>
    </>
  );
}

export default AddCard;
