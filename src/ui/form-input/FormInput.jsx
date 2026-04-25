import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";

const FormInput = ({
  name = "text",
  placeholder = "Input...",
  className,
  onFocus,
  onBlur,
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
            onBlur={(e) => {
              field.onBlur();
              onBlur?.(e);
            }}
            onFocus={onFocus}
            placeholder={placeholder}
            className={clsx(className, {
              "input--error": hasError,
            })}
          />
        )}
      />
    </div>
  );
};

export default FormInput;
