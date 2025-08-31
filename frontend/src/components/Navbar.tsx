import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Navbar(){
    const [user, setUser] = useUser();

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <nav style={{padding: "10px", background: "#eee"}}> 
            <Link to="/" style={{marginRight: "10px" }}>Home Page🏠 </Link>

            { user ? (
                <>
                    <span> Hello {user.name} The King</span>
                    <button onClick={handleLogout} style={{marginLeft: "10px"}}>Log Out</button>
                </>   
            ) : (
                <Link to="/login"> Log in</Link>
            )}
        </nav>
    );
}