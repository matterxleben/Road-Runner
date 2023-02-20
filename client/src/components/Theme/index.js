import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
      type: 'light',
      background: {
        default: "#FFFFFF"
      },
      primary: {
        main: "#000000",
        contrastText: "#fff"
      },
      secondary: {
        main: "#999999",
      },
      alternateTextColor: "#FFFFFF"
    },
  });

export default theme;