import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function AdminLogin(){

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const rUsername = useRef();
    const rPassword = useRef();

    const hUsername = (event) => {setUsername(event.target.value)};
    const hPassword = (event) => {setPassword(event.target.value)};

    const login = (event) =>{
        event.preventDefault();
        if( username === "" || username.trim() === "" ){
            alert("Username cannot be left empty !");
            rUsername.current.focus();
        }
        else if( password === "" || password.trim() === "" ){
            alert("Password cannot be left empty !");
            rPassword.current.focus();
        }
        else{
            let data = {username, password};
            let url = "http://localhost:9000/login";
            axios.post(url,data)
            .then( response => {
                if(response.data.success){
                    navigate("/adminpanel");
                    localStorage.setItem("username",username);
                }
                else{
                    alert(response.message);
                }
            } )
            .catch(error => {
                if(error.response && error.response.status === 401){
                    alert("Invalid Credentials !");
                    setUsername("");
                    setPassword("");
                    rUsername.current.focus();
                }
                else{
                    alert("Issue : " + error);
                }
            });
        }
    }

    return(
        <>
            <div className="adminContainer">
                <p>Admin Login</p>
                <form onSubmit={login}>
                    <input type="text" placeholder="Enter username." value={username} onChange={ hUsername } ref={rUsername} />
                    <input type="password" placeholder="Enter password." value={password} onChange={ hPassword } ref={rPassword} />
                    <input type="submit" value="Login"/>
                </form>
            </div>
        </>
    )
}

export default AdminLogin;