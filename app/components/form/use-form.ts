import { type FieldValues } from "react-hook-form";
import { type UseRemixFormOptions, useRemixForm } from "remix-hook-form";

export const useForm = <TFieldValues extends FieldValues = FieldValues>(
  options: UseRemixFormOptions<TFieldValues>,
) => useRemixForm(options);
