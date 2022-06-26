import { StylesConfig } from "react-select";
import chroma from "chroma-js";

const LabelSelectStyleConfig: StylesConfig<any, true> = {
  control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      // eslint-disable-next-line no-nested-ternary
      backgroundColor: isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.5).css()
        : undefined,
      // eslint-disable-next-line no-nested-ternary
      color: isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      ":active": {
        ...styles[":active"],
        backgroundColor: isSelected ? data.color : color.alpha(0.5).css(),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.5).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: chroma.contrast(data.color, "white") > 2 ? "white" : "black",
    },
  }),
};

export default LabelSelectStyleConfig;

export const LabelSelectFilterStyleConfig: StylesConfig<any, true> = {
  control: (styles: any) => ({ ...styles, backgroundColor: "black" }),
  menu: (styles: any) => ({ ...styles, backgroundColor: "black" }),
  option: (styles, { data, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      // eslint-disable-next-line no-nested-ternary
      backgroundColor: isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.5).css()
        : undefined,
      // eslint-disable-next-line no-nested-ternary
      color: isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      ":active": {
        ...styles[":active"],
        backgroundColor: isSelected ? data.color : color.alpha(0.5).css(),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.5).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: chroma.contrast(data.color, "white") > 2 ? "white" : "black",
    },
  }),
};
