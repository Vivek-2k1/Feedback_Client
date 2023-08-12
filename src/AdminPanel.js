import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPanel(){
    
    const[info, setInfo] = useState([]);
    const[username, setUsername] = useState("");

    const nav = useNavigate();

    useEffect( () => {
        let username = localStorage.getItem("username");
        if(username == null){
            nav("/adminlogin");
        }
        else{
            setUsername(username);
        }
    } )

    useEffect(() => {
        let url = "http://localhost:9000/read";
        axios.get(url)
        .then(response =>{
            setInfo(response.data);
        })
        .catch(error => console.log(error));
    }, []);

    const delfb = (id) => {
        let url = "http://localhost:9000/delete";
        let d = {data : {id}}
        axios.delete(url,d)
        .then(response =>{
            alert("record deleted");
            window.location.reload();
        })
        .catch(error => alert("Issue : " + error));
    }

    return(
        <>
            <div className="panelContainer">
                <div className="adminInfo">
                    <p className="title">Admin Panel</p>
                    <p className="user">User : {username}</p>   
                </div>
                <div className="feedbackContainer">
                    {
                        info.length === 0 ? (<p className="empty">No Feedback yet.</p>) : 
                        (info.map( (e) =>(
                            <div className="feedback">
                                <div className="content">
                                    <div className="leftFeed">
                                        <p><label>Username : </label> { e.name }</p>
                                        <p><label>Phone Number : </label> { e.phone_num }</p>
                                    </div>
                                    <div className="rightFeed">
                                        <p><label>E-Mail : </label> { e.email }</p>
                                        <p><label>Rating : </label> { e.rating } Stars</p>
                                    </div>
                                </div>
                                <p><label>Feedback : </label> { e.feedback }</p>
                                <div className="buttonContainer">
                                    <button onClick={ () => { if(window.confirm('Are you sure?'))delfb(e.id); } }>Delete</button>
                                </div>
                            </div>
                        )))
                    }
                </div>
            </div>
        </>
    )
}

export default AdminPanel;