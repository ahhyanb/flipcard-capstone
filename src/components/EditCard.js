import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";

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
          navigate(deckId ? `/decks/${deckId}` : "/");
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

  const handleSaveButton = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://mockhost/decks/${deckId}/cards/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ front, back }),
      });
      
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating the card:", error);
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
              <Link to={`/decks/${deckId}`} style={{ color: 'black' }}>{card.deckName}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Card
            </li>
          </ol>
        </nav>

        {/* Use FormComponent */}
        <div className="card p-4" style={{ backgroundColor: '#F5F5DC', borderRadius: '10px' }}>
          <h2 className="mb-4" style={{ color: '#3B2F2F' }}>Edit Card</h2>
          <FormComponent
            front={front}
            back={back}
            onFrontChange={(e) => setFront(e.target.value)}
            onBackChange={(e) => setBack(e.target.value)}
            onSubmit={handleSaveButton}
            onCancel={() => navigate(`/decks/${deckId}`)}
            isEditMode={true}
          />
        </div>
      </div>
    </>
  );
}

export default EditCard;
