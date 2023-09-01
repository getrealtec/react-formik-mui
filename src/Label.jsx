import * as React from "react";
import { Typography, useTheme } from "@mui/material";
import { useValidation } from "./lib";

const Label = ({ name, color, children, ...rest }) => {
  const { hasError } = useValidation();
  const sxColor = hasError(name) ? "error.main" : `${color}.main`;

  return (
    <Typography
      className={"GrtFormLabel"}
      {...rest}
      variant={"inputLabel"}
      sx={{ color: sxColor }}
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
