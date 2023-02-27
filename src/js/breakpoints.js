import Breakpoints from "breakpoints-js";

export const BREAKPOINT_LG = 980;

Breakpoints({
  sm: {
    min: 0,
    max: BREAKPOINT_LG - 1,
  },
  lg: {
    min: BREAKPOINT_LG,
    max: Infinity,
  },
});
