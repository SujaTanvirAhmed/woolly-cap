import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/home/Home';
import AllProducts from './pages/all-products/AllProducts';
import SignUp from './pages/login/SignUp';
import SignIn from './pages/login/SignIn';
import Footer from './components/shared/footer/Footer';
import MakeAdmin from './pages/dashboard/admin-components/MakeAdmin';
import ManageOrders from './pages/dashboard/admin-components/ManageOrders';
import ManageProducts from './pages/dashboard/admin-components/ManageProducts.js';
import AddProduct from './pages/dashboard/admin-components/AddProduct';
import Navigation from './components/shared/navigation/Navigation';
import Pay from './pages/dashboard/user-components/Pay';
import MyOrders from './pages/dashboard/user-components/MyOrders';
import Review from './pages/dashboard/user-components/Review';
import PurchaseProduct from './pages/PurchaseProduct';
// import useLocal from './hooks/useLocal';
import DashboardKicker from './pages/dashboard/DashboardKicker';
import './App.css';

export default function App() {

  // const { isLoggedIn, isAdmin } = useLocal();

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/purchase-product" element={<PurchaseProduct />} />
          <Route path="/all-products" element={<AllProducts />} />

          <Route path="/login" element={<Navigate to="/login/sign-in" />} />
          <Route path="/login/sign-in" element={<SignIn />} />
          <Route path="/login/sign-up" element={<SignUp />} />

          <Route path="/dashboard" element={<DashboardKicker />} />

          <Route path="/dashboard/admin"
            element={<Navigate to="/dashboard/admin/manage-orders" />} />
          <Route path="/dashboard/admin/manage-orders" element={<ManageOrders />} />
          <Route path="/dashboard/admin/add-product" element={<AddProduct />} />
          <Route path="/dashboard/admin/manage-products" element={<ManageProducts />} />
          <Route path="/dashboard/admin/make-admin" element={<MakeAdmin />} />

          <Route path="/dashboard/user"
            element={<Navigate to="/dashboard/user/my-orders" />} />
          <Route path="/dashboard/user/my-orders" element={<MyOrders />} />
          <Route path="/dashboard/user/pay" element={<Pay />} />
          <Route path="/dashboard/user/review" element={<Review />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
