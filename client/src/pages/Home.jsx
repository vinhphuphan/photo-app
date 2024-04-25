import React from 'react'
import Header from '../components/Header'
import RegisterModal from '../components/modal/RegisterModal'
import LoginModal from '../components/modal/LoginModal'
import ToasterProvider from "../providers/ToasterProvider.jsx"
import PhotoLayout from '../components/PhotoLayout.jsx'

const Home = () => {
  
  return (
    <div>
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <Header/>
      <PhotoLayout />
    </div>
  )
}

export default Home
