function Loader({ children }) {
  return (
    <div className="loader">
      <div className="dots-3"></div>
      <p>{children}</p>
    </div>
  );
}

export default Loader;
