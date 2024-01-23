import React from "react";
import { RemixFormProvider, useRemixFormContext } from "remix-hook-form";
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type ControllerProps,
} from "react-hook-form";

import { FieldError, type FieldErrorProps } from "~/components/field-error";
import { Label, type LabelProps } from "~/components/label";
import { Input, type InputProps } from "~/components/input";
import { TextField, type TextFieldProps } from "~/components/text-field";

export const Form = RemixFormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  if (!fieldContext) {
    throw new Error("useFormField must be consumed within <FormController>");
  }
  const { getFieldState, formState } = useRemixFormContext();
  return getFieldState(fieldContext.name, formState);
};

type FormFieldControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "control" | "name"> &
  Required<Pick<ControllerProps<TFieldValues, TName>, "control" | "name">>;

export const FormFieldController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormFieldControllerProps<TFieldValues, TName>,
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

type FormErrorProps = {} & FieldErrorProps;
export const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ children, ...props }, ref) => {
    const { error } = useFormField();
    const message = error ? String(error?.message) : children;
    return message ? (
      <FieldError ref={ref} {...props}>
        {message}
      </FieldError>
    ) : null;
  },
);
FormError.displayName = "FormError";

type FormLabelProps = {} & LabelProps;
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => {
    return <Label ref={ref} {...props} />;
  },
);
FormLabel.displayName = "FormLabel";

type FormInputProps = {} & InputProps;
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    return <Input ref={ref} {...props} />;
  },
);
FormInput.displayName = "FormInput";

type FormTextFieldProps = {} & TextFieldProps;
export const FormTextField = React.forwardRef<
  HTMLDivElement,
  FormTextFieldProps
>(({ validationBehavior = "aria", ...props }, ref) => {
  return (
    <TextField ref={ref} validationBehavior={validationBehavior} {...props} />
  );
});
FormTextField.displayName = "FormTextField";
