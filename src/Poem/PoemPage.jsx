import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./poem.css";
import { API } from "../api";

const PoemPage = () => {
    const location = useLocation();
    const data = location.state;
    const [poem, setPoem] = useState({id:null,name:"Loading",text:["Loading"],img:[],date:""});
    const [likes, setLikes] = useState(0);
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
 
    useEffect(() => {
        setPoem(data);
        setLikes(data.likes);
    }, [data])

    const handleClick = () => {
        setClicked(!clicked);
        let temp = likes;
        if(clicked){
            temp = temp - 1;
        }else{
            temp = temp + 1;
        }
        setLikes(temp);
        fetch(`${API}/${poem.id}`, {
            method: 'PATCH',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...poem, likes: temp})
        });
    }

    const updatePoem = () => {
        delete poem.confirm;
        fetch(`${API}/${poem.id}`, {
            method: 'PATCH',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(poem)
        })
        .then((res) => {if(res.ok){navigate("/site/")}});
    }

    return(
        <>
        <link rel="stylesheet" href= "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" /> 
        <div className="container">
            <div className="content">
                <div>
                    <h2>{poem.title}</h2>
                    <h4 className="date">{poem.date}</h4>
                </div>
                {poem.text.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
                {poem.confirm
                ?<> 
                    <button className="button" onClick={() => navigate("/site/add", {state:data})}>Back</button>
                    <button className="button" onClick={() => updatePoem()}>Confirm</button>
                </>
                :<button onClick={() => handleClick()}> 
                    <i className={clicked?"fa-solid fa-heart red":"fa-regular fa-heart blank"} />
                    {likes} 
                </button>}
            </div>
            {poem.img.map((item, index) => (
                    <img key={index} src={item} alt=""/>
            ))}
        </div>
        </>
    );

}

export default PoemPage;