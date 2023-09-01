import * as React from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useValidation } from "./lib";

const InputEndAdornment = ({ name, EndAdornment }) => {
  const { hasError } = useValidation();

  if (hasError(name)) {
    return <CancelRoundedIcon color={"error"} />;
  }

  return EndAdornment;
};

export default InputEndAdornment;
