import { memo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { textSchema } from "@/shared/hooks/useSearchForm";
import useClickOutside from "@/shared/hooks/useClickOutside";
import FormInput from "@/shared/ui/Input/FormInput";
import clsx from "clsx";
import styles from "./TodoAdd.module.scss";

const TodoAdd = ({ close, onApply, open }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const methods = useForm({
    resolver: zodResolver(textSchema),
    defaultValues: { text: "" },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const hasErrorTodoText = !!errors.text;
  const todoErrorMessage = errors.text?.message;

  // кастомный хук
  const modalRef = useClickOutside(() => {
    if (open && !isSubmitting) {
      close();
    }
  });

  // Обработчик отправки формы
  const onSubmit = async (data) => {
    if (!data.text || data.text.trim().length === 0) return;
    setIsSubmitting(true);
    setError(null);

    try {
      await onApply(data.text.trim());
      reset();
      close();
    } catch (error) {
      setError(error.message || "Ошибка при добавлении задачи");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!open) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.overlay} aria-hidden="true"></div>
        <div
          className={styles.todoAddBox}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
        >
          <div className="todo-add__box">
            <h2 className={styles.todoAddTitle}>New Note</h2>
            <FormInput
              aria-label="Текст новой заметки"
              autoFocus
              name="text"
              placeholder="Input your note..."
              disabled={isSubmitting}
              className={clsx(styles.input, {
                [styles.inputError]: hasErrorTodoText,
              })}
            />

            {todoErrorMessage && (
              <div className={styles.TodoErrorMessage} role="alert">
                {todoErrorMessage}
              </div>
            )}
            <div className={styles.btnBox}>
              <button
                className={styles.btnLeft}
                type="button"
                onClick={close}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className={styles.btnRight}
                type="submit"
                disabled={isSubmitting}
              >
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
