import React from "react";
const DropDown = ({ name, label, value, error, handleChange, options }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="genre">{label}</label>
        <select
          name={name}
          className="form-control"
          id={name}
          value={value}
          error={error}
          onChange={handleChange}
        >
          <option value=""> </option>
          {options.map(option => {
            return (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDown;