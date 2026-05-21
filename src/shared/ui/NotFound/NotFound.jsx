import { ThemeContext } from "@/app/providers/ThemeProvider";
import { memo, useContext } from "react";
import styles from "./NotFound.module.scss";
import notFoundLight from "@/assets/not-found.png";
import notFoundDark from "@/assets/not-found-dark.png";

const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="not-found">
      <div className={styles.notFoundImg}>
        {theme ? (
          <img src={notFoundDark} alt="not found" />
        ) : (
          <img src={notFoundLight} alt="not found" />
        )}
      </div>
      <h2 className={styles.notFoundText}>Empty...</h2>
    </div>
  );
};
export default memo(NotFound);
