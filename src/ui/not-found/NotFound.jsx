import { ThemeContext } from "@/context/ThemeProvider";
import { memo, useContext } from "react";
import darkImg from "@/assets/not-found-dark.png";
import lightImg from "@/assets/not-found.png";
const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="not-found">
      <div className="not-found__img">
        <img src={theme ? darkImg : lightImg} alt="not found" />
      </div>
      <h2 className="not-found__text">Empty...</h2>
    </div>
  );
};
export default memo(NotFound);
