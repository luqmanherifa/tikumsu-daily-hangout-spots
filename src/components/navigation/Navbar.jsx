import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAuthUser } from "../../lib/useAuthUser";

export default function Navbar() {
  const { user, role, loading } = useAuthUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between">
      <Link to="/" className="font-bold">
        Daily Hangout Spots
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/">Home</Link>

        {!loading && user && <Link to="/dashboard">Dashboard</Link>}

        {!loading && role === "admin" && <Link to="/admin">Admin</Link>}

        {!loading && !user && <Link to="/login">Login</Link>}

        {!loading && user && (
          <button onClick={handleLogout} className="border px-3 py-1 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
