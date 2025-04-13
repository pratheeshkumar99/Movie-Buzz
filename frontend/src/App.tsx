import Navbar from './components/Navbar';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileEdit from './pages/Profile/Edit';
import { UserProvider } from './context/userContext';
import BloggerRoute from './components/BloggerRoute';
import Post from './pages/Home/Post';
import Rate from './pages/Rate';
import TotalReviews from './pages/Rate/TotalReviews';
import Search from './pages/Search';
import Details from './pages/Search/Details';
import FollowingList from './pages/Profile/Following';
import Followers from './pages/Profile/Followers';
import IndividualProfile from './pages/Profile/Individual';

function App() {
  axios.defaults.baseURL =
     process.env.REACT_APP_BACKEND_URL ||"http://localhost:4000/api";
    console.log(process.env.REACT_APP_BACKEND_URL);
    
  axios.defaults.withCredentials = true;

  return (
    <>
      <UserProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProtectedRoute Component={Profile}/>} />
          <Route path="/profile/edit/:id" element={<ProtectedRoute Component={ProfileEdit}/>} />
          <Route path="/profile/:pid" element={<IndividualProfile/>} />
          <Route path="/profile/following" element={<ProtectedRoute Component={FollowingList}/>} />
          <Route path="/profile/followers" element={<ProtectedRoute Component={Followers}/>} />
          <Route path="/post" element={<BloggerRoute Component={Post}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rate/:mid" element={<ProtectedRoute Component={Rate} />} />
          <Route path="/reviews/:mid" element={<TotalReviews />} />
          <Route path="/search" element={<Search/>} />
          <Route path='/details/:title' element={<Details/>}/>
         </Routes>
      </UserProvider>
    </>
  );
}

export default App;
