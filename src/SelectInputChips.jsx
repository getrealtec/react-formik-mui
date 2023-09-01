import React from "react";
import PropTypes from "prop-types";
import { isArray } from "lodash";
import { Box, Chip, Typography } from "@mui/material";
import classNames from "classnames";
import styles from "./Input.module.scss";

const SelectInputChips = (props) => {
  const {
    onClick,
    value = [],
    options = [],
    showSelectionsLabel = null,
  } = props;

  if (!showSelectionsLabel) {
    return;
  }

  function chipLabel(chipValue) {
    return options.find((option) => option?.value == chipValue)?.label;
  }

  return (
    <Box
      className={classNames("GrtFormSelectChips", styles.GrtFormSelectChips)}
    >
      <Typography
        variant={"body1"}
        paragraph
        className={classNames(
          "GrtFormSelectChipsLabel",
          styles.GrtFormSelectChipsLabel,
        )}
      >
        {showSelectionsLabel}
      </Typography>
      <Box>
        {isArray(value) &&
          value.map((selection) => (
            <Chip
              key={selection}
              onClick={onClick({ value: selection })}
              onDelete={onClick({ value: selection })}
              label={chipLabel(selection)}
            />
          ))}
      </Box>
    </Box>
  );
};

SelectInputChips.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.array,
  options: PropTypes.array,
  showSelectionsLabel: PropTypes.node,
};

export default SelectInputChips;
