import React from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick?: VoidFunction;
  type?: string;
}

const getButtonClass = (type) => {
  switch (type) {
    case "primary":
      return "Button";
    case "danger":
      return "danger";
    default:
      return "Button";
  }
};

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={styles[getButtonClass(props.type)]}
    >
      {props.text}
    </button>
  );
}