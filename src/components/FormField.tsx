import * as React from "react";
import classNames from "classnames";
import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export interface FormFieldProps {
  className: string;

  [key: string]: any;
}

const FormField = (props: PropsWithChildren<FormFieldProps>) => {
  const { className, ...rest } = props;

  return (
    <Box className={classNames("GrtFormField", className)} {...rest}>
      {rest.children}
    </Box>
  );
};

export default FormField;
