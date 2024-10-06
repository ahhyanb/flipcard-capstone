import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function EditDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deck, setDeck] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
        setName(fetchedDeck.name);
        setDescription(fetchedDeck.description);
      } catch (error) {
        console.log("There was an error fetching the deck", error);
        navigate("/");
      }
    }
    loadDeck();
  }, [deckId, navigate]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmitButton = async (event) => {
    event.preventDefault();

    try {
      // Make a PUT request to update the deck
      await fetch(`http://mockhost/decks/${deckId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          cards: [], // Include relevant keys except for id
        }),
      });

      // Navigate to the updated deck's page after a successful update
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating the deck:", error);
    }
  };

  const handleCancelButton = () => navigate("/");

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
              Edit Deck
            </li>
          </ol>
        </nav>

        {/* Edit Deck Form */}
        <div className="card p-4" style={{ backgroundColor: '#F5F5DC', borderRadius: '10px' }}>
          <h2 className="mb-4" style={{ color: '#3B2F2F' }}>Edit Deck</h2>
          <form onSubmit={handleSubmitButton}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter deck name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter deck description"
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
              <button type="submit" className="btn" style={{ backgroundColor: '#8B4513', color: 'white' }}>
                <i className="bi bi-check-lg"></i> Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditDeck;
