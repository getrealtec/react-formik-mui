import React from "react";
import PropTypes from "prop-types";
import { isArray } from "lodash";
import { useFormikContext } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SelectInputChips from "./SelectInputChips.jsx";
import HelperText from "./HelperText.jsx";
import { arrayToggle, useValidation } from "./lib.js";
import FormField from "./FormField.jsx";
import Label from "./Label.jsx";

const SelectInput = (props) => {
  const {
    id,
    name,
    label,
    options,
    required,
    placeholder = "",
    ariaLabel,
    color = "primary",
    multiple = false,
    showSelectionsLabel = "",
  } = props;

  const formik = useFormikContext();
  const { hasError } = useValidation();
  const value = formik.values[name] || "";

  const isSelected = (option) => {
    return isArray(value) ? value.includes(option) : value === option;
  };

  const handleChange = (option) => () => {
    formik.setFieldValue(name, arrayToggle(value, option.value, !multiple));
  };

  return (
    <FormField>
      <FormControl
        variant="standard"
        fullWidth
        className={`GrtFormSelect-${name}`}
        error={hasError(name)}
      >
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
        <Select
          value={value}
          IconComponent={ExpandMoreRoundedIcon}
          inputProps={{ name, "aria-required": required }}
          displayEmpty
          autoFocus
          multiple={multiple}
          labelId={`${id}-label`}
        >
          {placeholder && (
            <MenuItem disabled value={""}>
              <Typography variant={"fieldPlaceholder"} component={"span"}>
                {placeholder}
              </Typography>
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              selected={isSelected(option.value)}
              onClick={handleChange(option)}
              disableRipple
            >
              <Typography variant={"input"}>{option.label}</Typography>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          <HelperText {...props} />
        </FormHelperText>
      </FormControl>
      <SelectInputChips
        onClick={handleChange}
        value={value}
        options={options}
        showSelectionsLabel={multiple && showSelectionsLabel}
      />
    </FormField>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
};

export default SelectInput;
