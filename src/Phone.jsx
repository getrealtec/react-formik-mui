import React from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import { useFormikContext } from "formik";
import { TextField, useTheme } from "@mui/material";
import Label from "./Label";
import HelperText from "./validation/HelperText";
import InputEndAdornment from "./validation/InputEndAdornment";
import FormField from "./FormField";
import { defaultPhoneMask, useValidation } from "./validation/lib";

const Phone = (props) => {
  const {
    name,
    label,
    id,
    ariaLabel,
    helperText,
    className,
    color = "primary",
    mask,
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
        mask={mask || defaultPhoneMask}
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
            variant={"standard"}
            placeholder={mask}
            fullWidth
            helperText={<HelperText {...props} />}
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
