import React from "react";
import Header from "../components/Header/Header";
import RegisterModal from "../components/Modal/RegisterModal";
import LoginModal from "../components/Modal/LoginModal";
import ToasterProvider from "../providers/ToasterProvider.jsx";
import SearchResults from "../components/PhotoSection/SearchResults.jsx";

const Search = () => {
  return (
    <div>
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <Header />
      <SearchResults />
    </div>
  );
};

export default Search;
