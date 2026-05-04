import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

const getToken = () => localStorage.getItem("authToken") || localStorage.getItem("token") || "";

const getConfig = () => {
  const token = getToken();
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};

const normalizeDeckImageUrl = (value) => {
  if (!value || typeof value !== "string") return "";

  if (value.startsWith("http")) return value;

  let normalizedValue = value.replace(/^\/+/, "");

  if (normalizedValue.startsWith("api/")) {
    normalizedValue = normalizedValue.replace(/^api\/+/, "");
  }
  if (normalizedValue.startsWith("uploads/")) {
    normalizedValue = normalizedValue.replace(/^uploads\/+/, "");
  }
  if (normalizedValue.startsWith("files/")) {
    normalizedValue = normalizedValue.replace(/^files\/+/, "");
  }

  return `${BASE_URL}/uploads/${normalizedValue}`;
};
const normalizeDeck = (deck) => {
  if (!deck || typeof deck !== "object") return deck;

  const normalizedId =
    deck.id ??
    deck.deckId ??
    deck.flashcardDeckId ??
    deck.deck_id ??
    deck._id ??
    null;
  const cardCountFallback = deck.cardCount ?? deck.count ?? deck.totalCards ?? deck.total_cards ?? deck.flashcards?.length ?? deck.cards?.length ?? deck.items?.length ?? 0;

  return {
    ...deck,
    id: normalizedId,
    imageUrl: normalizeDeckImageUrl(deck.imageUrl || deck.coverUrl || deck.thumbnailUrl || deck.image || ""),
    cardCount: Number(cardCountFallback) || 0,
  };
};

export const getDecks = async () => {
  const response = await API.get("/decks", getConfig());
  if (Array.isArray(response.data)) {
    response.data = response.data.map(normalizeDeck);
  }
  return response;
};
export const getDeckById = async (id) => {
  const response = await API.get(`/decks/${id}`, getConfig());
  response.data = normalizeDeck(response.data);
  return response;
};
export const createDeck = (data) => API.post("/decks", data, getConfig());
export const updateDeck = (id, data) => API.put(`/decks/${id}`, data, getConfig());
export const deleteDeck = (id) => API.delete(`/decks/${id}`, getConfig());

export const getFlashcards = () => API.get("/flashcards", getConfig());
export const getFlashcardsByDeckId = (deckId) => API.get(`/flashcards/deck/${deckId}`, getConfig());
export const createFlashcard = (data) => API.post("/flashcards", data, getConfig());
export const updateFlashcard = (id, data) => API.put(`/flashcards/${id}`, data, getConfig());
export const deleteFlashcard = (id) => API.delete(`/flashcards/${id}`, getConfig());
