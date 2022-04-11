import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useAddHooks = () => {
  let arr = JSON.parse(localStorage.getItem("arr")) || [];
  const [input, setInput] = useState("");
  const [details, setdetails] = useState("");
  const [value, setValue] = useState(arr);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  var list = "";

  const DateHandler = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };

  const ClickHandler = () => {
    if (!input || !details || !date) {
      alert("plz fill the details");
      navigate("/");

      console.log("fill the details!");
    } else {
      list = {
        id: uuidv4(),
        input: input,
        details: details,
        date: date,
      };
      arr.push(list);
      localStorage.setItem("arr", JSON.stringify(arr));
      setValue(JSON.parse(localStorage.getItem("arr")));
      console.log(arr);
      toast.success("Added successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
    } else if (e.target.value === "nextmonth") {
      console.log(
        `${dt.getFullYear()}-${0}${dt.getMonth() + 1}-${dt.getDate()}`
      );
      setDate(
        `${dt.getFullYear()}-${0}${dt.getMonth() + 1 + 1}-${dt.getDate()}`
      );
    }
  };

  return {
    input,
    setInput,
    date,
    setDate,
    value,
    setValue,
    details,
    setdetails,
    DateHandler,
    ClickHandler,
    SelectHandler,
  };
};

export default useAddHooks;
