# 🧠 Flipcard Capstone Project

An interactive full-stack flashcard application that enables users to create, manage, and study decks of flashcards. This project demonstrates proficiency in building responsive user interfaces, implementing RESTful APIs, and managing application state effectively.

## 🚀 Features

- **Responsive Design**: Utilizes React, Flexbox, and Bootstrap to ensure seamless user experience across devices.
- **Full CRUD Functionality**: Supports Create, Read, Update, and Delete operations for both decks and individual flashcards.
- **Efficient State Management**: Employs React Hooks for dynamic UI updates and state handling.
- **RESTful API Integration**: Backend built with Node.js and Express.js, providing robust and scalable endpoints.
- **In-Memory Data Handling**: Simplifies data management during development and testing phases.

## 🛠️ Tech Stack

- **Frontend**: React, Bootstrap, Flexbox
- **Backend**: Node.js, Express.js
- **Version Control**: Git & GitHub

## 📁 Project Structure

```
flipcard-capstone/
├── __tests__/          # Test suites
├── build/              # Production build files
├── node_modules/       # Project dependencies
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   ├── services/       # API service calls
│   └── App.js          # Root component
├── .attachignore       # Attach ignore file
├── .qualified-attach.json # Qualified attach configuration
├── README.md           # Project documentation
├── babel.config.js     # Babel configuration
├── jest.config.js      # Jest testing configuration
├── package-lock.json   # Dependency lock file
└── package.json        # Project metadata and scripts
```

## 🧪 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ahhyanb/flipcard-capstone.git
   cd flipcard-capstone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## 📬 API Endpoints

### Decks

- `GET /decks` - Retrieve all decks
- `POST /decks` - Create a new deck
- `GET /decks/:deckId` - Retrieve a specific deck
- `PUT /decks/:deckId` - Update a deck
- `DELETE /decks/:deckId` - Delete a deck

### Cards

- `GET /decks/:deckId/cards` - Retrieve all cards in a deck
- `POST /decks/:deckId/cards` - Add a new card to a deck
- `GET /decks/:deckId/cards/:cardId` - Retrieve a specific card
- `PUT /decks/:deckId/cards/:cardId` - Update a card
- `DELETE /decks/:deckId/cards/:cardId` - Delete a card

## 🖼️ Screenshots

*(Include screenshots or GIFs of your application here to showcase the UI and functionality.)*

## 🧠 Skills Demonstrated

- **Frontend Development**: Building responsive and dynamic user interfaces with React.
- **Backend Development**: Creating RESTful APIs with Node.js and Express.js.
- **State Management**: Managing application state using React Hooks.
- **Version Control**: Utilizing Git and GitHub for source code management.
- **Testing**: Writing and running tests to ensure application reliability.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Developed with passion by [ahhyanb](https://github.com/ahhyanb)
