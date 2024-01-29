import React, { ChangeEvent } from "react";

const FormInput: React.FC<{
  label: string;
  type: string;
  placeholder: string;
  name: string;
  classes: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
  onBlur?: () => void;
}> = (props) => {
  return (
    <>
      <div className="form-group mb-2">
        <label className="form-label"> {props.label}</label>
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          className={props.classes}
          value={props.value}
          onChange={(event) => props.onChange(event)}
          onBlur={props.onBlur}></input>
      </div>
      {props.error && <div className="text-danger">{props.error}</div>}
    </>
  );
};

export default FormInput;
