import ActionButton from "./ActionButton";

function Hero()
{
    return(
        <section className="hero" id="home">
            <div className="container hero-content">
                <div className="hero-text">
                    <p className="small-heading"> Hello,my name is </p>
                    <h1>
                        Melat <span>.</span>
                    </h1>
                    <h2> computer science student and web Developers</h2>
                    <p className="hero-description">
                        i create simple, responsive and user-friendl website using modern web technologies 
                    </p>
                    /* <ActionButton/> 

                </div>
                <div className="profile-box">
                    <div className="profile-circle">YN</div>
                    <h3> Melat</h3>
                    <p> Web Developer</p>
                </div>
            </div>
        </section>
    )
};
export default Hero;