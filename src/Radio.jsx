import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useFormikContext } from "formik";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio as MuiRadio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Label from "./Label.jsx";
import { useValidation } from "./lib.js";
import FormField from "./FormField.jsx";
import styles from "./Input.module.scss";

const Radio = (props) => {
  const {
    id,
    label,
    name,
    options,
    ariaLabel,
    className,
    isHorizontal = false,
    required = false,
    color = "primary",
  } = props;

  const formik = useFormikContext();
  const { hasError } = useValidation();
  const _color = hasError(name) ? "error" : color;

  return (
    <FormField className={className}>
      <FormControl color={color}>
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
        <RadioGroup
          value={formik.values[name]}
          onChange={formik.handleChange}
          className={classNames(
            "GrtInputRadio",
            isHorizontal && "GrtInlineInput",
            isHorizontal && styles.GrtInlineInput,
            className,
          )}
          aria-labelledby={`${id}-label`}
          aria-required={required}
          name={name}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              label={
                <Typography color={`${color}.main`}>{option.label}</Typography>
              }
              control={
                <MuiRadio
                  color={color}
                  sx={{ color: `${color}.main` }}
                  name={name}
                />
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </FormField>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  isHorizontal: PropTypes.bool,
  color: PropTypes.string,
};

export default Radio;
