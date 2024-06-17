import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context";


const Edit = () => {
    const [value, setValue] = useState("");
    const [headding, setHeading] = useState("");
    const [date, setDate] = useState("");
    const [img, setImg] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const {PoemData, WritingData} = useContext(Context);

    function strConverter(lst){
        let final = "";
        lst.map((item) =>{
            final = final + item + "\n";
        })
        final = final.substring(0, final.length - 1);
        return final;
    }

    useEffect(() => {
        setHeading(data.title);
        setDate(data.date);
        setImg(strConverter(data.img));
        setValue(strConverter(data.text));
    }, [])

    function lstConverter(str){
        let temp = "";
        let result = []
        for ( const a of str ){
            if (a === "\n"){
                result.push(temp);
                temp = ""
            }else{
                temp = temp + a;
            }
        }
        result.push(temp);
        return result
    }

    function onSubmit(){ 
        data.text = lstConverter(value);
        data.img = lstConverter(img);
        data.date = date;
        data.title = headding;
        data["confirm"] = true;
        let set;
        if(data.id === ""){
            if(data.poem){
                set = PoemData;
            }else{
                set = WritingData;
            }  
            let highestId = 0;
            for (const item of set) {
                if (item.id > highestId) {
                    highestId = item.id;
                }
            }
            data.id = highestId + 1;
            data["new"] = true;
        }
        navigate("/site/poem", {state:data});
        
    }

    return(
        <div style={{padding:"20px"}}> 
            <p>HEADDING <br/><textarea id="1" style={{fontSize: "20px"}} rows="5" cols="29" value={headding} onChange={(e) => setHeading(e.target.value)}/></p>
            <p>BODY <br/><textarea id="2" style={{fontSize: "20px"}} rows="50" cols="29" value={value} onChange={(e) => setValue(e.target.value)}/></p>
            <p>DATE: <br/><input id="3" style={{fontSize: "20px"}} value={date} onChange={(e) => setDate(e.target.value)}/></p>
            <p>IMAGES <br/><textarea id="4" style={{fontSize: "20px"}} rows="10" cols="29" value={img} onChange={(e) => setImg(e.target.value)}/></p>
            <br/><button className="button" onClick={onSubmit}>submit</button>
        </div>
    );
}

export default Edit;