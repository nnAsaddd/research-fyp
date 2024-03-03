const globalReducer = (state, action) => {
  if (action.type === "SET_SEARCH") {
    return { ...state, search: action.payload };
  }

  if (action.type === "SHOW_MODAL_True") {
    return { ...state, showModal: true };
  }

  if (action.type === "SHOW_MODAL_False") {
    return { ...state, showModal: false };
  }

  return { ...state };
};

export default globalReducer;
