const Select = () => {
  const onChangekSelect = (event) => {
    console.log(event.target.value);
  };
  return (
    <select name="todo-filter" onChange={onChangekSelect}>
      <option>All</option>
      <option>Complete</option>
      <option>Incomplete</option>
    </select>
  );
};
export default Select;
