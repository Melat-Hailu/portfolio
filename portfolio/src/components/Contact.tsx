function Contact() {
  const email = "yourname@example.com";

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-content">
        <div>
          <p className="contact-small-heading">Contact me</p>

          <h2>Let&apos;s work together.</h2>

          <p className="contact-description">
            Contact me for internships, employment opportunities or software
            development discussions.
          </p>
        </div>

        <div className="contact-information">
          <a href={`mailto:${email}`} className="email-link">
            {email}
          </a>

          <a href={`mailto:${email}`} className="email-button">
            Send Email
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;