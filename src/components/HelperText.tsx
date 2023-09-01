import * as React from "react";
import { Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { useValidation } from "../lib";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    helperText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    helperText?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    helperText: true;
  }
}

export interface HelperTextProps {
  name: string;
  helperText?: string;
}

const HelperText = (props: HelperTextProps) => {
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

export default HelperText;
