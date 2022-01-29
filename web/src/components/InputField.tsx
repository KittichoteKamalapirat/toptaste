import { TextField, TextFieldProps } from "@mui/material";
import { FieldProps } from "formik";
import React from "react";

export const InputField: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  field,
  ...props
}) => {
  return (
    <TextField
      sx={{ width: "100%" }}
      label={placeholder}
      placeholder={placeholder}
      {...field}
      {...props}
    />
  );
};
