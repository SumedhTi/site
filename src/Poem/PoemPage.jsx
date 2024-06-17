import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./poem.css";
import { Poem_API, Writing_API } from "../api";

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
        fetch(`${Poem_API}/${poem.id}`, {
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
        let request;
        if(poem.poem){
            request = Poem_API;
        }else{
            request = Writing_API;
        }
        delete poem.poem;
        if(poem.new){
            delete poem.new
            fetch(`${request}`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(poem)
            })
            .then((res) => {if(res.ok){navigate("/site/")}});
        }else{
            fetch(`${request}/${poem.id}`, {
                method: 'PATCH',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(poem)
            })
            .then((res) => {if(res.ok){navigate("/site/")}});
        }
    }

    const navigateBack = () => {
        if(data.new){
            data.id = "";
        }
        navigate("/site/add", {state:data})
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
                    <button className="button" onClick={() => navigateBack()}>Back</button>
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