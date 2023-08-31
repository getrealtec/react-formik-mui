import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useFormikContext } from "formik";
import { TextField as MuiTextField } from "@mui/material";
import InputEndAdornment from "./validation/InputEndAdornment";
import HelperText from "./validation/HelperText";
import Label from "./Label";
import FormField from "./FormField";
import { useValidation } from "./validation/lib";

function Text(props) {
  const {
    name,
    label,
    ariaLabel,
    typography = "body1",
    helperText,
    className,
    ...rest
  } = props;

  const formik = useFormikContext();
  const { hasError } = useValidation();

  return (
    <FormField className={classNames("GrtFormField", className)}>
      <Label name={name}>{label}</Label>
      <MuiTextField
        name={name}
        autoComplete={"off"}
        value={formik.values[name]}
        error={hasError(name)}
        onChange={formik.handleChange}
        className={classNames(`GrtFormInput-${name}`)}
        variant={"standard"}
        fullWidth
        helperText={<HelperText {...props} />}
        inputProps={{
          "aria-label": ariaLabel,
        }}
        InputProps={{
          sx: typography,
          endAdornment: <InputEndAdornment {...props} />,
        }}
        {...rest}
      />
    </FormField>
  );
}

Text.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  helperText: PropTypes.string,
  typography: PropTypes.object,
  className: PropTypes.string,
};

export default Text;
