import React, { useContext } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

const Landing = () => {
    const navigate = useNavigate(); 
    const {PoemData, WritingData} = useContext(Context);   

    const handleClick = (id, type) => {
        let h;
        if(type==="poem"){
            h = PoemData.filter((obj) => (obj.id === id))[0];
            h["poem"] = true;
        } else{
            h = WritingData.filter((obj) => (obj.id === id))[0];
            h["poem"] = false;
        }
        if(localStorage.getItem("login")){
            let pass = localStorage.getItem("login");
            if(pass === "a"){
                return navigate('/site/add', {state:h});
            }
        }
        navigate('/site/poem', {state:h});
    }

    return(
        <div className="hero">
            <div>
                <h1 className="animated-name">शुभ्रा की सरल बातें</h1>
            </div>
            <div className="main">
                <h2>मेरी कविताएँ</h2>
                <div className="box-container">
                    {PoemData.map((item) => (
                        <div className="box" key={item.id} onClick={() => handleClick(item.id, "poem")}>
                        {/* <img src={item.img} width="300px" alt="" /> */}
                        <h3>{item.title}</h3>
                        <p>{item.text[0]}</p>
                        <p>{item.text[1]}</p>
                        <p>{item.text[2] + " ...."}</p>
                        {/* <button className="btn" onClick={() => handleClick(item.cost)}>Book Now</button> */}
                        </div>
                    ))}
                </div> 
                <h2>मेरा लेख</h2>
                <div className="box-container">
                    {WritingData.map((item) => (
                        <div className="box" key={item.id} onClick={() => handleClick(item.id, "writing")}>
                        {/* <img src={item.img} width="300px" alt="" /> */}
                        <h3>{item.title}</h3>
                        <p>{item.text[0]}</p>
                        <p>{item.text[1]}</p>
                        <p>{item.text[2] + " ...."}</p>
                        {/* <button className="btn" onClick={() => handleClick(item.cost)}>Book Now</button> */}
                        </div>
                    ))}
                </div> 
            </div>
        </div>
    );

}

export default Landing;