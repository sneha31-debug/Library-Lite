import "./signup.css";

export default function Signup() {
  return (
    <main className="signup-container">
      <h1>Sign Up</h1>
      <p>Create your Library Lite account to explore and download books.</p>

      <form className="signup-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="College Email ID" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Create Account</button>
      </form>
    </main>
  );
}
