import React, { useContext, useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import "./poem.css";
import { addNewData, editData, editLikes } from "../mongo";
import { Context } from "../Context";


const PoemPage = () => {
    const location = useLocation();
    const poem = location.state;
    const [likes, setLikes] = useState(0);
    const [clicked, setClicked] = useState(getLikes());
    const navigate = useNavigate();
    const { token } = useContext(Context);

    function getLikes(){
        if (localStorage.getItem("liked")){
            let dict = JSON.parse(localStorage.getItem("liked"));
            console.log(dict[poem.id]);
            return dict[poem.poem+""+poem.id];
        }
        return false;
    }

    function storeLike(){
        let dict = JSON.parse(localStorage.getItem("liked")) || {};
        dict[poem.poem+""+poem.id] = !clicked;
        localStorage.setItem("liked", JSON.stringify(dict));
    }

    useEffect(() => {
        setLikes(poem.likes);
    }, [])

    const handleClick = () => {
        storeLike();
        console.log("here");
        setClicked(!clicked);
        let request;
        if(poem.poem){
            request = "poem";
        }else{
            request = "writing";
        }
        let temp = likes;
        if(clicked){
            temp = temp - 1;
            editLikes(request, poem.id, -1);
        }else{
            temp = temp + 1;
            editLikes(request, poem.id, 1);
        }
        setLikes(temp);
    }

    const updatePoem = () => {
        delete poem._id
        delete poem.confirm;
        let request;
        if(poem.poem){
            request = "poem";
        }else{
            request = "writing";
        }
        delete poem.poem;
        if(poem.new){
            delete poem.new
            addNewData(poem, request)
            .then((res) => {if(res.ok){navigate("/site/")}});
        }else{
            editData(poem, request, poem.id)
            .then((res) => {if(res.ok){navigate("/site/")}});
        }
    }

    const navigateBack = () => {
        if(poem.new){
            poem.id = "";
        }
        navigate("/site/add", {state:poem})
    }

    return(
        <>
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
            <div className="image-container">
                {poem.img.map((item, index) => (
                        <img key={index} src={item} alt=""/>
                ))}
            </div>
        </div>
        </>
    );

}

export default PoemPage;