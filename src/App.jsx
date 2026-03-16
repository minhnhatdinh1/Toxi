import { useState } from 'react'
import ReactLogo from './assets/react.svg'
import ViteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import MainLayout from './Layouts/common/MainLayout'
import { HomePage } from './Layouts/home/HomePage'
import { BlogPage } from './Layouts/blog/BlogPage'
import { Navigate } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import Register from './Layouts/auth/Register.jsx'

import QRPaymentPage from "./pages/payment/QRPaymentPage";
import WaitingPage from "./pages/payment/WaitingPage";
import SuccessPage from "./pages/payment/SuccessPage";
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



import AdminQuiz from "./Layouts/admin/Adminquiz";
import AdminStudent from './Layouts/admin/AdminStudent.jsx';
import AdminFinance from './Layouts/admin/AdminFinance.jsx';
import AdminAddNewCourses from './Layouts/admin/AdminAddNewCourses.jsx';
import AdminAddNewProduct from './Layouts/admin/AdminAddNewProduct.jsx';
import AdminBlog from './Layouts/admin/AdminBlog.jsx';
import AdminTeacher from './Layouts/admin/AdminTeacher.jsx';
import AdminAddNewStudent from './Layouts/admin/AdminAddNewStudent.jsx';



import AdminAddNewTeacher from './Layouts/admin/AdmnAddNewTeacher.jsx';
import AdminEditCourses from './Layouts/admin/AdminEditCourses.jsx';
import AdminEditProduct from './Layouts/admin/AdminEditProduct.jsx';
import AdminEditStudent from './Layouts/admin/AdminEditStudent.jsx';
import AdminAddNewBlog from './Layouts/admin/AdminAddNewBlog.jsx';
import AdminEditTeacher from './Layouts/admin/AdminEditTeacher.jsx';

import AdminOrders from './Layouts/admin/AdminOrders.jsx';
import AdminDetalProduct from "./Layouts/admin/AdminDetailProduct.jsx";

import Blog from './Layouts/blog/component/Blog.jsx';
import BlogDetailPage from './Layouts/blog/BlogDetailPage.jsx';
import BlogMain from './Layouts/blog/component/BlogDetailMain.jsx';
import AdminExam from './Layouts/admin/AdminExam.jsx';
import AdminAddNewExam from './Layouts/admin/AdminAddNewExam.jsx';
import NotFound from './Layouts/common/NotFound.jsx';
import OderSuccess from './Layouts/common/OderSuccess.jsx';
import IntroSection from './Layouts/introduce/InTrodusection.jsx';
import BlogIntrodution from './Layouts/introduce/BlogIntrodution.jsx';
import AddNewListenQuiz from './Layouts/admin/addnewquiz/AddNewListenQuiz.jsx';
import AddNewReadQuiz from './Layouts/admin/addnewquiz/AddNewReadQuiz.jsx';
import AddNewWritting from './Layouts/admin/addnewquiz/AddNewWritting.jsx';
{/*import AdminAddNewQuiz from './Layouts/admin/AdminAddNewQuiz.jsx';*/}
import AdminViewQuiz from './Layouts/admin/AdminViewQuiz.jsx';
import AddNewFillOfWord from './Layouts/admin/addnewquiz/AddNewFillOfWord.jsx';
import EditListen from './Layouts/admin/addnewquiz/EditListen.jsx';
import EditRead from './Layouts/admin/addnewquiz/EditRead.jsx';
import EditWritting from './Layouts/admin/addnewquiz/EditWritting.jsx';
import AddNewlistenPicture from './Layouts/admin/addnewquiz/AddNewlistenPicture.jsx';
import EditListenPicture from './Layouts/admin/addnewquiz/EditListenPicture.jsx';
function App() {
  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />

        <Route path="/blog" element={<Blog />} />
        
        <Route path="/blog/:id" element={<BlogDetailPage />} />
     

        <Route path="Practice" element={<PracticePage />} />
        <Route path="/course" element={<Course />} />
        <Route path="/Introduction" element={<IntroSection />} />
        <Route path="/blogintroduce" element={<BlogIntrodution />} />
      </Route>

      <Route path="/payment/qr"      element={<QRPaymentPage />} />
      <Route path="/payment/waiting" element={<WaitingPage />} />
      <Route path="/payment/success" element={<SuccessPage />} />

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

      <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
      <Route path="/adminCourse" element={<AdminRoute><AdminCourse /></AdminRoute>} />
      <Route path="/adminProduct" element={<AdminRoute><AdminProduct /></AdminRoute>} />

      <Route path="/adminQuiz" element={<AdminRoute><AdminQuiz /></AdminRoute>} />
      <Route path="/adminStudent" element={<AdminRoute><AdminStudent /></AdminRoute>} />
      <Route path="/adminFinance" element={<AdminRoute><AdminFinance /></AdminRoute>} />
      <Route path="/addnewCourse" element={<AdminRoute><AdminAddNewCourses /></AdminRoute>} />
      <Route path="/addnewProduct" element={<AdminRoute><AdminAddNewProduct /></AdminRoute>} />
      <Route path="/adminBlog" element={<AdminRoute><AdminBlog /></AdminRoute>} />
      <Route path="/adminTeacher" element={<AdminRoute><AdminTeacher /></AdminRoute>} />
      <Route path="/adminAddNewStudent" element={<AdminRoute><AdminAddNewStudent /></AdminRoute>} />
      <Route path="/adminAddNewTeacher" element={<AdminRoute><AdminAddNewTeacher /></AdminRoute>} />
      
      <Route path="/admin/courses/edit/:id" element={<AdminRoute><AdminEditCourses /></AdminRoute>} />
      <Route path="/editCourse/:id" element={<AdminRoute><AdminEditCourses /></AdminRoute>} />
      <Route path="/admin/products/edit/:id" element={<AdminRoute><AdminEditProduct /></AdminRoute>} />
      <Route path="/adminEditStudent/:id" element={<AdminRoute><AdminEditStudent /></AdminRoute>} />
        <Route path="/admin/blog/add" element={<AdminRoute><AdminAddNewBlog /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
      <Route path="/admin/editTeacher/:id" element={<AdminRoute><AdminEditTeacher /></AdminRoute>} />
      <Route path="/success" element={<SuccessPage />} />
<Route path="/waiting" element={<WaitingPage />} />
  <Route path="/adminProductDetail/:id" element={<AdminDetalProduct />} />

    <Route path="/adminExam" element={<AdminRoute><AdminExam /></AdminRoute>} />
    <Route path="/listenQuiz" element={<AdminRoute><AddNewListenQuiz /></AdminRoute>} />
      <Route path="/readQuiz" element={<AdminRoute><AddNewReadQuiz /></AdminRoute>} />
      <Route path="/writtingQuiz" element={<AdminRoute><AddNewWritting /></AdminRoute>} />
    {/* <Route path="/adminaddnewquiz" element={<AdminRoute><AdminAddNewQuiz /></AdminRoute>} /> */}
      
      <Route path ="/adminviewquiz" element={<AdminRoute><AdminViewQuiz /></AdminRoute>} />
      <Route path="/AddNewFillOfWord" element={<AdminRoute><AddNewFillOfWord /></AdminRoute>} />
      <Route path="/editlisten" element={<AdminRoute><EditListen /></AdminRoute>} />
      <Route path="/editread" element={<AdminRoute><EditRead /></AdminRoute>} />
      <Route path ="/editwritting" element={<AdminRoute><EditWritting /></AdminRoute>} />
      <Route path="/addnewlistenPicture" element={<AdminRoute><AddNewlistenPicture /></AdminRoute>} />
      <Route path="/editlistenPicture" element={<AdminRoute><EditListenPicture /></AdminRoute>} />
    </Routes>
  )
};

export default App;
