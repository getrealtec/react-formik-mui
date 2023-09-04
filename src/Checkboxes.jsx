import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useFormikContext } from "formik";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText, Typography,
} from "@mui/material";
import { arrayToggle, useValidation } from "./lib.js";
import HelperText from "./HelperText.jsx";
import Label from "./Label.jsx";
import styles from "./Input.module.scss";

const Checkboxes = (props) => {
  const {
    id,
    label,
    name,
    options,
    ariaLabel,
    required,
    className,
    isHorizontal = false,
    color = "primary",
  } = props;

  const formik = useFormikContext();
  const { hasError } = useValidation();
  const _color = hasError(name) ? "error" : color;
  const colorSx = { color: `${_color}.main` };
  const value = formik.values[name] || [];

  const handleChange = (option) => () => {
    formik.setFieldValue(name, arrayToggle(value, option.value));
  };

  return (
    <FormControl>
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
      <FormGroup
        className={classNames(
          "GrtInputCheckboxes",
          isHorizontal && "GrtInlineInput",
          isHorizontal && styles.GrtInlineInput,
          className,
        )}
        aria-labelledby={`${id}-label`}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            label={
              <Typography color={`${color}.main`}>{option.label}</Typography>
            }
            value={option.value}
            control={
              <Checkbox
                checked={value.includes(option.value)}
                onChange={handleChange(option)}
                color={_color}
                sx={colorSx}
                name={name}
                aria-required={required}
                aria-label={ariaLabel}
              />
            }
          />
        ))}
      </FormGroup>
      <FormHelperText>
        <HelperText {...props} />
      </FormHelperText>
    </FormControl>
  );
};

Checkboxes.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  id: PropTypes.string,
  value: PropTypes.array,
  label: PropTypes.string,
  isHorizontal: PropTypes.bool,
  color: PropTypes.string,
};

export default Checkboxes;
