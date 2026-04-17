import useClickOutside from "@/hooks/useClickOutside";
import { useTextForm } from "@/hooks/useSearchForm";
import clsx from "clsx";

const ModalEditTask = ({ close, onApply, open, initialValue }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useTextForm({ text: initialValue || "" });

  const hasErrorTodoText = !!errors["text"];
  const todoErrorMessage = errors["text"]?.message;
  //Кастомный хук для закрытия модалки
  const modalRef = useClickOutside(() => {
    if (open) {
      close();
    }
  });

  // Обработчик отправки формы
  const onSubmit = (data) => {
    if (data?.text?.trim()?.length === 0) {
      return;
    }
    onApply(data.text);
    reset(); // Очищаем форму после добавления
    close(); // Закрываем модалку
  };

  if (!open) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overlay"></div>
      <div className="todo-add__general-box" ref={modalRef}>
        <div className="todo-add__box">
          <h2 className="todo-add__title">Edit Note</h2>
          <input
            autoFocus={open}
            className={clsx({
              "todo-add__input": true,
              "todo-add__input--error": hasErrorTodoText,
            })}
            placeholder="Edit your note..."
            {...register("text")}
          />
          {todoErrorMessage && (
            <div className="error-message todo__error-message">
              {todoErrorMessage}
            </div>
          )}
          <div className="todo-add__btn-box">
            <button
              className="todo-add__btn btn-left"
              type="button"
              onClick={close}
            >
              Cancel
            </button>

            <button className="todo-add__btn btn-right" type="submit">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditTask;
