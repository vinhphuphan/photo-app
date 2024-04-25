import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Home from "./pages/Home"
import PhotoDetails from "./pages/PhotoDetails.jsx"
import Create from "./pages/Create.jsx"
import { useState } from "react"
import UserContext from "./contexts/UserContext.js"
import PhotoContext from "./contexts/PhotoContext.js"

export default function App() {
  const [user, setUser] = useState(null);
  const [ photos, setPhotos ] = useState(null);

  return (
    <PhotoContext.Provider value={[photos, setPhotos]}>
    <UserContext.Provider value={[user , setUser ]}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photo" element={<PhotoDetails />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    </PhotoContext.Provider>
  )
}
