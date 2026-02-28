import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

// Mock data - tạm thời để test frontend
const mockProducts = [
  {
    id: 1,
    name: "Bộ sách Tiếng Trung Cơ bản HSK 1-3",
    price: 250000,
    category: "Sách",
    stock: 15,
    image: "https://via.placeholder.com/300x200?text=Book+HSK+1-3",
    description: "Bộ sách học tiếng Trung toàn diện cho người bắt đầu",
    status: "active",
  },
  {
    id: 2,
    name: "Ứng dụng Learn Chinese Pro",
    price: 150000,
    category: "Phần mềm",
    stock: 100,
    image: "https://via.placeholder.com/300x200?text=App+Chinese",
    description: "Ứng dụng học tiếng Trung trên điện thoại",
    status: "active",
  },
  {
    id: 3,
    name: "Bộ flashcard Hán tự 500 chữ",
    price: 180000,
    category: "Flashcard",
    stock: 25,
    image: "https://via.placeholder.com/300x200?text=Flashcard",
    description: "Bộ flashcard học 500 chữ Hán cơ bản",
    status: "active",
  },
  {
    id: 4,
    name: "Khóa học trực tuyến HSK 4-6",
    price: 500000,
    category: "Khóa học",
    stock: 50,
    image: "https://via.placeholder.com/300x200?text=Course+HSK4-6",
    description: "Khóa học trực tuyến nâng cao từ HSK 4 đến 6",
    status: "active",
  },
];

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },  
  };
};

export const getAllProducts = async () => {
  // Mock: return mock data instead of API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 300); // Simulate network delay
  });
};  

export const getProductById = async (id) => {
  // Mock: find product from mock data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 200);
  });
};

export const createProduct = async (product) => {
  // Mock: add new product to mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct = {
        id: Math.max(...mockProducts.map(p => p.id), 0) + 1,
        ...product,
      };
      mockProducts.push(newProduct);
      resolve(newProduct);
    }, 300);
  });
};

export const updateProduct = async (id, product) => {
  // Mock: update product in mock data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockProducts.findIndex(p => p.id === parseInt(id));
      if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], ...product, id: parseInt(id) };
        resolve(mockProducts[index]);
      } else {
        reject(new Error("Product not found"));
      }
    }, 300);
  });
};

export const deleteProduct = async (id) => {
  // Mock: remove product from mock data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockProducts.findIndex(p => p.id === parseInt(id));
      if (index !== -1) {
        const deleted = mockProducts.splice(index, 1);
        resolve(deleted[0]);
      } else {
        reject(new Error("Product not found"));
      }
    }, 300);
  });
};

export const searchProducts = async (keyword) => {
  // Mock: search in mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockProducts.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
        p.description.toLowerCase().includes(keyword.toLowerCase())
      );
      resolve(results);
    }, 200);
  });
};
