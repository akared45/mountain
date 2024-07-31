import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/header_footer/Header/Header';
import Home from '../components/home/Home';
import Notfound from '../components/404/notfound';
import About from '../components/aboutus/About';
import Admin from '../components/admin/Dashboard/Admin';
import Contact from '../components/contact/Contact';
import Group from '../components/group/Group';
import Mountain from '../components/mountain/Mountain';
import Blog from '../components/Blog/Blog';
import TableUser from '../components/admin/User/TableUser';
import TableGroup from '../components/admin/Group/TableGroup';
import TableMountain from '../components/admin/Mountain/TableMountain';
import HomeAdmin from '../components/admin/Dashboard/HomeAdmin';
import LoginForm from '../components/User/Login';
import RegisterForm from '../components/User/Register';
import Profile from '../components/User/Profile';
import Footer from '../components/header_footer/Footer/Footer';
const RouterApp = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mountains" element={< Mountain />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="user" element={<TableUser />} />
            <Route path="mountain" element={<TableMountain />} />
            <Route path="group" element={<TableGroup />} />
            <Route path="homeadmin" element={<HomeAdmin />} />
          </Route>
          <Route path="/blog" element={<Blog />} />
          <Route path="/group" element={<Group />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );

}
export default RouterApp;