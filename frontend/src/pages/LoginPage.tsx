import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.scss';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const loggedUser = await login(email, password);
      navigate(`/${loggedUser.role}`);
    } catch (err) {
      setError('Invalid login');
    }
  }

  return (
    <main className="login-page">
      <form onSubmit={submit} className="login-card">
        <h1>Attendance Login</h1>
        <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error && <p className="error">{error}</p>}
        <button>Login</button>
      </form>
    </main>
  );
}
