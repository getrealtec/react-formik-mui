import * as React from "react";
import { useFormikContext, FormikContextType } from "formik";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useValidation } from "../lib";
import HelperText from "./HelperText";
import FormField from "./FormField";
import Label from "./Label";
import { OverridableStringUnion } from "@mui/types";
import { CheckboxPropsColorOverrides } from "@mui/material/Checkbox/Checkbox";

export interface ConsentProps {
  id: string;
  name: string;
  label: string;
  required: boolean;
  ariaLabel: string;
  helperText: string;
  typography: object;
  className: string;
  color?: OverridableStringUnion<
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "default",
    CheckboxPropsColorOverrides
  >;

  [key: string]: any;
}

const Consent = (props: ConsentProps) => {
  const {
    id,
    name,
    label,
    ariaLabel,
    typography = "body1",
    helperText,
    className,
    required,
    color = "primary",
    ...rest
  } = props;

  const formik = useFormikContext();
  const { hasError } = useValidation();
  const colorSx = { color: hasError(name) ? "error.main" : `${color}.main` };

  const handleChange = () => {
    formik.setFieldValue(name, !values[name]);
  };

  return (
    <FormField className={className}>
      <FormControl variant={"standard"} error={hasError(name)}>
        <FormControlLabel
          label={
            <Label name={name} color={color}>
              {label}
            </Label>
          }
          control={
            <Checkbox
              id={id}
              name={name}
              required={required}
              checked={!!values[name]}
              onChange={handleChange}
              color={color}
              sx={colorSx}
            />
          }
        />
        {hasError(name) && (
          <FormHelperText>
            <HelperText {...props} />
          </FormHelperText>
        )}
      </FormControl>
    </FormField>
  );
};

export default Consent;
