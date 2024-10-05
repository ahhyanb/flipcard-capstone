import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function Study({ decks }) {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const deckFound = decks.find((d) => d.id === parseInt(deckId));
    if (deckFound) {
      setDeck(deckFound);
    } else {
      navigate("/"); // Redirect to home if the deck is not found
    }
    setIsLoading(false);
  }, [deckId, decks, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!deck) {
    return <p>Deck not found</p>;
  }

  if (deck.cards.length < 3) {
    return (
      <div>
        <p>Not enough cards. You need at least 3 cards to study.</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      if (window.confirm("Restart deck?")) {
        setCurrentCardIndex(0);
      } else {
        navigate('/');
      }
    }
  };

  const currentCard = deck.cards[currentCardIndex];

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>

      <h1>{deck.name} - Study</h1>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card {currentCardIndex + 1} of {deck.cards.length}</h5>
          <p className="card-text">{isFlipped ? currentCard.back : currentCard.front}</p>
          <button className="btn btn-secondary me-2" onClick={handleFlip}>Flip</button>
          {isFlipped && (
            <button className="btn btn-primary" onClick={handleNext}>Next</button>
          )}
        </div>
      </div>
    </>
  );
}

export default Study;
