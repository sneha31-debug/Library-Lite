import "./login.css";

export default function Login() {
  return (
    <main className="login-container">
      <h1>Login</h1>
      <p>Access your Library Lite account and continue exploring books.</p>

      <form className="login-form">
        <input type="email" placeholder="College Email ID" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>

      <p className="signup-redirect">
        Don’t have an account? <a href="/signup">Sign up here</a>.
      </p>
    </main>
  );
}
