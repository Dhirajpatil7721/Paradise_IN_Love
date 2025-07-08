import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();
  
  // List of paths where Navbar and Footer should be hidden
  const hiddenPaths = [
    '/add-product',
    '/customers',
    '/dashboard',
    '/filterPage',
    '/header',
    '/helpCenter',
    '/logout',
    '/orders',
    '/signin',
    '/signup',
    '/forgot-password',
    '/category-management'
  ];

  // Check if current path should hide Navbar/Footer
  const shouldHide = hiddenPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!shouldHide && <Navbar />}
      <Outlet />
      {!shouldHide && <Footer />}
    </>
  );
};

export default MainLayout;