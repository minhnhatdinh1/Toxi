import { UseState } from 'react'
import ReactLogo from './assets/react.svg'
import ViteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import MainLayout from './Layouts/common/MainLayout'
import { HomePage } from './Layouts/home/HomePage'
import { BlogPage } from './Layouts/blog/BlogPage'
import { Navigate } from "react-router-dom";


import Register from './Layouts/auth/Register.jsx'

import Login from './Layouts/auth/Login'
import Productdetail from './Layouts/products/Productdetail'
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
import Course from './Layouts/products/Course.jsx'
import StepEmail from './Layouts/auth/ForgotPassword/StepEmail.jsx'
import './App.css'
import Product from './Layouts/products/Product.jsx';
import StepCode from './Layouts/auth/ForgotPassword/StepCode.jsx';
import StepReset from './Layouts/auth/ForgotPassword/StepReset.jsx';
import AdminPage from './Layouts/admin/AdminPage.jsx';
import AdminCourse from './Layouts/admin/AdminCourse.jsx';
import AdminProduct from './Layouts/admin/AdminProduct.jsx';
import AdminExample from './Layouts/admin/AdminExample.jsx';
import AdminStudent from './Layouts/admin/AdminStudent.jsx';
import AdminFinance from './Layouts/admin/AdminFinance.jsx';
import AdminAddNewCourses from './Layouts/admin/AdminAddNewCourses.jsx';
import AdminAddNewProduct from './Layouts/admin/AdminAddNewProduct.jsx';
import AdminBlog from './Layouts/admin/AdminBlog.jsx';
import AdminTeacher from './Layouts/admin/AdminTeacher.jsx';
import AdminAddNewStudent from './Layouts/admin/AdminAddNewStudent.jsx';
import AdminAddNewExample from './Layouts/admin/AdminAddNewExample.jsx';
import AdminAddNewTeacher from './Layouts/admin/AdmnAddNewTeacher.jsx';
import AdminEditCourses from './Layouts/admin/AdminEditCourses.jsx';
import AdminEditProduct from './Layouts/admin/AdminEditProduct.jsx';
import AdminEditStudent from './Layouts/admin/AdminEditStudent.jsx';

function App() {
  return (

    <Routes>
      <Route path="/" element={<MainLayout />}>
       <Route index element={<Navigate to="/home" replace />} />
  <Route path="home" element={<HomePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="Practice" element={<PracticePage />} />
        <Route path="/course" element={<Course />} />
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
      <Route path="/store" element={<Product />} />
      <Route path="/course" element={<Course />} />
      <Route path="/MissingPassword" element={<StepEmail />} />
      <Route path="/MissingPasswordStepCode" element={<StepCode />} />
      <Route path="/reset-password" element={<StepReset />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/adminCourse" element={<AdminCourse />} />
      <Route path="/adminStore" element={<AdminProduct />} />
      <Route path="/adminExample" element={<AdminExample />} />
      <Route path="/adminStudent" element={<AdminStudent />} />
      <Route path="/adminFinance" element={<AdminFinance />} />
      <Route path="/addnewCourse" element={<AdminAddNewCourses />} />
      <Route path="/addnewProduct" element={<AdminAddNewProduct />} />
      <Route path="/adminBlog" element={<AdminBlog />} />
      <Route path="/adminTeacher" element={<AdminTeacher />} />
      <Route path="/adminAddNewStudent" element={<AdminAddNewStudent />} />
      <Route path="/adminAddNewTeacher" element={<AdminAddNewTeacher />} />
      <Route
        path="/admin/courses/edit/:id"
        element={<AdminEditCourses />}
      />
      <Route
        path="/admin/products/edit/:id"
        element={<AdminEditProduct />}
      />
    <Route
  path="/adminEditStudent/:id"
  element={<AdminEditStudent />}
/>

<Route
  path="/adminAddNewStudent"
  element={<AdminAddNewStudent />}
/>
      <Route path="/adminNewExample" element={<AdminAddNewExample />} />

    </Routes>

  )
};

export default App;