import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/header_footer/Header/Header';
import Home from '../components/home/Home';
import Notfound from '../components/404/notfound';
import About from '../components/aboutus/About';
import Admin from '../components/admin/Dashboard/Admin';
import Group from '../components/group/Group';
import Mountain from '../components/mountain/Mountain';
import Blog from '../components/Blog/Blog';
import TableUser from '../components/admin/User/TableUser';
import TableGroup from '../components/admin/Group/TableGroup';
import TableMountain from '../components/admin/Mountain/TableMountain';
import LoginForm from '../components/User/Login';
import RegisterForm from '../components/User/Register';
import Profile from '../components/User/Profile';
import Footer from '../components/header_footer/Footer/Footer';
import Dashboard from '../components/admin/Dashboard/Dashboard';
import ContactUs from '../components/contact/ContactUs';
import MountainDetails from '../components/mountain/MountainDetails';
import TableBlog from '../components/admin/Blog/TableBlog';
import BlogDetail from '../components/Blog/BlogDetail';
import TableComment from '../components/admin/User/TableComment';
import Story from '../components/story/Story';

const RouterApp = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mountains" element={< Mountain />} />
          <Route path="/mountain/:id" element={<MountainDetails />} />
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user/role" element={<TableUser />} />
            <Route path="user/comment" element={<TableComment />} />
            <Route path="mountain" element={<TableMountain />} />
            <Route path="group" element={<TableGroup />} />
            <Route path="blog" element={<TableBlog />} />
          </Route>
          <Route path="/blog" element={<Blog />} />
          <Route path="/story" element={<Story />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/group" element={<Group />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );

}
export default RouterApp;