import React from "react";
import { Box } from "@mui/material";

const FormField = (props) => {
  return (
    <Box className={"GrtFormField"} {...props}>
      {props.children}
    </Box>
  );
};

export default FormField;
