import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";
import styles from "./FormInput.module.scss";
const FormInput = ({
  name = "text",
  placeholder = "Input...",
  className,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const hasError = !!errors[name];
  const errorMessage = errors[name]?.message;

  return (
    <div className="form-input-wrapper">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            {...restProps}
            onBlur={(e) => {
              field.onBlur();
              onBlur?.(e);
            }}
            onFocus={onFocus}
            placeholder={placeholder}
            className={clsx(styles.input, className, {
              [styles.inputError]: hasError,
            })}
          />
        )}
      />
    </div>
  );
};

export default FormInput;
