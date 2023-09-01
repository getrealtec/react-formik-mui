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
import SelectInputChips from "./SelectInputChips";
import HelperText from "./HelperText";
import { arrayToggle, useValidation } from "./lib";
import FormField from "./FormField";
import Label from "./Label";

const SelectInput = (props) => {
  const {
    id,
    name,
    label,
    options,
    placeholder = "",
    ariaLabel,
    required,
    multiple = false,
    showSelectionsLabel = "",
  } = props;

  const formik = useFormikContext();
  const { hasError } = useValidation();
  const value = formik.values[name];

  const isSelected = (option) => {
    return isArray(value) ? value.includes(option) : value == option;
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
        {label && (
          <FormLabel id={`${id}-label`} aria-label={ariaLabel}>
            <Label name={name}>{label}</Label>
          </FormLabel>
        )}
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
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
};

export default SelectInput;
