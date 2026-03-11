import { memo, useCallback } from "react";
const TodoAdd = ({
  close,
  newTaskTitle,
  setNewTaskTitle,
  onApply,
  inputRef,
}) => {
  const handleMouseDown = useCallback((e) => {
    e.stopPropagation();
  }, []);
  const handleChange = useCallback(
    (e) => {
      setNewTaskTitle(e.target.value);
    },
    [setNewTaskTitle],
  );
  return (
    <>
      <div className="overlay"></div>
      <div className="todo-add__general-box" onMouseDown={handleMouseDown}>
        <div className="todo-add__box">
          <h2 className="todo-add__title">New Note</h2>
          <input
            className="todo-add__input"
            placeholder="Input your note..."
            value={newTaskTitle}
            onInput={handleChange}
            ref={inputRef}
          />
          <div className="todo-add__btn-box">
            <button
              className="todo-add__btn btn-left"
              type="button"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="todo-add__btn btn-right"
              type="button"
              onClick={onApply}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(TodoAdd);
