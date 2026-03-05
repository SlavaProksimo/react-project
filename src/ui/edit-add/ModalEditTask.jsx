const ModalEditTask = ({ close, newTaskTitle, setNewTaskTitle, onApply }) => {
  return (
    <>
      <div className="overlay"></div>
      <div
        className="todo-add__general-box"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="todo-add__box">
          <h2 className="todo-add__title">Edit Note</h2>
          <input
            className="todo-add__input"
            placeholder="Edit your note..."
            value={newTaskTitle}
            onInput={(event) => setNewTaskTitle(event.target.value)}
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
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditTask;
