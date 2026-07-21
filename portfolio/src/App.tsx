// import "./App.css";

// import BackgroundAnimation from "./components/BackgroundAnimation";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Skills from "./components/Skills";
// import Projects from "./components/Projects";
// import Contact from "./components/Contact";

// function App() {
//   return (
//     <>
//       <BackgroundAnimation />
//       <Navbar />

//       <main className="site-main">
//         <Hero />
//         <Skills />
//         <Projects />
//         <Contact />
//       </main>
//     </>
//   );
// }

// export default App;

import "./App.css";

import BackgroundAnimation from "./components/BackgroundAnimation";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="app-shell">
      <BackgroundAnimation />

      <div className="app-content">
        <Navbar />

        <main>
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;