import React from "react";
import { Typography } from "@mui/material";
import FormikInput from "@tink/inputs/FormikInput";
import { fieldHasError } from "@forms/formValidation";
import { useFormikContext } from "formik";

const Label = ({ name, children, ...rest }) => {
  const formik = useFormikContext();
  const color = fieldHasError(formik, name) ? "error.main" : "text.highlighted";

  return (
    <Typography
      className={"GrtLabel"}
      sx={{ color }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

Label.propTypes = {
  ...FormikInput.propTypes,
};

export default Label;
