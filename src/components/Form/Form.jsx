import React, { useState } from "react";
import styles from "./Form.module.css";
import FormInput from "./FormInput";

function Form() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", empId: "" });
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case "username":
        if (value.length < 3) return "Min 3 characters";
        if (/[^a-zA-Z]/.test(value)) return "Only alphabets allowed";
        return "";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email";
      case "password":
        return value.length < 6 ? "Min 6 characters" : "";
      case "empId":
        return /^\d+$/.test(value) ? "" : "Must be a number";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <FormInput name="username" placeholder="Enter Username" onChange={handleChange} isValid={formData.username && !errors.username} error={errors.username} />
        <FormInput name="email" placeholder="Enter Email" onChange={handleChange} isValid={formData.email && !errors.email} error={errors.email} />
        <FormInput name="password" placeholder="Enter Password" type="password" onChange={handleChange} isValid={formData.password && !errors.password} error={errors.password} />
        <FormInput name="empId" placeholder="Enter Employee ID" onChange={handleChange} isValid={formData.empId && !errors.empId} error={errors.empId} />
      </form>
    </div>
  );
}

export default Form;
