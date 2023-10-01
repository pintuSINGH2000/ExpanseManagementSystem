import React from "react";

const Spinner = () => {
  return (
    <>
      <div
        className="progress my-2"
        role="progressbar"
        aria-label="Info example"
        aria-valuenow="50"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{height:"3px"}}
      >
        <div className="progress-bar bg-info loader"></div>
      </div>
    </>
  );
};

export default Spinner;
