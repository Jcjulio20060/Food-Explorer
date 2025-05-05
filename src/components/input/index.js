import React from "react";
import { Input } from "antd";
import { useState } from "react";
import "./style.css"; // Importando o CSS do componente

export default function InputComponent({ label, placeholder, type }) {
  const [value, setValue] = useState("");

  return (
    <div className="input-component">
      <label>{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input-field"
      />
    </div>
  );
}