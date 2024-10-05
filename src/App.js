import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Study from "./components/Study";
import CreateDeck from "./components/CreateDeck";
import Deck from "./components/Deck";
import EditDeck from "./components/EditDeck";
import AddCard from "./components/AddCard";
import EditCard from "./components/EditCard";

function App() {
  return (
    <>
       <header
        className="container text-center my-4"
        style={{ 
          backgroundColor: '#F5F5DC',
          padding: '20px', 
          borderRadius: '8px',
          border: '2px solid #D3D3D3'
        }}>
        <h1 
          className="display-4" 
          style={{ fontWeight: 'bold', color: 'black' }}>
          FLIPCARD
        </h1>
        <p 
          className="lead" 
          style={{ color: '#8B4513' }}>
          Flip • Learn • Master
        </p>
      </header>

      {/* Routes */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId" element={<Deck />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
          <Route path="*" element={<p>Not found.</p>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
