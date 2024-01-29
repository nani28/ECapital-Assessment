import React from "react";
import { Link } from "react-router-dom";

const ButtonComponent: React.FC<{
  to: string;
  classes: string;
  content: string;
  onClick?: () => void;
}> = (props) => {
  return (
    <Link to={props.to} className={props.classes} onClick={props.onClick}>
      {props.content}
    </Link>
  );
};

export default ButtonComponent;
