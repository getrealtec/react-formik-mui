import React from "react";
import FormikInput from "@tink/inputs/FormikInput";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { fieldHasError } from "@forms/formValidation";
import { useFormikContext } from "formik";

const InputEndAdornment = ({ name }) => {
  const formik = useFormikContext();

  if (fieldHasError(formik, name)) {
    return (
      <CancelRoundedIcon color={"error"} />
    );
  }

  return undefined;
};

InputEndAdornment.propTypes = {
  ...FormikInput.propTypes,
};

export default InputEndAdornment;
