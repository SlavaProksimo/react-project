import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { textSchema } from "@/hooks/useSearchForm";

export const FormContext = ({
  children,
  defaultValues = { text: "" },
  onSubmit,
}) => {
  const methods = useForm({
    resolver: zodResolver(textSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
