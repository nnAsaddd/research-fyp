import React, { useState } from "react";

const ReserachPapersForm = ({ search, setSearch }) => {
  return (
    <form className="wrapper search-form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search-input"
        type="text"
        name="search"
        id="search"
        placeholder="Search Research Papers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn" onClick={() => setSearch("")}>
        Clear
      </button>
    </form>
  );
};
export default ReserachPapersForm;
