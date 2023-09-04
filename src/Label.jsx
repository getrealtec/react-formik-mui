import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useValidation } from "./lib.js";

const Label = ({ name, color, children, ...rest }) => {
  const { hasError } = useValidation();
  const sxColor = hasError(name) ? "error.main" : `${color}.main`;

  return (
    <Typography
      className={"GrtFormLabel"}
      {...rest}
      variant={"inputLabel"}
      color={sxColor}
    >
      {children}
    </Typography>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Label;
