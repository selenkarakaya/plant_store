// src/components/SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search plants..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="border px-3 py-1 rounded text-sm"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
