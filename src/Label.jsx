import React from "react";
import PropTypes from "prop-types";
import { Typography, useTheme } from "@mui/material";
import { useValidation } from "./validation/lib";

const Label = ({ name, color, children, ...rest }) => {
  const { hasError } = useValidation();
  const { typography } = useTheme();
  const sxColor = hasError(name) ? "error.main" : `${color}.main`;
  const defaultTypography = typography?.formLabel || {};

  return (
    <Typography
      className={"GrtFormLabel"}
      {...rest}
      sx={{ color: sxColor, ...defaultTypography }}
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
