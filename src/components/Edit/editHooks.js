import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const useEditHooks = () =>{

    const navigate = useNavigate();
    let arr = JSON.parse(localStorage.getItem("arr")) || [];
    const [input, setInput] = useState("");
    const [details, setdetails] = useState("");
    const [value, setValue] = useState(arr);
    const [date, setDate] = useState("");
    const[array,setArray] = useState([]);
    
    // const { id ,setId} = useState(0);
    const {id}=useParams()
    let obj;
    var list = "";


      useEffect(() => {
        arr.filter((data) => {
            if (data.id === id) {
                setInput(data.input);
                setdetails(data.details);
                setDate(data.date);
            }
          });
      }, []);
    
    
      const DateHandler = (e) => {
        setDate(e.target.value);
        console.log(e.target.value);
      };
      const UpdateHandler = (e) => {
        
        let modifiedData = arr.map(user => {
            if (user.id === id) {
                setInput(user.input);
                setdetails(user.details);
                setDate(user.Date);
              return { ...user, input: input, details: details,date:date };
            }
            return user;
          });
      
          setValue(modifiedData);
          localStorage.setItem("arr", JSON.stringify(modifiedData));
          navigate("/list");
          toast.success("Updated successfully",{position:toast.POSITION.TOP_RIGHT});
      };

    
      const SelectHandler = (e) => {
        const dt = new Date();
        console.log("clicked");
        if (e.target.value === "today") {
          //`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
          setDate(`${dt.getFullYear()}-${0}${dt.getMonth() + 1}-${dt.getDate()}`);
        } else if (e.target.value === "tomorrow") {
          console.log(
            `${dt.getFullYear()}-${0}${dt.getMonth() + 1}-${dt.getDate() + 1}`
          );
          setDate(
            `${dt.getFullYear()}-${0}${dt.getMonth() + 1}-${dt.getDate() + 1}`
          );
        } else if (e.target.value === "nextweek") {
          console.log(
            `${dt.getFullYear()}-${0}${dt.getMonth() + 1}-${dt.getDate() + 7}`
          );
          setDate(
            `${dt.getFullYear()}-${0}${dt.getMonth() + 1}-${dt.getDate() + 7}`
          );
        }
      };

      return{
        id,
        //setId,
        input,
        details,
        date,
        UpdateHandler,
        setInput,
        setValue,
        setdetails,
        setDate,
        DateHandler,
        SelectHandler
      }

}

export default useEditHooks;