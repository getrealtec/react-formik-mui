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
import Label from "./Label";
import { useValidation } from "./validation/lib";
import FormField from "./FormField";
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
        <FormLabel id={`${id}-label`} aria-label={ariaLabel}>
          <Label name={name} color={color}>
            {label}
          </Label>
        </FormLabel>
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
              label={<Typography variant={"body1"}>{option.label}</Typography>}
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
  id: PropTypes.string,
  value: PropTypes.string,
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

export default Radio;
