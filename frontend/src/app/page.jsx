import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Library Lite 📚</h1>
        <p>Discover and download books from science to fiction.</p>
        <div className="buttons">
          <a href="/login" className="btn">Login</a>
          <a href="/signup" className="btn btn-outline">Sign Up</a>
        </div>
      </section>
    </div>
  );
}
