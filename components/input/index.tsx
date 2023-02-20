import React from "react";

import styles from "./Input.module.scss";

interface InputProps {
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: any) => void;
  name: string;
  label?: string;
}

export default function Input(props: InputProps) {
  return (
    <div className={styles.input_container}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={styles.input}
        placeholder={props.placeholder}
        type={props.type}
      />
    </div>
  );
}