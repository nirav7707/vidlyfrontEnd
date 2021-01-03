import React from "react";
const Input = ({  label, name, errors,...rest }) => {
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        {...rest}
        name={name}
        id={name}
      />
      {errors && <div className="alert alert-danger my-2">{errors}</div>}
    </React.Fragment>
  );
};

export default Input;
