import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Home from "./pages/Home"
import PhotoDetails from "./pages/PhotoDetails.jsx"
import Create from "./pages/Create.jsx"
import { useEffect, useState } from "react"
import UserContext from "./contexts/UserContext.js"
import PhotoContext from "./contexts/PhotoContext.js"
import Profile from "./pages/Profile.jsx"
import Search from "./pages/Search"
import { getUserInfo } from "./utils/fetchFromApi.js"
import UserPage from "./pages/UserPage.jsx"
import { ClipLoader } from "react-spinners"

export default function App() {
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserInfo('users/by-token');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (localStorage.getItem("ACCESS_TOKEN")) {
      fetchUserData();
    } else {
      setLoading(false)
    }
  }, []);

  if (loading) {
    return <div className="bg-white flex items-center justify-center w-full h-full pt-64">
      <ClipLoader color="#e60023" loading={loading} size={50} />
    </div>
  }

  return (
    <PhotoContext.Provider value={[photos, setPhotos]}>
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/photo/:id/" element={<PhotoDetails />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:user_name/" element={<UserPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </PhotoContext.Provider>
  )
}
