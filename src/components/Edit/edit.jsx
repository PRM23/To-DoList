import React from "react";
import { Grid } from "@material-ui/core";
import useEditHooks from "./editHooks";
import { Link } from "react-router-dom";
import "./../add_edit.css";
import { useNavigate } from "react-router-dom";

const Edit = (props) => {
  const {
    id,
    setId,
    input,
    details,
    date,
    UpdateHandler,
    setInput,
    setValue,
    setdetails,
    setDate,
    DateHandler,
    SelectHandler,
  } = useEditHooks(props);

  const navigate = useNavigate();

  return (
    <Grid>
      <div className="container">
        <form className="row g-3">
          <span className="border border-primary m- justify-content-center">
            <div className="col-md-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                class="form-control m-3"
                placeholder="title"
                id="validationDefault01"
                required
              />
            </div>
            <div className="form-floating m-3">
              <textarea
                className="form-control"
                value={details}
                onChange={(e) => setdetails(e.target.value)}
                placeholder="details"
                id="floatingTextarea"
              ></textarea>
            </div>

            <div>
              <input
                type="date"
                className="form-control m-3"
                id="date"
                value={date}
                onChange={DateHandler}
                required
              />
            </div>
            <div>
              <select
                className="form-select m-3"
                id="date"
                onChange={SelectHandler}
              >
                <option value="">Choose...</option>
                <option
                  value="today"
                  // onChange={(e) => setchh(e.option.seletedIndex)}
                  id="today"
                >
                  Today
                </option>
                <option value="tomorrow" id="tomorrow">
                  Tomorrow
                </option>
                <option value="nextweek" id="nextweek">
                  Next Week
                </option>
              </select>
            </div>

            <div className="row-mb-3">
              <button
                className="btn btn-primary m-3"
                onClick={() => UpdateHandler(id)}
                type="submit"
              >
                Update
              </button>

              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => navigate("/list")}
              >
                Cancel
              </button>
            </div>
          </span>
        </form>
      </div>
    </Grid>
  );
};

export default Edit;
