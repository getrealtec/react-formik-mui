import React from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import { useFormikContext } from "formik";
import { TextField, useTheme } from "@mui/material";
import Label from "./Label.jsx";
import HelperText from "./HelperText.jsx";
import InputEndAdornment from "./InputEndAdornment.jsx";
import FormField from "./FormField.jsx";
import { defaultPhoneMask, useValidation } from "./lib.js";

const Phone = (props) => {
  const {
    name,
    label,
    id,
    required,
    ariaLabel,
    helperText,
    className,
    color = "primary",
    variant = "standard",
    mask = defaultPhoneMask,
    ...rest
  } = props;

  const { typography } = useTheme();
  const formik = useFormikContext();
  const { hasError } = useValidation();

  return (
    <FormField>
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
      <InputMask
        mask={mask}
        value={formik.values[name]}
        onChange={formik.handleChange}
      >
        {() => (
          <TextField
            id={`${id}-input`}
            name={name}
            value={formik.values[name]}
            error={hasError(name)}
            className={"GrtFormInput-phone"}
            placeholder={mask}
            fullWidth
            color={color}
            variant={variant}
            helperText={<HelperText name={name} helperText={helperText}/>}
            inputProps={{
              "aria-labelledby": `${id}-label`,
            }}
            InputProps={{
              sx: typography.input,
              endAdornment: <InputEndAdornment {...props} />,
            }}
            {...rest}
          />
        )}
      </InputMask>
    </FormField>
  );
};

Phone.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  mask: PropTypes.string,
};

export default Phone;
