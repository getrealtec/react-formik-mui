import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useValidation } from "./lib";
import HelperText from "./HelperText";
import FormField from "./FormField";
import Label from "./Label";

const Consent = (props) => {
  const {
    id,
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
  const colorSx = { color: hasError(name) ? "error.main" : `${color}.main` };

  const handleChange = () => {
    formik.setFieldValue(name, !formik?.values[name]);
  };

  return (
    <FormField className={className}>
      <FormControl variant={"standard"} error={hasError(name)} color={color}>
        <FormControlLabel
          label={<Label color={color}>{label}</Label>}
          control={
            <Checkbox
              id={id}
              name={name}
              required={required}
              checked={!!formik.values[name]}
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

Consent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  helperText: PropTypes.string,
  typography: PropTypes.object,
  className: PropTypes.string,
};

export default Consent;
