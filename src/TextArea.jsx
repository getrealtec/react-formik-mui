import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useFormikContext } from "formik";
import { TextField as MuiTextField, useTheme } from "@mui/material";
import InputEndAdornment from "./validation/InputEndAdornment";
import HelperText from "./validation/HelperText";
import Label from "./Label";
import FormField from "./FormField";
import { useValidation } from "./validation/lib";

function TextArea(props) {
  const {
    name,
    label,
    id,
    ariaLabel,
    helperText,
    className,
    color = "primary",
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
        autoComplete={"off"}
        value={formik.values[name]}
        error={hasError(name)}
        onChange={formik.handleChange}
        className={classNames(`GrtFormTextArea-${name}`)}
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
        rows={5}
        {...rest}
        multiline
      />
    </FormField>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  helperText: PropTypes.string,
  typography: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  rows: PropTypes.number,
};

export default TextArea;
