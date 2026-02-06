import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import MainLayout from './Layouts/common/MainLayout'
import { HomePage } from './Layouts/home/HomePage'
import { BlogPage } from './Layouts/blog/BlogPage'
import Register from './Layouts/auth/register'
import Login from './Layouts/auth/Login'
import Productdetail from './Layouts/products/productdetail'
import CourseDetail from './Layouts/products/CourseDetail'
import Cartpage from "./Layouts/cart/Cartpage";
import CheckOutPage from "./Layouts/checkout/CheckOutPage";
import VideoPage from "/src/Layouts/video/VideoPage.jsx";
import FlashcardPage from './Layouts/video/FlashcardPage.jsx'
import PracticePage from './Layouts/practice/PracticePage.jsx'
import ExamPage from './Layouts/exam/ExamPage.jsx'
import ExamResultPage from './Layouts/exam/ExamResultPage.jsx'
import MyCoursePage from './Layouts/mycourse/MyCoursePage.jsx'
import MyInformationPage from './Layouts/mycourse/MyInformationPage.jsx'
import MyProductMain from './Layouts/mycourse/component/MyProductMain.jsx'
import MyVocabularyPage from './Layouts/mycourse/MyVocabularyPage.jsx'
import './App.css'

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="Practice" element={<PracticePage />} />
        </Route>

        <Route path="/products/:id" element={<Productdetail />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/flashcard" element={<FlashcardPage />} />
        <Route path="/Exam" element={<ExamPage />} />
        <Route path="/ExamResult" element={<ExamResultPage />} />
        <Route path="/MyCourse" element={<MyCoursePage />} />
        <Route path="/Profile" element={<MyInformationPage />} />
        <Route path="/MyProduct" element={<MyProductMain />} />
        <Route path="/MyVocabulary" element={<MyVocabularyPage />} />
      </Routes>
 
  )
};

export default App;