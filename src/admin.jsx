import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Admin = () => {
    // const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [wrong, setWrong] = useState(false);
    const [loggedin, setloggedin] = useState(false);

    const tamplate = {
        id: "",
        title: "",
        text: [],
        date: "",
        img: [],
        likes: 0
    }

    useEffect(() => {
        if(localStorage.getItem("login")){
            let pass = localStorage.getItem("login");
            if(pass == "a"){
                setloggedin(true);
            }
        }
    }, [])

    function handleSubmit(){
        if(password == "a"){
            localStorage.setItem("login", password);
            navigate("/site/");
        }else{
            setWrong(true);
        }
    }

    return(
        <div>
            {loggedin
            ?<div>
                <button className="button" onClick={() => {localStorage.removeItem("login"); navigate("/site/");}}>Log out</button> 
                <button className="button" onClick={() => navigate("/site/add", {state:tamplate})} >ADD NEW POEM</button>
            </div>
            :<div>
                <h2>Login</h2>
                {/* <p>Username : <input onChange={(e) => setUsername(e.target.value)}/></p> */}
                <p>Password : <input onChange={(e) => {setPassword(e.target.value); setWrong(false);}}/></p>
                <button className="button" onClick={handleSubmit}>Submit</button>
                {wrong?<div>Wrong</div>:<></>}
            </div>
            }
        </div>
    );

}

export default Admin;