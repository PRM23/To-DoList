import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { stringify } from "uuid";

toast.configure();

const useListHooks = () => {
  let data = JSON.parse(localStorage.getItem("arr")) || [];
  let completed = JSON.parse(localStorage.getItem("completed")) || [];
  JSON.parse(localStorage.getItem("completed"));
  const [value, setValue] = useState(data);
  const [isClicked, setIsClicked] = useState(false);
  const [cnt, setCnt] = useState(completed.length);
  const [isShown, setIsShown] = useState(true);
  const [isDelete, setIsDelete] = useState(false);

  var ls = "";
  const navigate = useNavigate();

  useEffect(() => {
    ls = JSON.parse(localStorage.getItem("arr"));
    if (ls.length === 0) {
      navigate("/");
    }
  }, [ls]);

  const DeleteHandler = (id) => {
    console.log(id);
    console.log(value);
    const newList = value.filter((items, i) => i != id);
    console.log(newList);
    setValue(newList);
    setIsDelete(true);

    localStorage.setItem("arr", JSON.stringify(newList));
    localStorage.setItem("completed", JSON.stringify(newList));
    // myFunction();

    toast.error("Note is Deleted", { position: toast.POSITION.TOP_RIGHT });
    if (newList.length === 0) {
      navigate("/");
    }
  };

  const EditHandler = (id) => {
    //to fetch data of same id in edit page
    // let data = JSON.parse(localStorage.getItem("arr")) || [];
    // for(var i = 0; i<data.length;i++){
    //   if(id === data[i].id){
    //     setInput(data[i].input);
    //     setdetails(data[i].details);
    //     setDate(data[i].date);
    //   }
    // }
    // console.log(id);
    // setValue(localStorage.setItem("arr", JSON.stringify(data)));
    navigate(`/Edit/${id}`);
  };

  const ClickHandler = (id) => {
    // id.preventDefault();
    const add = value.filter((a, i) => i === id);

    completed.push(...add);

    console.log(add);
    console.log(completed);
    localStorage.setItem("completed", JSON.stringify(completed));
    setCnt(cnt);
    console.log(cnt);

    const remove = value.filter((items, i) => i != id);
    setValue(remove);
    localStorage.setItem("arr", JSON.stringify(remove));

    toast.success("Note added successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    window.location.reload();
    if (remove.length === 0) {
      navigate("/");
    }
  };

  const AddHandler = () => {
    const ls = JSON.parse(localStorage.getItem("completed"));
    setIsClicked(!isClicked);
  };

  const ClearAll = () => {
    localStorage.removeItem("completed");
    window.location.reload();
  };

  function MouseOver(e) {
    e.target.style.color = "grey";
  }
  function MouseOut(e) {
    e.target.style.color = "";
  }

  return {
    data,
    completed,
    isClicked,
    setIsClicked,
    cnt,
    setCnt,
    isShown,
    setIsShown,
    DeleteHandler,
    EditHandler,
    ClickHandler,
    AddHandler,
    ClearAll,
    MouseOver,
    MouseOut,
  };
};

export default useListHooks;
