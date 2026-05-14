import HomePage from "@/pages/HomePage";
import { ThemeProvider } from "./providers/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
