 function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <a href="#home" className="logo">
          Portfolio<span>.</span>
        </a>

        <nav className="navigation-links">
          <a href="#home">Home</a>
          <a href="#skills">Skllkills</a>
          <a href="#projects">Prrrgojects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;