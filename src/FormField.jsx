import React from "react";
import classNames from "classnames";
import { Box } from "@mui/material";

const FormField = ({ className, ...rest }) => {
  return (
    <Box className={classNames("GrtFormField", className)} {...rest}>
      {rest.children}
    </Box>
  );
};

export default FormField;
