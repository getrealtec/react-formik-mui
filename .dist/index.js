'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var classNames = require('classnames');
var formik = require('formik');
var material = require('@mui/material');
var _ = require('lodash');
var InputMask = require('react-input-mask');
var CancelRoundedIcon = require('@mui/icons-material/CancelRounded');
var ExpandMoreRoundedIcon = require('@mui/icons-material/ExpandMoreRounded');

var defaultPhoneMask = "(999) 999 - 9999";
var defaultEmailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
var defaultPhonePattern = /^\(\d{3}\)\s\d{3}\s-\s\d{4}/;

/**
 * Adds an isRequired error associated to the given field in the error container
 *
 * @param values
 * @returns {(function(*, *): void)|*}
 */
var isRequired = function isRequired(values) {
  return function (field, errors) {
    var value = _.get(values, field);
    if (!value && value !== 0) {
      errors[field] = "required";
    }
  };
};

/**
 * Adds an invalidEmail error associated to the given field in the error container
 *
 * @param values
 * @returns {(function(*, *): void)|*}
 */
var isEmail = function isEmail(values) {
  return function (field, errors) {
    var emailPattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var regex = emailPattern || defaultEmailPattern;
    if (!regex.test(_.get(values, field))) {
      errors[field] = "invalidEmail";
    }
  };
};

/**
 * Adds an invalidPhone error associated to the given field in the error container
 *
 * @param values
 * @returns {(function(*, *): void)|*}
 */
var isPhone = function isPhone(values) {
  return function (field, errors) {
    var phonePattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var regex = phonePattern || defaultPhonePattern;
    if (!regex.test(_.get(values, field))) {
      errors[field] = "invalidPhone";
    }
  };
};
var hasError = function hasError(errors) {
  return function (name) {
    return _.has(errors, name);
  };
};
var getError = function getError(errors) {
  return function (name) {
    return _.get(errors, name, "");
  };
};
var arrayToggle = function arrayToggle(array, item) {
  var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (replace) {
    return [item];
  } else if (array.includes(item)) {
    array = array.filter(function (listItem) {
      return listItem != item;
    });
  } else {
    array.push(item);
  }
  return array;
};
var useValidation = function useValidation() {
  var formik$1 = formik.useFormikContext();
  return {
    isRequired: isRequired((formik$1 === null || formik$1 === void 0 ? void 0 : formik$1.values) || {}),
    isEmail: isEmail((formik$1 === null || formik$1 === void 0 ? void 0 : formik$1.values) || {}),
    isPhone: isPhone((formik$1 === null || formik$1 === void 0 ? void 0 : formik$1.values) || {}),
    hasError: hasError((formik$1 === null || formik$1 === void 0 ? void 0 : formik$1.errors) || {}),
    getError: getError((formik$1 === null || formik$1 === void 0 ? void 0 : formik$1.errors) || {})
  };
};

var HelperText = function HelperText(props) {
  var name = props.name,
    helperText = props.helperText;
  var formik$1 = formik.useFormikContext();
  var _useValidation = useValidation(),
    hasError = _useValidation.hasError;
  if (hasError(name)) {
    return /*#__PURE__*/React.createElement(material.Typography, {
      variant: "helperText",
      color: "error"
    }, formik$1.errors[name]);
  }
  if (helperText) {
    return /*#__PURE__*/React.createElement(material.Typography, {
      variant: "helperText",
      color: "error"
    }, helperText);
  }
  return undefined;
};
HelperText.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

var _excluded$5 = ["name", "color", "children"];
var Label = function Label(_ref) {
  var name = _ref.name,
    color = _ref.color,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded$5);
  var _useValidation = useValidation(),
    hasError = _useValidation.hasError;
  var sxColor = hasError(name) ? "error.main" : "".concat(color, ".main");
  return /*#__PURE__*/React.createElement(material.Typography, _extends({
    className: "GrtFormLabel"
  }, rest, {
    variant: "inputLabel",
    sx: {
      color: sxColor
    }
  }), children);
};
Label.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string
};

var styles = {};

var Checkboxes = function Checkboxes(props) {
  var id = props.id,
    label = props.label,
    name = props.name,
    options = props.options,
    ariaLabel = props.ariaLabel,
    required = props.required,
    className = props.className,
    _props$isHorizontal = props.isHorizontal,
    isHorizontal = _props$isHorizontal === void 0 ? false : _props$isHorizontal,
    _props$color = props.color,
    color = _props$color === void 0 ? "primary" : _props$color;
  var formik$1 = formik.useFormikContext();
  var _useValidation = useValidation(),
    hasError = _useValidation.hasError;
  var _color = hasError(name) ? "error" : color;
  var colorSx = {
    color: "".concat(_color, ".main")
  };
  var value = formik$1.values[name];
  var handleChange = function handleChange(option) {
    return function () {
      formik$1.setFieldValue(name, arrayToggle(value, option.value));
    };
  };
  return /*#__PURE__*/React.createElement(material.FormControl, null, /*#__PURE__*/React.createElement(material.FormLabel, {
    id: "".concat(id, "-label")
  }, /*#__PURE__*/React.createElement(Label, {
    name: name
  }, label)), /*#__PURE__*/React.createElement(material.FormGroup, {
    className: classNames("GrtInputCheckboxes", isHorizontal && "GrtInlineInput", isHorizontal && styles.GrtInlineInput, className),
    "aria-labelledby": "".concat(id, "-label")
  }, options.map(function (option) {
    return /*#__PURE__*/React.createElement(material.FormControlLabel, {
      key: option.value,
      label: option.label,
      control: /*#__PURE__*/React.createElement(material.Checkbox, {
        checked: value.includes(option.value),
        onChange: handleChange(option),
        color: _color,
        sx: colorSx,
        name: name,
        "aria-required": required,
        "aria-label": ariaLabel
      })
    });
  })), /*#__PURE__*/React.createElement(material.FormHelperText, null, /*#__PURE__*/React.createElement(HelperText, props)));
};
Checkboxes.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.array,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.node
  })),
  isHorizontal: PropTypes.bool,
  color: PropTypes.string
};

var _excluded$4 = ["className"];
var FormField = function FormField(_ref) {
  var className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded$4);
  return /*#__PURE__*/React.createElement(material.Box, _extends({
    className: classNames("GrtFormField", className)
  }, rest), rest.children);
};

var _excluded$3 = ["id", "name", "label", "ariaLabel", "typography", "helperText", "className", "color"];
var Consent = function Consent(props) {
  var id = props.id,
    name = props.name,
    label = props.label;
    props.ariaLabel;
    props.typography;
    props.helperText;
    var className = props.className,
    _props$color = props.color,
    color = _props$color === void 0 ? "primary" : _props$color;
    _objectWithoutProperties(props, _excluded$3);
  var formik$1 = formik.useFormikContext();
  var _useValidation = useValidation(),
    hasError = _useValidation.hasError;
  var colorSx = {
    color: hasError(name) ? "error.main" : "".concat(color, ".main")
  };
  var handleChange = function handleChange() {
    formik$1.setFieldValue(name, !(formik$1 !== null && formik$1 !== void 0 && formik$1.values[name]));
  };
  return /*#__PURE__*/React.createElement(FormField, {
    className: className
  }, /*#__PURE__*/React.createElement(material.FormControl, {
    variant: "standard",
    error: hasError(name),
    color: color
  }, /*#__PURE__*/React.createElement(material.FormControlLabel, {
    label: /*#__PURE__*/React.createElement(Label, {
      color: color
    }, label),
    control: /*#__PURE__*/React.createElement(material.Checkbox, {
      id: id,
      name: name,
      required: required,
      checked: !!formik$1.values[name],
      onChange: handleChange,
      color: color,
      sx: colorSx
    })
  }), hasError(name) && /*#__PURE__*/React.createElement(material.FormHelperText, null, /*#__PURE__*/React.createElement(HelperText, props))));
};
Consent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  helperText: PropTypes.string,
  typography: PropTypes.object,
  className: PropTypes.string
};

var InputEndAdornment = function InputEndAdornment(_ref) {
  var name = _ref.name,
    InputEndAdornment = _ref.InputEndAdornment;
  var _useValidation = useValidation(),
    hasError = _useValidation.hasError;
  if (hasError(name)) {
    return /*#__PURE__*/React.createElement(CancelRoundedIcon, {
      color: "error"
    });
  }
  return InputEndAdornment;
};
InputEndAdornment.propTypes = {
  name: PropTypes.string.isRequired,
  InputEndAdornment: PropTypes.node
};

var _excluded$2 = ["name", "label", "id", "ariaLabel", "helperText", "className", "color", "mask"];
var Phone = function Phone(props) {
  var name = props.name,
    label = props.label,
    id = props.id,
    ariaLabel = props.ariaLabel;
    props.helperText;
    props.className;
    var _props$color = props.color,
    color = _props$color === void 0 ? "primary" : _props$color,
    mask = props.mask,
    rest = _objectWithoutProperties(props, _excluded$2);
  var _useTheme = material.useTheme(),
    typography = _useTheme.typography;
  var formik$1 = formik.useFormikContext();
  var _useValidation = useValidation(),
    hasError = _useValidation.hasError;
  return /*#__PURE__*/React.createElement(FormField, null, /*#__PURE__*/React.createElement(Label, {
    id: "".concat(id, "-label"),
    name: name,
    htmlFor: "".concat(id, "-input"),
    "aria-label": ariaLabel,
    component: "label",
    color: color
  }, label), /*#__PURE__*/React.createElement(InputMask, {
    mask: mask || defaultPhoneMask,
    value: formik$1.values[name],
    onChange: formik$1.handleChange
  }, function () {
    return /*#__PURE__*/React.createElement(material.TextField, _extends({
      id: "".concat(id, "-input"),
      name: name,
      value: formik$1.values[name],
      error: hasError(name),
      className: "GrtFormInput-phone",
      variant: "standard",
      placeholder: mask,
      fullWidth: true,
      helperText: /*#__PURE__*/React.createElement(HelperText, props),
      inputProps: {
        "aria-labelledby": "".concat(id, "-label")
      },
      InputProps: {
        sx: typography.input,
        endAdornment: /*#__PURE__*/React.createElement(InputEndAdornment, props)
      }
    }, rest));
  }));
};
Phone.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  mask: PropTypes.string
};

var Radio = function Radio(props) {
  var id = props.id,
    label = props.label,
    name = props.name,
    options = props.options,
    ariaLabel = props.ariaLabel,
    className = props.className,
    _props$isHorizontal = props.isHorizontal,
    isHorizontal = _props$isHorizontal === void 0 ? false : _props$isHorizontal,
    _props$required = props.required,
    required = _props$required === void 0 ? false : _props$required,
    _props$color = props.color,
    color = _props$color === void 0 ? "primary" : _props$color;
  var formik$1 = formik.useFormikContext();
  var _useValidation = useValidation(),
    hasError = _useValidation.hasError;
  hasError(name) ? "error" : color;
  return /*#__PURE__*/React.createElement(FormField, {
    className: className
  }, /*#__PURE__*/React.createElement(material.FormControl, {
    color: color
  }, /*#__PURE__*/React.createElement(material.FormLabel, {
    id: "".concat(id, "-label"),
    "aria-label": ariaLabel
  }, /*#__PURE__*/React.createElement(Label, {
    name: name,
    color: color
  }, label)), /*#__PURE__*/React.createElement(material.RadioGroup, {
    value: formik$1.values[name],
    onChange: formik$1.handleChange,
    className: classNames("GrtInputRadio", isHorizontal && "GrtInlineInput", isHorizontal && styles.GrtInlineInput, className),
    "aria-labelledby": "".concat(id, "-label"),
    "aria-required": required,
    name: name
  }, options.map(function (option) {
    return /*#__PURE__*/React.createElement(material.FormControlLabel, {
      key: option.value,
      value: option.value,
      label: /*#__PURE__*/React.createElement(material.Typography, {
        variant: "body1"
      }, option.label),
      control: /*#__PURE__*/React.createElement(material.Radio, {
        color: color,
        sx: {
          color: "".concat(color, ".main")
        },
        name: name
      })
    });
  }))));
};
Radio.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.node
  })),
  isHorizontal: PropTypes.bool,
  color: PropTypes.string
};

var SelectInputChips = function SelectInputChips(props) {
  var onClick = props.onClick,
    _props$value = props.value,
    value = _props$value === void 0 ? [] : _props$value,
    _props$options = props.options,
    options = _props$options === void 0 ? [] : _props$options,
    _props$showSelections = props.showSelectionsLabel,
    showSelectionsLabel = _props$showSelections === void 0 ? null : _props$showSelections;
  if (!showSelectionsLabel) {
    return;
  }
  function chipLabel(chipValue) {
    var _options$find;
    return (_options$find = options.find(function (option) {
      return (option === null || option === void 0 ? void 0 : option.value) == chipValue;
    })) === null || _options$find === void 0 ? void 0 : _options$find.label;
  }
  return /*#__PURE__*/React.createElement(material.Box, {
    className: classNames("GrtFormSelectChips", styles.GrtFormSelectChips)
  }, /*#__PURE__*/React.createElement(material.Typography, {
    variant: "body1",
    paragraph: true,
    className: classNames("GrtFormSelectChipsLabel", styles.GrtFormSelectChipsLabel)
  }, showSelectionsLabel), /*#__PURE__*/React.createElement(material.Box, null, _.isArray(value) && value.map(function (selection) {
    return /*#__PURE__*/React.createElement(material.Chip, {
      key: selection,
      onClick: onClick({
        value: selection
      }),
      onDelete: onClick({
        value: selection
      }),
      label: chipLabel(selection)
    });
  })));
};
SelectInputChips.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.array,
  options: PropTypes.array,
  showSelectionsLabel: PropTypes.node
};

var SelectInput = function SelectInput(props) {
  var id = props.id,
    name = props.name,
    label = props.label,
    options = props.options,
    _props$placeholder = props.placeholder,
    placeholder = _props$placeholder === void 0 ? "" : _props$placeholder,
    ariaLabel = props.ariaLabel,
    required = props.required,
    _props$multiple = props.multiple,
    multiple = _props$multiple === void 0 ? false : _props$multiple,
    _props$showSelections = props.showSelectionsLabel,
    showSelectionsLabel = _props$showSelections === void 0 ? "" : _props$showSelections;
  var formik$1 = formik.useFormikContext();
  var _useValidation = useValidation(),
    hasError = _useValidation.hasError;
  var value = formik$1.values[name];
  var isSelected = function isSelected(option) {
    return _.isArray(value) ? value.includes(option) : value == option;
  };
  var handleChange = function handleChange(option) {
    return function () {
      formik$1.setFieldValue(name, arrayToggle(value, option.value, !multiple));
    };
  };
  return /*#__PURE__*/React.createElement(FormField, null, /*#__PURE__*/React.createElement(material.FormControl, {
    variant: "standard",
    fullWidth: true,
    className: "GrtFormSelect-".concat(name),
    error: hasError(name)
  }, label && /*#__PURE__*/React.createElement(material.FormLabel, {
    id: "".concat(id, "-label"),
    "aria-label": ariaLabel
  }, /*#__PURE__*/React.createElement(Label, {
    name: name
  }, label)), /*#__PURE__*/React.createElement(material.Select, {
    value: value,
    IconComponent: ExpandMoreRoundedIcon,
    inputProps: {
      name: name,
      "aria-required": required
    },
    displayEmpty: true,
    autoFocus: true,
    multiple: multiple,
    labelId: "".concat(id, "-label")
  }, placeholder && /*#__PURE__*/React.createElement(material.MenuItem, {
    disabled: true,
    value: ""
  }, /*#__PURE__*/React.createElement(material.Typography, {
    variant: "fieldPlaceholder",
    component: "span"
  }, placeholder)), options.map(function (option) {
    return /*#__PURE__*/React.createElement(material.MenuItem, {
      key: option.value,
      value: option.value,
      selected: isSelected(option.value),
      onClick: handleChange(option),
      disableRipple: true
    }, /*#__PURE__*/React.createElement(material.Typography, {
      variant: "input"
    }, option.label));
  })), /*#__PURE__*/React.createElement(material.FormHelperText, null, /*#__PURE__*/React.createElement(HelperText, props))), /*#__PURE__*/React.createElement(SelectInputChips, {
    onClick: handleChange,
    value: value,
    options: options,
    showSelectionsLabel: multiple && showSelectionsLabel
  }));
};
SelectInput.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool
};

var _excluded$1 = ["name", "label", "id", "ariaLabel", "helperText", "className", "color", "min", "max"];
var Text = function Text(props) {
  var name = props.name,
    label = props.label,
    id = props.id,
    ariaLabel = props.ariaLabel;
    props.helperText;
    var className = props.className,
    _props$color = props.color,
    color = _props$color === void 0 ? "primary" : _props$color,
    min = props.min,
    max = props.max,
    rest = _objectWithoutProperties(props, _excluded$1);
  var _useTheme = material.useTheme(),
    typography = _useTheme.typography;
  var formik$1 = formik.useFormikContext();
  var _useValidation = useValidation(),
    hasError = _useValidation.hasError;
  return /*#__PURE__*/React.createElement(FormField, {
    className: className
  }, /*#__PURE__*/React.createElement(Label, {
    id: "".concat(id, "-label"),
    name: name,
    htmlFor: "".concat(id, "-input"),
    "aria-label": ariaLabel,
    component: "label",
    color: color
  }, label), /*#__PURE__*/React.createElement(material.TextField, _extends({
    id: "".concat(id, "-input"),
    name: name,
    value: formik$1.values[name],
    error: hasError(name),
    onChange: formik$1.handleChange,
    className: classNames("GrtFormText-".concat(name)),
    variant: "standard",
    fullWidth: true,
    helperText: /*#__PURE__*/React.createElement(HelperText, props),
    inputProps: {
      "aria-labelledby": "".concat(id, "-label"),
      minLength: min || undefined,
      maxLength: max || undefined
    },
    InputProps: {
      sx: typography.input,
      endAdornment: /*#__PURE__*/React.createElement(InputEndAdornment, props)
    }
  }, rest)));
};
Text.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  helperText: PropTypes.string,
  typography: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string
};

var _excluded = ["name", "label", "id", "ariaLabel", "helperText", "className", "color"];
function TextArea(props) {
  var name = props.name,
    label = props.label,
    id = props.id,
    ariaLabel = props.ariaLabel;
    props.helperText;
    var className = props.className,
    _props$color = props.color,
    color = _props$color === void 0 ? "primary" : _props$color,
    rest = _objectWithoutProperties(props, _excluded);
  var _useTheme = material.useTheme(),
    typography = _useTheme.typography;
  var formik$1 = formik.useFormikContext();
  var _useValidation = useValidation(),
    hasError = _useValidation.hasError;
  return /*#__PURE__*/React.createElement(FormField, {
    className: className
  }, /*#__PURE__*/React.createElement(Label, {
    id: "".concat(id, "-label"),
    name: name,
    htmlFor: "".concat(id, "-input"),
    "aria-label": ariaLabel,
    component: "label",
    color: color
  }, label), /*#__PURE__*/React.createElement(material.TextField, _extends({
    id: "".concat(id, "-input"),
    name: name,
    autoComplete: "off",
    value: formik$1.values[name],
    error: hasError(name),
    onChange: formik$1.handleChange,
    className: classNames("GrtFormTextArea-".concat(name)),
    variant: "standard",
    fullWidth: true,
    helperText: /*#__PURE__*/React.createElement(HelperText, props),
    inputProps: {
      "aria-labelledby": "".concat(id, "-label"),
      minLength: min || undefined,
      maxLength: max || undefined
    },
    InputProps: {
      sx: typography.input,
      endAdornment: /*#__PURE__*/React.createElement(InputEndAdornment, props)
    },
    rows: 5
  }, rest, {
    multiline: true
  })));
}
TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  helperText: PropTypes.string,
  typography: PropTypes.object,
  className: PropTypes.string,
  color: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  rows: PropTypes.number
};

exports.Checkboxes = Checkboxes;
exports.Consent = Consent;
exports.Phone = Phone;
exports.Radio = Radio;
exports.SelectInput = SelectInput;
exports.Text = Text;
exports.TextArea = TextArea;
//# sourceMappingURL=index.js.map
