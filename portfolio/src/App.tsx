import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;