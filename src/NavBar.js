import {Link,useNavigate} from "react-router-dom";

function NavBar(){

    const nav = useNavigate();

    const username = localStorage.getItem("username");

    const logout = (event) =>{
        event.preventDefault();
        localStorage.clear();
        nav("/adminlogin");
    }

    return(
        <>
            <header>
                <Link to="/">Home</Link>
                { (username == null)    &&  (<Link to="/adminlogin">Admin Login</Link>)}
                { (username != null)    &&  (<Link to="/adminpanel">Admin Panel</Link>)}
                { (username != null)    &&  (<a href="#" onClick={logout}>Logout</a>)}
            </header>
        </>
    )
}

export default NavBar;