//style variables for the whole dash

export const screen = {
  xs: "320",
  sm: "500",
  md: "768",
  lg: "1200",
  xl: "1400",
  xxl: "1500",
};

export const fonts = {
  headerFont: '"DDIN"',
  contentFont: "TechnaSans",
};

export const darkThemeColors = {
  lightGrey: "#363636",
  grey: "#252525",
  darkGrey: "#212121",
  darkerGrey: "#1d1d1d",
  green: "#A2E7DB",
  orange: "#FFCD8D",
};

export const darkTheme = {
  style: {
    mainBorder: `0.2rem solid ${darkThemeColors.lightGrey}`,
    smallBorder: `0.1rem solid ${darkThemeColors.lightGrey}`,
    buttonBoxShadow: `0rem 0.2rem 0px ${darkThemeColors.lightGrey}`,
    buttonFontColor: `${darkThemeColors.lightGrey}`,
    panelBackground: "#000",
    panelBoxShadow: `0.2rem 0.2rem 0px ${darkThemeColors.lightGrey}`,
    panelTabBackground: `${darkThemeColors.green}`,
    panelTabBoxShadow: `0.2rem 0.2rem 0px ${darkThemeColors.lightGrey}`,
    panelTabLinkColor: `${darkThemeColors.lightGrey}`,
    wikiTabBackground: `${darkThemeColors.darkGrey}`,
    lightBackground: `${darkThemeColors.darkGrey}`,
    greenBackground: `${darkThemeColors.green}`,
    highlight: `${darkThemeColors.orange}`,
  },

  table: {
    tableBackground: "#000",
    tableHeadBackground: `${darkThemeColors.grey}`,
    tableItemBoxShadow: `0.3rem 0.3rem 0px ${darkThemeColors.lightGrey}`,
    tableRowBackground: `${darkThemeColors.darkerGrey}`,
  },
};
