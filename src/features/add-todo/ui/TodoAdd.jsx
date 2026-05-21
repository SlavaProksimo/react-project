import { memo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { textSchema } from "@/shared/hooks/useSearchForm";
import useClickOutside from "@/shared/hooks/useClickOutside";
import FormInput from "@/shared/ui/Input/FormInput";
import clsx from "clsx";
import styles from "./TodoAdd.module.scss";

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
    // reset(); //  Очищаем форму
    close(); // Закрываем модалку
  };

  if (!open) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.overlay}></div>
        <div className={styles.todoAddBox} ref={modalRef}>
          <div className="todo-add__box">
            <h2 className={styles.todoAddTitle}>New Note</h2>
            <FormInput
              name="text"
              placeholder="Input your note..."
              className={clsx(styles.input, {
                [styles.inputError]: hasErrorTodoText,
              })}
            />

            {todoErrorMessage && (
              <div className={styles.TodoErrorMessage}>{todoErrorMessage}</div>
            )}
            <div className={styles.btnBox}>
              <button className={styles.btnLeft} type="button" onClick={close}>
                Cancel
              </button>
              <button className={styles.btnRight} type="submit">
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
