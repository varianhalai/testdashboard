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
  headerFont: 'Open Sans',
  contentFont: "Roboto",
};

export const darkThemeColors = {
  lightGrey: "#363636",
  grey: "#252525",
  darkGrey: "#212121",
  darkerGrey: "#1d1d1d",
  blue: "#42857D",
  orange: "#FFCD8D",
  black: "#000000",
};

export const darkTheme = {
  style: {
    mainBorder: `0.2rem solid ${darkThemeColors.lightGrey}`,
    smallBorder: `0.1rem solid ${darkThemeColors.lightGrey}`,
    buttonBoxShadow: `.35rem 0.2rem 0px ${darkThemeColors.lightGrey}`,
    buttonFontColor: `${darkThemeColors.orange}`,
    panelBackground: "#000",
    panelBoxShadow: `0.35rem 0.2rem 0px ${darkThemeColors.lightGrey}`,
    panelTabBackground: `${darkThemeColors.blue}`,
    panelTabBoxShadow: `0.35rem 0.35rem 0px ${darkThemeColors.lightGrey}`,
    panelTabLinkColor: `${darkThemeColors.lightGrey}`,
    wikiTabBackground: `${darkThemeColors.darkGrey}`,
    lightBackground: `${darkThemeColors.darkGrey}`,
    blueBackground: `${darkThemeColors.blue}`,
    highlight: `${darkThemeColors.orange}`,
    bodyBackground: `${darkThemeColors.black}`,
    primaryFontColor: "#fff",
    secondaryFontColor: `${darkThemeColors.black}`,
    linkColor: `${darkThemeColors.blue}`,
    headerColor: `${darkThemeColors.darkBlue}`,
    alertColor: `${darkThemeColors.blue}`,
    themeSwitchBackground: `${darkThemeColors.blueBackground}`
  },

  table: {
    tableBackground: "#000",
    tableHeadBackground: `${darkThemeColors.grey}`,
    tableItemBoxShadow: `0.35rem 0.35rem 0px ${darkThemeColors.lightGrey}`,
    tableRowBackground: `${darkThemeColors.darkerGrey}`,
  },
};

export const lightThemeColors = {
  offwhite: "#F5F1DE",
  blue: "#ABE4E2",
  darkBlue: "#A2E7DB",
  orange: "#FFCD8D",
  black: "#000",
};

export const lightTheme = {
  style: {
    mainBorder: `0.2rem solid ${lightThemeColors.black}`,
    smallBorder: `0.1rem solid ${lightThemeColors.black}`,
    buttonBoxShadow: `0rem 0.2rem 0px ${lightThemeColors.black}`,
    buttonFontColor: `${lightThemeColors.black}`,
    panelBackground: `${lightThemeColors.offwhite}`,
    panelBoxShadow: `0.35rem 0.2rem 0px ${lightThemeColors.black}`,
    panelTabBackground: `${lightThemeColors.darkBlue}`,
    panelTabBoxShadow: `0.35rem 0.35rem 0px ${lightThemeColors.black}`,
    panelTabLinkColor: `${lightThemeColors.black}`,
    wikiTabBackground: `${lightThemeColors.offwhite}`,
    lightBackground: `${lightThemeColors.offwhite}`,
    blueBackground: `${lightThemeColors.darkBlue}`,
    highlight: `${lightThemeColors.orange}`,
    bodyBackground: `${lightThemeColors.blue}`,
    primaryFontColor: `${lightThemeColors.black}`,
    secondaryFontColor: `${lightThemeColors.black}`,
    linkColor: `${lightThemeColors.black}`,
    headerColor: `${lightThemeColors.black}`,
    alertColor: `${darkThemeColors.blue}`,
    themeSwitchBackground: `${lightThemeColors.orange}`
  },

  table: {
    tableBackground: `${lightThemeColors.offwhite}`,
    tableHeadBackground: `${lightThemeColors.offwhite}`,
    tableItemBoxShadow: `0.3rem 0.3rem 0px ${lightThemeColors.black}`,
    tableRowBackground: `${lightThemeColors.offwhite}`,
  },
};
