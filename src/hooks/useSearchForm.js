import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Переиспользуемые базовые правила
const baseTextRules = {
  // проверяем на пробелы
  notOnlySpaces: (val) => val.trim().length > 0,
  // на спецсимволы
  noSpecialChars: (val) => !/[<>@#$%^&*()_+=[\]{};:'"\\|,./?`~]/.test(val),
};
// схема для задачи
export const textSchema = z.object({
  text: z
    .string()
    .min(1, "Поле не может быть пустым")
    .max(20, "Максимум 20 символов")
    .refine(baseTextRules.notOnlySpaces, {
      message: "Поле не может содержать только пробелы",
    })
    .refine(baseTextRules.noSpecialChars, {
      message: "Нельзя использовать спецсимволы: < > @ # $ % & и другие",
    }),
});
// Схема для поиска
export const searchSchema = z.object({
  text: z
    .string()
    .max(20, "Максимум 20 символов")
    .refine(
      (val) => {
        // Если поле пустое 	- это ок
        if (!val || val.length === 0) return true;
        // Если есть пробелы - ошибка
        if (val.trim().length === 0) return false;
        return true;
      },
      {
        message: "Поле не может содержать только пробелы",
      },
    )
    .refine(
      (val) => {
        // Если поле пустое - это ок
        if (!val || val.length === 0) return true;
        return baseTextRules.noSpecialChars(val);
      },
      {
        message: "Нельзя использовать спецсимволы для поиска",
      },
    ),
});

// хук для формы задачи
export const useTextForm = (defaultValues = { text: "" }) => {
  const form = useForm({
    resolver: zodResolver(textSchema),
    defaultValues,
    mode: "onChange",
  });

  return form;
};
// хук для формы поиска
export const useSearchForm = (defaultValues = { text: "" }) => {
  return useForm({
    resolver: zodResolver(searchSchema),
    defaultValues,
    mode: "onChange",
  });
};
