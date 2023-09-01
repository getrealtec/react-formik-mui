import React from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useValidation } from "./lib";
import PropTypes from "prop-types";

const InputEndAdornment = ({ name, InputEndAdornment }) => {
  const { hasError } = useValidation();

  if (hasError(name)) {
    return <CancelRoundedIcon color={"error"} />;
  }

  return InputEndAdornment;
};

InputEndAdornment.propTypes = {
  name: PropTypes.string.isRequired,
  InputEndAdornment: PropTypes.node,
};

export default InputEndAdornment;
