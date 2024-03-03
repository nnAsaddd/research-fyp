import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";

const CollectionsForm = () => {
  const { search, handleSearch } = useGlobalContext();
  return (
    <form className="wrapper search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search-input"
        type="text"
        name="search"
        id="search"
        placeholder="Search Collections..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button className="btn" onClick={() => handleSearch("")}>
        Clear
      </button>
    </form>
  );
};
export default CollectionsForm;
