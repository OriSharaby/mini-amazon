import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Navbar() {
  const [user, setUser] = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/home" style={{ marginRight: "10px" }}>
        Home Page🏠
      </Link>

      {user ? (
        <>
            <span>Hello {user.name}</span>

            {user?.isAdmin && (
                <Link to="/admin/add-product" style={{ marginLeft: "10px" }}>
                    ➕ Add Product
                </Link>
            )}

          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Log Out
          </button>
        </>
      ) : (
        <Link to="/login">Log in</Link>
      )}
    </nav>
  );
}
