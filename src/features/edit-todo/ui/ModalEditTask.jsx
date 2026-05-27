import { useEffect, useState } from "react";
import useClickOutside from "@/shared/hooks/useClickOutside";
import FormInput from "@/shared/ui/Input/FormInput";
import { useForm, FormProvider } from "react-hook-form";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { textSchema } from "@/shared/hooks/useSearchForm";
import styles from "./EditAdd.module.scss";

const ModalEditTask = ({ close, onApply, open, initialValue }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const methods = useForm({
    resolver: zodResolver(textSchema),
    defaultValues: { text: "" },
    mode: "onChange",
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = methods;
  // для установки значения при открытии редактора
  useEffect(() => {
    if (open && initialValue) {
      setValue("text", initialValue);
      setError(null);
    }
  }, [open, initialValue, setValue]);

  const hasErrorTodoText = !!errors["text"];
  const todoErrorMessage = errors["text"]?.message;

  //Кастомный хук для закрытия модалки
  const modalRef = useClickOutside(() => {
    if (open && !isSubmitting) {
      close();
    }
  });

  // Обработчик отправки формы
  const onSubmit = async (data) => {
    if (data?.text?.trim()?.length === 0) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onApply(data.text.trim());
      reset();
      close();
    } catch (error) {
      setError(err.message || "Ошибка при редактировании задачи");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.overlay}></div>
        <div className={styles.todoAddBox} ref={modalRef}>
          <div className="todo-add__box">
            <h2 className={styles.todoAddTitle}>Edit Note</h2>
            <FormInput
              disabled={isSubmitting}
              autoFocus
              name="text"
              className={clsx(styles.input, {
                [styles.inputError]: hasErrorTodoText,
              })}
              placeholder="Edit your note..."
            />
            {todoErrorMessage && (
              <div className={styles.TodoErrorMessage}>{todoErrorMessage}</div>
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
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ModalEditTask;
