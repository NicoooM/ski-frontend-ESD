import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./app/layouts/MainLayout";
import MainRouter from "./app/routers/MainRouter";

const primaryTheme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={primaryTheme}>
      <BrowserRouter>
        <MainLayout>
          <MainRouter />
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
