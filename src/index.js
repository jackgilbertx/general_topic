import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import "./styles.css";

const ErrorIcon = () => (
  <svg
    fill="currentColor"
    preserveAspectRatio="xMidYMid meet"
    height="1em"
    width="1em"
    viewBox="0 0 40 40"
    className="error-icon"
    focusable="false"
    style={{ verticalAlign: "middle", color: "#cd0d15" }}
  >
    <g>
      <path d="m20.1 2.9q4.7 0 8.6 2.3t6.3 6.2 2.3 8.6-2.3 8.6-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3z m2.9 27.8v-4.2q0-0.4-0.2-0.6t-0.5-0.2h-4.3q-0.3 0-0.5 0.2t-0.2 0.5v4.3q0 0.3 0.2 0.5t0.5 0.2h4.3q0.3 0 0.5-0.2t0.2-0.5z m0-7.7l0.4-13.8q0-0.3-0.3-0.5-0.2-0.1-0.5-0.1h-4.9q-0.3 0-0.5 0.1-0.3 0.2-0.3 0.4l0.4 13.9q0 0.2 0.2 0.4t0.6 0.2h4.1q0.3 0 0.5-0.2t0.3-0.4z"></path>
    </g>
  </svg>
);

const Tooltip = () => (
  <div className="tooltip">
    <div className="tooltip-arrow" />
    <div className="tooltip-body">50 character max has been reach</div>
  </div>
);

class GeneralTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 50
    };
  }

  changeCount = (e) => {
    e.persist();
    this.setState({
      count: 50 - e.target.value.length
    });
  };

  render() {
    const { count } = this.state;

    return (
      <Formik
        // validateOnChange={false}
        // validateOnBlur={false}
        initialValues={{ general: "" }}
        validationSchema={Yup.object({
          general: Yup.string().required("Please enter the comments")
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(props) => {
          const { handleSubmit, handleChange, errors, isSubmitting } = props;
          return (
            <div className="container">
              <label htmlFor="general">General Topic</label>
              <textarea
                placeholder="Please provide a description of your issue..."
                maxLength="50"
                className={errors.general ? "errorBorder" : null}
                name="general"
                id="general"
                type="text"
                //  onChange={handleChange}
                onChange={(e) => {
                  handleChange(e);
                  this.changeCount(e);
                }}
              />
              <div className="error-container">
                {errors.general ? (
                  <Fragment>
                    <ErrorIcon />
                    <div className="errorMsg">{errors.general}</div>
                  </Fragment>
                ) : null}
              </div>

              <div className="bottom">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  type="submit"
                >
                  Submit
                </button>
                <div className="charCount">
                  Character count:{" "}
                  <span className={count === 0 ? "max" : null}>
                    {count}
                    {count === 0 && (
                      <div className="tooltip-container">
                        <Tooltip />
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  }
}

function App() {
  return <GeneralTopic />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
