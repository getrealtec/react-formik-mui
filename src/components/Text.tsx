import * as React from "react";
import classNames from "classnames";
import { useFormikContext } from "formik";
import { TextField as MuiTextField, useTheme } from "@mui/material";
import InputEndAdornment from "./validation/InputEndAdornment";
import HelperText from "./validation/HelperText";
import Label from "./Label";
import FormField from "./FormField";
import { useValidation } from "./validation/lib";

function Text(props) {
  const {
    name,
    label,
    id,
    ariaLabel,
    helperText,
    className,
    color = "primary",
    min,
    max,
    ...rest
  } = props;

  const { typography } = useTheme();
  const formik = useFormikContext();
  const { hasError } = useValidation();

  return (
    <FormField className={className}>
      <Label
        id={`${id}-label`}
        name={name}
        htmlFor={`${id}-input`}
        aria-label={ariaLabel}
        component={"label"}
        color={color}
      >
        {label}
      </Label>
      <MuiTextField
        id={`${id}-input`}
        name={name}
        value={formik.values[name]}
        error={hasError(name)}
        onChange={formik.handleChange}
        className={classNames(`GrtFormText-${name}`)}
        variant={"standard"}
        fullWidth
        helperText={<HelperText {...props} />}
        inputProps={{
          "aria-labelledby": `${id}-label`,
          minLength: min || undefined,
          maxLength: max || undefined,
        }}
        InputProps={{
          sx: typography.input,
          endAdornment: <InputEndAdornment {...props} />,
        }}
        {...rest}
      />
    </FormField>
  );
}

export default Text;
