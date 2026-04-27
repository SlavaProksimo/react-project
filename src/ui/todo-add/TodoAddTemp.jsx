import { memo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { textSchema } from "@/hooks/useSearchForm";
import useClickOutside from "@/hooks/useClickOutside";
import FormInput from "../form-input/FormInput";
import clsx from "clsx";

const TodoAdd = ({ close, onApply, open }) => {
  const methods = useForm({
    resolver: zodResolver(textSchema),
    defaultValues: { text: "" },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const hasErrorTodoText = !!errors.text;
  const todoErrorMessage = errors.text?.message;

  // кастомный хук
  const modalRef = useClickOutside(() => {
    if (open) {
      close();
    }
  });

  // Обработчик отправки формы
  const onSubmit = (data) => {
    if (!data.text || data.text.trim().length === 0) return;
    onApply(data.text);
    reset(); //  Очищаем форму
    close(); // Закрываем модалку
  };

  if (!open) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overlay"></div>
        <div className="todo-add__general-box" ref={modalRef}>
          <div className="todo-add__box">
            <h2 className="todo-add__title">New Note</h2>
            <FormInput
              name="text"
              placeholder="Input your note..."
              className={clsx("todo-add__input", {
                "todo-add__input--error": hasErrorTodoText,
              })}
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
                Apply
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default memo(TodoAdd);
