import './App.css';
import Nav from './components/nav';
import PrivateTemplate from './components/privateTemplate';
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./stateSlice/loginSlice";
import axios from 'axios'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './pages/loginForm';
import RegisterForm from './pages/registerForm'
import Loading from './components/loading';
import Footer from './components/footer';
import { useLocation } from 'react-router-dom'
import ItemShow from "./pages/item-show"
import ItemAdd from "./pages/itemAdd"
import ItemEdit from './pages/itemEdit';
// import ChatShow from "./pages/chatShow"
import LelangNow from "./pages/lelangNow"
import LelangAdd from "./pages/lelangAdd"
import TransaksiPage from "./pages/transaksi-page"
import LelangHistory from "./pages/lelangHistory"
import NotFoundPage from "./pages/notFoundPage"
import Beranda from "./pages/beranda"
import ChatPage from './pages/chat-page';
axios.defaults.withCredentials = true

function App() {
  // const checkLogin = async () => {
  //   const res = await axios.get('http://localhost:4001/user/getUser', {
  //     withCredentials: true
  //   }).then((response) => {
  //     console.log(response.data)
  //     dispatch(login, res.user)
  //     // return response.data
  //   })
  //   .catch((err) => {
  //     console.log(err.response.data);
  //     dispatch(logout)
  //     // return err.response.data
  //   })
  // if (res.user) {
  //   dispatch({type: login, payload: res.user})
  // } else {
  //   dispatch({type: logout})
  // }
  // }
  const location = useLocation()

  return (
    <div className="w-full bg-gray-200 min-h-screen" style={{ paddingTop: "3.25rem" }}>
      <Nav />
      <Loading />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/buatToko" element={<RegisterForm />} />
        <Route element={<PrivateTemplate />} >
          <Route
            path="/home"
            element={<Beranda />}
          ></Route>
          <Route path='/item'>
            <Route
              path="list"
              element={<ItemShow />}
            >
            </Route>
            <Route
              path="tambah"
              element={<ItemAdd />}
            >
            </Route>
            <Route
              path="edit"
              element={<ItemEdit />}
            ></Route>
          </Route>
          <Route
            path="/chat"
            element={<ChatPage />}
          >
          </Route>
          <Route path="/lelang">
            <Route
              path="list"
              element={<LelangNow />}
            >
            </Route>
            <Route
              path="tambah"
              element={<LelangAdd />}
            >
            </Route>
            <Route
              path="riwayat"
              element={<LelangHistory />}
            >
            </Route>
          </Route>
          <Route
              path="/transaksi"
              element={<TransaksiPage />}
            >
            </Route>
          <Route
            path="*"
            element={<Navigate to="/home" />}
          ></Route>
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
