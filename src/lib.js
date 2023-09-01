import _ from "lodash";
import { useFormikContext } from "formik";

export const defaultPhoneMask = "(999) 999 - 9999";
export const defaultEmailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
export const defaultPhonePattern = /^\(\d{3}\)\s\d{3}\s-\s\d{4}/;

/**
 * Adds an isRequired error associated to the given field in the error container
 *
 * @param values
 * @returns {(function(*, *): void)|*}
 */
const isRequired = (values) => (field, errors) => {
  const value = _.get(values, field);

  if (!value && value !== 0) {
    errors[field] = "required";
  }
};

/**
 * Adds an invalidEmail error associated to the given field in the error container
 *
 * @param values
 * @returns {(function(*, *): void)|*}
 */
const isEmail =
  (values) =>
  (field, errors, emailPattern = null) => {
    const regex = emailPattern || defaultEmailPattern;

    if (!regex.test(_.get(values, field))) {
      errors[field] = "invalidEmail";
    }
  };

/**
 * Adds an invalidPhone error associated to the given field in the error container
 *
 * @param values
 * @returns {(function(*, *): void)|*}
 */
const isPhone =
  (values) =>
  (field, errors, phonePattern = null) => {
    const regex = phonePattern || defaultPhonePattern;

    if (!regex.test(_.get(values, field))) {
      errors[field] = "invalidPhone";
    }
  };

const hasError = (errors) => (name) => {
  return _.has(errors, name);
};

const getError = (errors) => (name) => {
  return _.get(errors, name, "");
};

export const arrayToggle = (array, item, replace = false) => {
  if (replace) {
    return [item];
  } else if (array.includes(item)) {
    array = array.filter((listItem) => listItem != item);
  } else {
    array.push(item);
  }

  return array;
};

export function useValidation() {
  const formik = useFormikContext();

  return {
    isRequired: isRequired(formik?.values || {}),
    isEmail: isEmail(formik?.values || {}),
    isPhone: isPhone(formik?.values || {}),
    hasError: hasError(formik?.errors || {}),
    getError: getError(formik?.errors || {}),
  };
}
