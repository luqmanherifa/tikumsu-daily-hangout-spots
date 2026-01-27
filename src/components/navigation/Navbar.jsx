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
    <nav className="bg-deepolive border-b-2 border-softolive/30">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between max-sm:px-5 max-sm:py-4">
        <Link
          to="/"
          className="font-heading font-black text-2xl text-carameltan tracking-tight hover:text-warmcream transition-colors max-sm:text-xl"
        >
          HANGOUT
        </Link>

        <div className="flex items-center gap-8 max-sm:gap-5">
          {!loading && user && (
            <Link
              to="/dashboard"
              className="font-body text-sm font-medium text-warmcream hover:text-carameltan transition-colors tracking-wide max-sm:text-xs"
            >
              Dashboard
            </Link>
          )}

          {!loading && role === "admin" && (
            <Link
              to="/admin"
              className="font-body text-sm font-medium text-warmcream hover:text-carameltan transition-colors tracking-wide max-sm:text-xs"
            >
              Admin
            </Link>
          )}

          {!loading && !user ? (
            <Link
              to="/login"
              className="bg-rusticbrown text-warmcream font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-carameltan transition-colors tracking-wide max-sm:px-4 max-sm:py-2 max-sm:text-xs"
            >
              Masuk
            </Link>
          ) : (
            !loading && (
              <button
                onClick={handleLogout}
                className="font-body text-sm font-medium text-warmcream hover:text-carameltan transition-colors tracking-wide max-sm:text-xs"
              >
                Keluar
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
