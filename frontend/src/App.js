import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from "./Routes/PrivateRoutes";
import Header from "./header/Header";
import Admin from './Admin/Admin';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Admin/Dashboard';
import Sellerlist from './Admin/Sellerlist';
import Action from './Admin/Action';
import Sellers from './Admin/Sellers';
function App() {
  const type = localStorage.getItem('type')

  const gotopage = () => {
    <Routes>
      <Route path='*' element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path='sellerlist' element={<Sellerlist />} />
        <Route path='action' element={<Action />} />
        <Route path='block' element={<Sellers />} />
      </Route>
    </Routes>
  }

  return (
    <div className="App">
      
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />{type === "admin" ? <Routes>
          <Route path='*' element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path='sellerlist' element={<Sellerlist />} />
            <Route path='action' element={<Action />} />
            <Route path='block' element={<Sellers />} />
          </Route>
        </Routes>
          :
          <>
            <Header />
            <PrivateRoutes /></>
        }
      
    </div>
  );
}

export default App;
