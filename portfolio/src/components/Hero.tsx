import ActionButton from "./ActionButton";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        <div className="hero-text">
          <p className="small-heading">Hello, my name is</p>
          <h1>
            Melat<span>.</span>
          </h1>
          <h2>Computer science student and web developer</h2>
          <p className="hero-description">
            I create simple, responsive, and user-friendly websites using modern
            web technologies.
          </p>
          <ActionButton />
        </div>

        <div className="profile-box">
          <div className="profile-circle">M</div>
          <h3>Melat</h3>
          <p>Web Developer</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
