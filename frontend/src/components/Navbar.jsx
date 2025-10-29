import Link from "next/link";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          📚 Library Lite
        </Link>

        <div className="nav-links">
          <Link href="/books">Books</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="nav-auth">
          <Link href="/login" className="login-btn">Login</Link>
          <Link href="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
