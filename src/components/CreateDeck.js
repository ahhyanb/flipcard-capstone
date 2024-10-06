import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateDeck() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmitButton = async (event) => {
    event.preventDefault();

    // Create formData including all relevant keys (name, description, cards)
    const formData = {
      name: name,
      description: description,
      cards: [], // Including cards as per the instructions
    };

    try {
      // Send a POST request with the formData as the body
      const response = await fetch("http://mockhost/decks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create a new deck");
      }

      const newDeck = await response.json();
      navigate(`/decks/${newDeck.id}`); // Navigate to the newly created deck's page
    } catch (error) {
      console.error("Error creating the deck:", error);
    }
  };

  const handleCancelButton = () => navigate("/");

  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav className="container my-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: 'black' }}>Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <hr />

      {/* Create Deck Form */}
      <div className="container">
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
    </>
  );
}

export default CreateDeck;
