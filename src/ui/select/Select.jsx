import { memo, useCallback } from "react";
const Select = ({ setFilter }) => {
  const onChangekSelect = useCallback(
    (event) => {
      setFilter(event.target.value);
    },
    [setFilter],
  );

  return (
    <select name="todo-filter" onChange={onChangekSelect}>
      <option value="All">All</option>
      <option value="Complete">Complete</option>
      <option value="Incomplete">Incomplete</option>
    </select>
  );
};
export default memo(Select);
