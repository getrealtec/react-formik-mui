import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useFormikContext } from "formik";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useValidation } from "./validation/lib";
import HelperText from "./validation/HelperText";
import FormField from "./FormField";
import Label from "./Label";

const Consent = (props) => {
  const {
    name,
    label,
    ariaLabel,
    typography = "body1",
    helperText,
    className,
    color = "primary",
    ...rest
  } = props;

  const formik = useFormikContext();
  const { hasError } = useValidation();
  const colorSx = { color: hasError ? "error.main" : `${color}.contrastText` };

  return (
    <FormField className={className}>
      <FormControl variant={"standard"} error={hasError} color={color}>
        <FormControlLabel
          label={<Label color={color}>{label}</Label>}
          control={
            <Checkbox
              name={name}
              checked={formik.values[name]}
              onChange={formik.handleChange}
              color={color}
              sx={colorSx}
              {...rest}
            />
          }
        />
        {hasError && (
          <FormHelperText>
            <HelperText {...props} />
          </FormHelperText>
        )}
      </FormControl>
    </FormField>
  );
};

Consent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  helperText: PropTypes.string,
  typography: PropTypes.object,
  className: PropTypes.string,
};

export default Consent;
