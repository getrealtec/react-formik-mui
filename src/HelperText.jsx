import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { useValidation } from "./lib";

const HelperText = (props) => {
  const { name, helperText } = props;
  const formik = useFormikContext();
  const { hasError } = useValidation();

  if (hasError(name)) {
    return (
      <Typography variant={"helperText"} color={"error"}>
        {formik.errors[name]}
      </Typography>
    );
  }

  if (helperText) {
    return (
      <Typography variant={"helperText"} color={"error"}>
        {helperText}
      </Typography>
    );
  }

  return undefined;
};

HelperText.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
};
export default HelperText;
