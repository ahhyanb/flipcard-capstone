import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Study() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    async function loadDeck() {
      try {
        const response = await fetch(`http://mockhost/decks/${deckId}`);
        const fetchedDeck = await response.json();
        setDeck(fetchedDeck);
      } catch (error) {
        console.log("There was an error fetching the deck", error);
        setDeck(null);
      }
    }
    loadDeck();
  }, [deckId]);

  if (deck === null) {
    navigate("/");
    return null;
  }

  if (!deck.cards) {
    return <p>Loading...</p>;
  }

  if (deck.cards.length <= 2) {
    return (
      <div className="container text-center my-4">
        <h2 className="text-danger">Not enough cards</h2>
        <p>You need at least 3 cards to study. There are currently {deck.cards.length} cards in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button className="btn btn-dark">
            <i className="bi bi-plus-lg"></i> Add Cards
          </button>
        </Link>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFront(!isFront);
  };

  const handleNext = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFront(true);
    } else {
      const shouldRestart = window.confirm("Restart cards? Click 'cancel' to return to the home page.");
      if (shouldRestart) {
        setCurrentCardIndex(0);
        setIsFront(true);
      } else {
        navigate("/");
      }
    }
  };

  const currentCard = deck.cards[currentCardIndex];

  return (
    <>
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
            Study
          </li>
        </ol>
      </nav>

      {/* Study Area */}
      <div className="container my-4">
        <h1 className="text-center">{deck.name}: Study</h1>
        {currentCard && (
          <div className="card text-center my-4" style={{ backgroundColor: '#F5F5DC', padding: '20px', borderRadius: '10px' }}>
            <div className="card-body">
              <h5 className="card-title">Card {currentCardIndex + 1} of {deck.cards.length}</h5>
              <p className="card-text" style={{ color: '#3B2F2F', fontSize: '1.25rem' }}>
                {isFront ? currentCard.front : currentCard.back}
              </p>
              <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-dark" onClick={handleFlip}>
                  <i className="bi bi-arrow-repeat"></i> Flip
                </button>
                {!isFront && (
                  <button className="btn btn-dark" onClick={handleNext}>
                    <i className="bi bi-chevron-right"></i> Next
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Study;
