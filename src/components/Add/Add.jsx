import React from "react"
import { Link } from "react-router-dom";
import useAddHooks from "./AddHooks"
const Add = (props) => {

    const {
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
      SelectHandler
    } = useAddHooks(props);

    return (
        <>
          <div class="container">
            <form class="row g-3">
              <span class="border border-primary m- justify-content-center">
                <div class="col-md-4">
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
                <div class="form-floating m-3">
                  <textarea
                    class="form-control"
                    value={details}
                    onChange={(e) => setdetails(e.target.value)}
                    placeholder="details"
                    id="floatingTextarea"
                  ></textarea>
                </div>
    
                <div>
                  <input
                    type="date"
                    class="form-control m-3"
                    id="date"
                    value={date}
                    onChange={DateHandler}
                    required
                  />
                </div>
                <div>
                  <select
                    class="form-select m-3"
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
                    <option value="nextmonth" id="nextmonth">
                      Next Month
                    </option>
                  </select>
                </div>
    
                <div class="row-mb-3">
                  <Link to="/list">
                    <button
                      class="btn btn-primary m-3"
                      onClick={ClickHandler}
                      type="submit"
                    >
                      Save
                    </button>
                  </Link>
    
                  <button class="btn btn-primary" type="submit">
                    Cancel
                  </button>
                </div>
              </span>
            </form>
          </div>
        </>
      );
}

export default Add;