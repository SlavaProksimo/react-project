import HomePage from "./pages/home/HomePage";
import { ThemeProvider } from "./context/themeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
