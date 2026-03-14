import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();


const API = "http://localhost:8080/api";
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
    const getToken = () => localStorage.getItem("token");
  const getGuestId = () => {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = crypto.randomUUID();
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  };

  const authHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };


    const fetchCart = async () => {
    const guestId = getGuestId();
    const token = getToken();

    const url = token
      ? `${API}/cart`
      : `${API}/cart?guestId=${guestId}`;

    try {
      const res = await fetch(url, { headers: authHeaders() });
      if (!res.ok) return;
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("fetchCart error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (itemId, itemType, quantity = 1) => {
    const token = getToken();
    const guestId = getGuestId();

  const payload = {
    itemId,
    itemType, 
    quantity,
    guestId: token ? null : guestId, // có token → null, chưa login → guestId
  };

  try {
    const res = await fetch(`${API}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify(payload),
    });

    console.log(">>> response status:", res.status);
     const text = await res.text();
 console.log(">>> response:", text);

    await fetchCart();
  } catch (err) {
    console.error("addToCart error:", err);
  }
};
  const increaseQuantity = async (cartItemId) => {
    await fetch(`${API}/cart/increase/${cartItemId}`, {
      method: "PUT",
      headers: authHeaders(),
    });
    await fetchCart();
  };

  // ─── Giảm số lượng ───
  const decreaseQuantity = async (cartItemId) => {
    await fetch(`${API}/cart/decrease/${cartItemId}`, {
      method: "PUT",
      headers: authHeaders(),
    });
    await fetchCart();
  };

  // ─── Xóa item ───
  const removeFromCart = async (cartItemId) => {
    await fetch(`${API}/cart/remove/${cartItemId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    await fetchCart();
  };

  // ─── Merge khi login ───
  const mergeCartAfterLogin = async (token) => {
    const guestId = localStorage.getItem("guestId");
    if (!guestId) return;

    await fetch(`${API}/cart/merge?guestId=${guestId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.removeItem("guestId");
    await fetchCart();
  };
  const clearCart = async () => {
  const token = getToken();
  const guestId = getGuestId();

  const url = token
    ? `${API}/cart/clear`
    : `${API}/cart/clear?guestId=${guestId}`;

  try {
    await fetch(url, {
      method: "DELETE",
      headers: authHeaders(),
    });

    setCartItems([]); // 🔥 reset ngay UI
  } catch (err) {
    console.error("clearCart error:", err);
  }
};
return (
    <CartContext.Provider value={{
      cartItems,
      cartCount: cartItems.length,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      mergeCartAfterLogin,
      fetchCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);