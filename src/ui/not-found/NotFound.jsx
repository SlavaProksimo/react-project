import { ThemeContext } from "@/context/ThemeProvider";
import { memo, useContext } from "react";

const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="not-found">
      <div className="not-found__img">
        {theme ? (
          <img src="src\assets\not-found-dark.png" alt="not found" />
        ) : (
          <img src="src\assets\not-found.png" alt="not found" />
        )}
      </div>
      <h2 className={styles.notFoundText}>Empty...</h2>
    </div>
  );
};
export default memo(NotFound);
