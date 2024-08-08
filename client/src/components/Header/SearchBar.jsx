import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SearchBar = ({ showSearch, setShowSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    } else {
      toast.error("Please enter a search query.");
    }
  };

  return (
    <div
      className={`relative ${
        showSearch ? "block  flex-grow" : "hidden sm:block flex-grow"
      }`}
    >
      <div className="relative">
        <form onSubmit={handleSearch} className="w-ful mx-auto">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoIosSearch size={22} className="text-neutral-700" />
          </div>
          <input
            type="search"
            id="default-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full p-3 ps-10 rounded-full bg-neutral-100 hover:bg-neutral-200 transition text-gray-700 placeholder-neutral-700 text-sm md:text-base "
            placeholder="Search for easy dinner, fashion, etc"
            required
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
