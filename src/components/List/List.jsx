import {
  Button,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useListHooks from "./listHooks";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//import Draggable from "react-draggable";

const List = (props) => {
  const {
    data,
    completed,
    isClicked,
    isDelete,
    setIsDelete,
    setIsClicked,
    cnt,
    setCnt,
    isShown,

    setIsShown,
    DeleteHandler,
    EditHandler,
    AddHandler,
    ClickHandler,
    ClearAll,
    MouseOver,
    MouseOut,
  } = useListHooks(props);
  const navigate = useNavigate();

  let items = JSON.parse(localStorage.getItem("arr"));
  const [value, setValue] = useState(items);
  const useStyles = makeStyles({
    root: {
      maxWidth: 245,
    },
  });

  function changeBackground(e) {
    e.target.style.color = "red";
  }

  function ChangebgOnMouseOver(e) {
    e.target.style.background = "transparent";
  }
  function ChangebgOnMouseOut(e) {
    e.target.style.background = "";
  }

  // const getItems = (count) =>
  //   Array.from({ length: count }, (v, k) => k).map((k) => ({
  //     id: `item-${k}`,
  //     content: `item ${k}`,
  //   }));
  // let items=getItems()

  const reorder = (list, startIndex, endIndex) => {
    list = JSON.parse(localStorage.getItem("arr"));
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",

    background: isDragging ? "lightgreen" : "transparent",
    ...draggableStyle,
  });

  const onDragEnd = (result) => {
    // dropped outside the list

    if (!result.destination) {
      return;
    }

    const item = reorder(items, result.source.index, result.destination.index);
    setValue(item);
    setValue(localStorage.setItem("arr", JSON.stringify(item)));
    window.location.reload();
  };
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "" : "",

    width: 250,
  });
  const classes = useStyles();

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <i
            class="fa fa-sticky-note-o"
            style={{
              fontSize: "24px",
              color: "white",
              padding: "4px",
              margin: "4px",
            }}
            aria-hidden="true"
          ></i>
          <Link class="navbar-brand" to="/">
            {/* <i class="fas fa-sticky-note fa-border fa-3x" style={{fontSize:'24px'}}  aria-hidden="true"> Task DashBorad</i> */}
            <h3>Task Board</h3>
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex">
              <Link to="/add">
                <button class="btn btn-primary m-3" type="submit">
                  Add Note
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {data?.map((a, i) => {
                return (
                  <Draggable key={a.id} draggableId={a.id} index={i}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <CardActions>
                          <i
                            className="fa fa-check-circle"
                            onClick={() => ClickHandler(i)}
                          ></i>
                        </CardActions>
                        <CardContent
                          style={{ width: "50" }}
                          {...provided.dragHandleProps}
                        >
                          <Typography
                            style={{ fontSize: 20 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            <h4>{a.input}</h4>
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <i
                            className="fa fa-trash m-4"
                            id="hover"
                            aria-hidden="true"
                            style={{ color: "red" }}
                            onClick={() => DeleteHandler(i)}
                            onMouseOver={ChangebgOnMouseOver}
                            onMouseOut={ChangebgOnMouseOut}
                          ></i>
                          <i
                            className="fa fa-pencil-square-o"
                            id="hover"
                            aria-hidden="true"
                            style={{ color: "blue" }}
                            onClick={() => EditHandler(a.id)}
                            onMouseOver={ChangebgOnMouseOver}
                            onMouseOut={ChangebgOnMouseOut}
                          ></i>
                        </CardActions>
                      </Card>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="dropup">
        {isClicked && (
          <ul>
            <b>Clear All</b>
            <i
              className="fa fa-trash m-4"
              id="hover"
              aria-hidden="true"
              style={{ color: "red" }}
              onClick={ClearAll}
            ></i>

            {completed.map((items, i) => {
              return (
                <div>
                  <del>
                    <h6 key={i}>{items.input}</h6>
                  </del>
                </div>
              );
            })}
          </ul>
        )}
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle m-2"
          data-bs-toggle="dropdown"
          aria-expanded={isClicked}
          onClick={AddHandler}
        >
          Completed ({cnt})
        </button>
      </div>
    </div>
  );
};

export default List;
