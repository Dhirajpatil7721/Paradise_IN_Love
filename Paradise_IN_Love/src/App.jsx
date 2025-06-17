import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Pages
import Home from './Pages/Home';
import Saree from './Pages/Saree';
import Kurti from './Pages/Kurti';
import Leggings from './Pages/Leggings';
import DressMaterial from './Pages/DressMaterial';
import Gown from './Pages/Gown';
import  Anarkali   from './Pages/Anarkali';
import Causal from './Pages/Causal';
import Search from './Pages/Search';
import Account from './Pages/Account';
import Cart from './Pages/Cart';
import Buynow from './Pages/Buynow';
import Wishlist from './Pages/Wishlist';
import PlaceOrder from './Pages/PlaceOrder';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import RefundPolicy from './Pages/RefundPolicy';
import ReturnPolicy from './Pages/ReturnPolicy';
import Disclaimer from './Pages/Disclaimer';
import TermsConditions from './Pages/TermsConditions';

// Auth
import SignIn from './SignInOut/SignIn';
import SignUp from './SignInOut/SignUp';
import Forgot from './SignInOut/Forgot';
import ShopNow from './Pages/ShopNow';
import AddProduct from './Admin/AddProduct';
import Customers from './Admin/Customers';
import Dashboard from './Admin/Dashboard';
import Header from './Admin/Header';
import HelpCenter from './Admin/HelpCenter';
import Logout from './Admin/Logout';
import SidebarLayout from './Admin/SidebarLayout';
import Orders from './Admin/Orders';
import FilterPage from './Admin/FilterPage';
import AdminProductAddPage from './Admin/AddProduct';
import UserOrders from './Pages/UserOrders';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saree" element={<Saree />} />
        <Route path="/kurti" element={<Kurti />} />
        <Route path="/leggings" element={<Leggings />} />
        <Route path="/dress-material" element={<DressMaterial />} />
        <Route path="/gown" element={<Gown />} />
        <Route path="/Anarkali" element={<Anarkali />} />
        <Route path="/causal-suit" element={<Causal />} />
        <Route path="/account" element={<Account />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/shopnow" element={<ShopNow />} />
        <Route path="/userorders" element={<UserOrders/>} />

        {/* <Route path="/buynow/:id" element={<BuyNow />} /> */}

        {/* //Admin */}
        <Route path="/add-product" element={<AdminProductAddPage/>} />
        <Route path="/customers" element={<Customers/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/filterPage" element={<FilterPage/>} />
        <Route path="/header" element={<Header/>} />
        <Route path="/helpCenter" element={<HelpCenter/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/orders" element={<Orders/>} />
        {/* <Route path="/sidebarLayout" element={<SidebarLayout/>} /> */}
        



        {/* Auth Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<Forgot />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
