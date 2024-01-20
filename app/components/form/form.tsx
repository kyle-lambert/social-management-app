import React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  RemixFormProvider,
  useRemixFormContext,
  useRemixForm,
  type UseRemixFormOptions,
} from "remix-hook-form";

import { cn } from "~/lib/utils/cn";
import { Input, type InputProps } from "~/components";

// Form
const Form = RemixFormProvider;

// FormField
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "control" | "name"> &
  Required<Pick<ControllerProps<TFieldValues, TName>, "control" | "name">>;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormFieldProps<TFieldValues, TName>,
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// FormItem
type FormItemContextValue = {
  id: string;
};
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

type FormItemProps = {} & React.HTMLAttributes<HTMLDivElement>;
const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn("flex flex-col gap-1.5", className)}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

// useFormField
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  if (!fieldContext) {
    throw new Error("useFormField must be used within <Form.Field>");
  }
  if (!itemContext) {
    throw new Error("useFormField must be used within <Form.Item>");
  }

  const { getFieldState, formState } = useRemixFormContext();

  const { id } = itemContext;
  const { name } = fieldContext;

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formErrorId: `${id}-form-error`,
    ...getFieldState(name, formState),
  };
};

// useForm
const useForm = <TFieldValues extends FieldValues = FieldValues>(
  options: UseRemixFormOptions<TFieldValues>,
) => useRemixForm(options);

// FormLabel
type FormLabelProps = {} & React.LabelHTMLAttributes<HTMLLabelElement>;
const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    const { formItemId } = useFormField();
    return (
      <label
        ref={ref}
        htmlFor={formItemId}
        className={cn("text-sm font-medium text-gray-800", className)}
        {...props}
      />
    );
  },
);
FormLabel.displayName = "FormLabel";

// FormError
type FormErrorProps = {} & React.HTMLAttributes<HTMLParagraphElement>;
const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, children, ...props }, ref) => {
    const { error, formErrorId } = useFormField();
    const messageBody = error ? String(error?.message) : children;

    return messageBody ? (
      <p
        ref={ref}
        id={formErrorId}
        className={cn("text-xs text-red-700", className)}
        {...props}
      >
        {messageBody}
      </p>
    ) : null;
  },
);
FormError.displayName = "FormError";

// FormInput
type FormInputProps = InputProps;
const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ ...props }, ref) => {
    const { error, formItemId, formErrorId } = useFormField();
    // const appearance = error ? "invalid" : "valid";
    return (
      <Input
        ref={ref}
        id={formItemId}
        // appearance={appearance}
        aria-describedby={error ? formErrorId : undefined}
        aria-invalid={Boolean(error)}
        {...props}
      />
    );
  },
);
FormInput.displayName = "FormInput";

export { Form, FormField, FormItem, FormLabel, FormInput, FormError };
export { useForm };
