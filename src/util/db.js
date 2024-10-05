export default {
  keys: ["decks", "cards"],
  data: {
    decks: [
      {
        id: 1,
        name: "React",
        description: "Quiz cards about the React frontend framework.",
        cards: [
          {
            id: 1,
            front:
              "What is the difference between the Real DOM and Virtual DOM?",
            back: "Virtual DOM updates are faster but do not directly update the HTML.",
            deckId: 1,
          },
          {
            id: 2,
            front:
              "How do you modify the state of a different React component?",
            back: "Not at all! State is visible to the component only.",
            deckId: 1,
          },
          {
            id: 3,
            front: "How do you pass data 'down' to a React child component?",
            back: "As properties or props.",
            deckId: 1,
          },
        ],
      },
      {
        id: 2,
        name: "React Router",
        description: "Quiz cards about the React Router library.",
        cards: [
          {
            front: "How can you make a route 'catch' all non-matching routes?",
            back: "You can use the asterisk (*) symbol as the value to the path.",
            deckId: 2,
            id: 1,
          },
          {
            front:
              "Why should you not use traditional anchor tags with React Router?",
            back: "Anchor tags (<a>) will cause the page to reload.",
            deckId: 2,
            id: 2,
          },
        ],
      },
      {
        id: 3,
        name: "Basic Data Structures and Algorithms",
        description: "Introduction to searching algorithms and Big O.",
        cards: [],
      },
    ],
  },
};
