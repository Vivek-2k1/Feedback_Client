import {useState, useRef} from "react";
import axios from "axios";

function Feedback(){

    const rName = useRef();
    const rPhone = useRef();
    const rEmail = useRef();
    const rFeedback = useRef();

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [feedback,setFeedback] = useState("");
    const [rating,setRating] = useState("5");

    const hname = (event) => {setName(event.target.value)};
    const hemail = (event) => {setEmail(event.target.value)};
    const hphone = (event) => {setPhone(event.target.value)};
    const hfeedback = (event) => {setFeedback(event.target.value)};
    const hrating = (event) => {setRating(event.target.value)};

    const save = (event) => {
        event.preventDefault();
        const emailPattern = /^[a-zA-Z]{2,}[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if((name === "") || (!name.match(/^[A-z ]+$/)) || (name.trim() === "") || (name.length < 2) || (name.length > 20)){
            alert("Invalid Name !");
            setName("");
            rName.current.focus();
        }
        else if((phone.length < 10) || (phone.trim() === "") || (phone.length > 10) || (phone < 1)){
            alert("Invalid Phone Number !");
            setPhone("");
            rPhone.current.focus();
        }
        else if((email === "") || (email.trim() === "") || (email.length < 2) || (!emailPattern.test(email))){
            alert("Invalid Email !");
            setEmail("");
            rEmail.current.focus();
        }
        else if((feedback === "") || (!feedback.match(/^[A-z0-9. ]+$/)) || (feedback.trim() === "") || (feedback.length < 2)){
            alert("Invalid Feedback !");
            setFeedback("");
            rFeedback.current.focus();
        }
        else{
            let data = {name, phone, email, feedback, rating};
            let url = "http://localhost:9000/save";
            axios.post(url,data)
            .then( response => {
                if(response.data.affectedRows === 1){
                    alert("Thank you for your Feedback.");
                    setName("");
                    setPhone("");
                    setEmail("");
                    setFeedback("");
                    rName.current.focus();
                }
                else{
                    alert(response.data.code);
                }
            })
            .catch( error => alert("Issue : " + error));
        }
    }

    return(
        <>
            <div className="container">
                <p className="head">Feedback Form</p>
                <form onSubmit={save}>
                    <div className="subContainer">
                        <div className="leftSub">
                            <p>Name</p>
                            <input type="text" onChange={ hname } ref={ rName } value={ name }/>
                            <p>Phone Number</p>
                            <input type="number" onChange={hphone} ref={ rPhone } value={ phone }/>
                        </div>
                        <div className="rightSub">
                            <p>E-Mail</p>
                            <input type="email" onChange={hemail} ref={ rEmail } value={ email }/>
                            <p>Feedback</p>
                            <textarea onChange={hfeedback} ref={rFeedback} value={ feedback }/>
                        </div>
                    </div>
                    <div className="radioGroup">
                        <p>Please rate us according to your experience.</p>
                        <input type="radio" name="rate" value="5" defaultChecked={ true } onChange={hrating}/>5
                        <input type="radio" name="rate" value="4" onChange={hrating}/>4
                        <input type="radio" name="rate" value="3" onChange={hrating}/>3
                        <input type="radio" name="rate" value="2" onChange={hrating}/>2
                        <input type="radio" name="rate" value="1" onChange={hrating}/>1
                    </div>
                    <input type="submit" value="Confirm Submission"/>
                </form>
            </div>
        </>
    );
}

export default Feedback;