import { memo } from "react";

memo;
const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__img">
        <img src="src\assets\not-found.png" alt="not found" />
      </div>
      <h2 className="not-found__text">Empty...</h2>
    </div>
  );
};
export default memo(NotFound);
