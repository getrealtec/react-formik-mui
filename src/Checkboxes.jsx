import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { arrayToggle, useValidation } from "./lib";
import HelperText from "./HelperText";
import Label from "./Label";
import { useFormikContext } from "formik";
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
  const value = formik.values[name];

  const handleChange = (option) => () => {
    formik.setFieldValue(name, arrayToggle(value, option.value));
  };

  return (
    <FormControl>
      <FormLabel id={`${id}-label`}>
        <Label name={name}>{label}</Label>
      </FormLabel>
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
            label={option.label}
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
  id: PropTypes.string,
  value: PropTypes.array,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.node,
    }),
  ),
  isHorizontal: PropTypes.bool,
  color: PropTypes.string,
};

export default Checkboxes;
