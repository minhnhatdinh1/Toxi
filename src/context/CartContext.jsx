import React, { createContext, useContext, useState, useEffect } from "react";
import { isOfflineApiError } from "../utils/apiClient";
const BASE_URL = import.meta.env.VITE_API_URL;


const CartContext = createContext();


const API = `${BASE_URL}/api`;
const CART_PRICE_OVERRIDES_KEY = "cartPriceOverrides";

const buildFileUrl = (value) => {
  if (!value || typeof value !== "string") return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${API}/files/${value.replace(/^\/+/, "")}`;
};

const pickCatalogItem = (item = {}) =>
  item.book ||
  item.course ||
  item.combo ||
  item.product ||
  item.item ||
  {};

const toNumber = (...values) => {
  for (const value of values) {
    const num = Number(value);
    if (Number.isFinite(num) && num > 0) return num;
  }
  return 0;
};

const readPriceOverrides = () => {
  try {
    const raw = localStorage.getItem(CART_PRICE_OVERRIDES_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("readPriceOverrides error:", error);
    return {};
  }
};

const writePriceOverrides = (overrides) => {
  try {
    localStorage.setItem(CART_PRICE_OVERRIDES_KEY, JSON.stringify(overrides));
  } catch (error) {
    console.error("writePriceOverrides error:", error);
  }
};

const buildOverrideKey = (itemType, itemId) => `${itemType || ""}:${itemId || ""}`;

const fetchItemDiscountMeta = async (itemType, itemId) => {
  if (!itemType || !itemId) return null;

  let url = "";
  if (itemType === "BOOK") {
    url = `${API}/books/${itemId}`;
  } else if (itemType === "COURSE") {
    url = `${API}/courses/${itemId}`;
  } else {
    return null;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      title: data.title || data.name || "",
      imageUrl: data.thumbnailUrl || data.thumbnail || data.imageUrl || data.image || "",
      originalPrice: toNumber(data.price, data.originalPrice),
      discountPrice: toNumber(data.discountPrice, data.finalPrice),
    };
  } catch (error) {
    console.error("fetchItemDiscountMeta error:", error);
    return null;
  }
};

const normalizeCartItem = (item = {}, overrides = {}) => {
  const catalog = pickCatalogItem(item);
  const itemType =
    item.itemType ||
    item.type ||
    (item.book ? "BOOK" : item.course ? "COURSE" : item.combo ? "COMBO" : "");
  const itemId =
    item.itemId || catalog.bookId || catalog.courseId || catalog.comboId || catalog.id;
  const override = overrides[buildOverrideKey(itemType, itemId)] || {};
  const originalPrice = toNumber(
    override.originalPrice,
    item.originalPrice,
    catalog.originalPrice,
    catalog.price,
    item.unitPrice,
    item.price
  );
  const discountPrice = toNumber(
    override.discountPrice,
    item.discountPrice,
    item.finalPrice,
    catalog.discountPrice,
    catalog.finalPrice
  );
  const displayPrice =
    discountPrice > 0 && (originalPrice <= 0 || discountPrice < originalPrice)
      ? discountPrice
      : toNumber(item.price, item.unitPrice, catalog.price, discountPrice);

  return {
    ...item,
    cartItemId: item.cartItemId || item.id,
    itemId,
    itemType,
    title: override.title || item.title || item.name || catalog.title || catalog.name || "Sản phẩm",
    imageUrl: buildFileUrl(
      override.imageUrl ||
        item.imageUrl ||
        item.thumbnailUrl ||
        catalog.thumbnailUrl ||
        catalog.thumbnail ||
        catalog.imageUrl ||
        catalog.image
    ),
    quantity: Number(item.quantity || item.qty || 1),
    price: displayPrice,
    originalPrice,
    discountPrice,
    finalPrice: discountPrice || displayPrice,
  };
};

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
      const overrides = readPriceOverrides();
      const missingDiscountItems = Array.isArray(data)
        ? data.filter((item) => {
            const catalog = pickCatalogItem(item);
            const itemType =
              item.itemType ||
              item.type ||
              (item.book ? "BOOK" : item.course ? "COURSE" : item.combo ? "COMBO" : "");
            const itemId =
              item.itemId || catalog.bookId || catalog.courseId || catalog.comboId || catalog.id;
            const override = overrides[buildOverrideKey(itemType, itemId)];
            const currentDiscount = toNumber(
              override?.discountPrice,
              item.discountPrice,
              item.finalPrice,
              catalog.discountPrice,
              catalog.finalPrice
            );
            return (itemType === "BOOK" || itemType === "COURSE") && itemId && currentDiscount <= 0;
          })
        : [];

      if (missingDiscountItems.length > 0) {
        const detailOverrides = await Promise.all(
          missingDiscountItems.map(async (item) => {
            const catalog = pickCatalogItem(item);
            const itemType =
              item.itemType ||
              item.type ||
              (item.book ? "BOOK" : item.course ? "COURSE" : item.combo ? "COMBO" : "");
            const itemId =
              item.itemId || catalog.bookId || catalog.courseId || catalog.comboId || catalog.id;
            const meta = await fetchItemDiscountMeta(itemType, itemId);
            return meta ? [buildOverrideKey(itemType, itemId), meta] : null;
          })
        );

        detailOverrides.forEach((entry) => {
          if (!entry) return;
          const [key, value] = entry;
          overrides[key] = {
            ...(overrides[key] || {}),
            ...value,
          };
        });
        writePriceOverrides(overrides);
      }

      const normalizedItems = Array.isArray(data)
        ? data.map((item) => normalizeCartItem(item, overrides))
        : [];
      setCartItems(normalizedItems);
    } catch (err) {
      if (!isOfflineApiError(err)) {
        console.error("fetchCart error:", err);
      }
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (itemId, itemType, quantity = 1, itemMeta = null) => {
    const token = getToken();
    const guestId = getGuestId();

  if (itemMeta) {
    const overrides = readPriceOverrides();
    overrides[buildOverrideKey(itemType, itemId)] = {
      title: itemMeta.title || itemMeta.name || "",
      imageUrl: itemMeta.imageUrl || itemMeta.image || itemMeta.thumbnailUrl || "",
      originalPrice: toNumber(itemMeta.originalPrice, itemMeta.price),
      discountPrice: toNumber(itemMeta.discountPrice, itemMeta.finalPrice),
    };
    writePriceOverrides(overrides);
  }

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
