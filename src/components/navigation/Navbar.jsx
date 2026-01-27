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
    <nav className="bg-deepolive">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between max-sm:px-5 max-sm:py-5">
        <Link
          to="/"
          className="font-heading font-black text-3xl text-carameltan max-sm:text-2xl"
        >
          HANGOUT
        </Link>

        <div className="flex items-center gap-10 font-body text-base max-sm:gap-6 max-sm:text-sm">
          {!loading && user && (
            <Link
              to="/dashboard"
              className="text-warmcream hover:text-carameltan"
            >
              Dashboard
            </Link>
          )}

          {!loading && role === "admin" && (
            <Link to="/admin" className="text-warmcream hover:text-carameltan">
              Admin
            </Link>
          )}

          {!loading && !user ? (
            <Link
              to="/login"
              className="bg-rusticbrown text-warmcream font-medium px-6 py-2.5 rounded max-sm:px-5 max-sm:py-2"
            >
              Masuk
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-warmcream hover:text-carameltan"
            >
              Keluar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
