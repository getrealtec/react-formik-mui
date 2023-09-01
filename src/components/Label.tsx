import * as React from "react";
import { PropsWithChildren } from "react";
import { Typography } from "@mui/material";
import { useValidation } from "../lib";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    inputLabel: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    inputLabel?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    inputLabel: true;
  }
}

export interface LabelProps {
  name: string;
  color?: string;

  [key: string]: any;
}

const Label = (props: PropsWithChildren<LabelProps>) => {
  const { hasError } = useValidation();
  const { name, color, ...rest } = props;
  const _color = color || "primary";
  const sxColor = hasError(props.name) ? "error.main" : `${_color}.main`;

  return (
    <Typography
      className={"GrtFormLabel"}
      {...rest}
      variant={"inputLabel"}
      sx={{ color: sxColor }}
    >
      {props.children}
    </Typography>
  );
};

export default Label;
