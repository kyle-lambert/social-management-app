import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form as RemixForm } from "@remix-run/react";

import { type ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";

import {
  Form,
  FormError,
  FormFieldController,
  FormInput,
  FormLabel,
  FormTextField,
  useForm,
} from "~/components/form";
import { Input } from "~/components/input";
import { Avatar } from "~/components/avatar";
import { Button } from "~/components/button";
import { WorkspaceDropdown } from "~/components/workspace-dropdown";

const userSchema = z.object({
  fullName: z.string().min(1),
  emailAddress: z.string().email().min(1),
});
type UserSchema = z.infer<typeof userSchema>;

const userSchemaResolver = zodResolver(userSchema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<UserSchema>(request, userSchemaResolver);

  console.log({ errors, data, defaultValues });

  if (errors) {
    return json({ errors });
  }

  return json(data);
};

export default function () {
  const form = useForm<UserSchema>({
    defaultValues: {
      fullName: "",
    },
    mode: "all",
    submitConfig: {
      method: "post",
    },
    resolver: userSchemaResolver,
  });

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-start gap-8">
        <Input size="sm" />
        <Input size="md" />
        <Input size="lg" placeholder="This is a placeholder..." />
      </div>
      <div className="flex items-start gap-8">
        <Input size="md" />
        <Input size="md" />
        <Input size="md" disabled />
      </div>
      <div className="flex items-start gap-8">
        <Input size="md" appearance="invalid" />
        <Input size="md" appearance="valid" />
      </div>
      <div className="flex items-start  gap-8">
        <Avatar size="sm">KL</Avatar>
        <Avatar size="md">KL</Avatar>
        <Avatar size="lg">KL</Avatar>
      </div>
      <div className="grid grid-cols-3">
        <Form {...form}>
          <RemixForm onSubmit={form.handleSubmit}>
            <div className="space-y-4">
              <FormFieldController
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <FormTextField
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    isInvalid={fieldState.invalid}
                  >
                    <FormLabel>Full name</FormLabel>
                    <FormInput ref={field.ref} />
                    <FormError />
                  </FormTextField>
                )}
              />
              <FormFieldController
                control={form.control}
                name="emailAddress"
                render={({ field, fieldState }) => (
                  <FormTextField
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    isInvalid={fieldState.invalid}
                  >
                    <FormLabel>Email Address</FormLabel>
                    <FormInput ref={field.ref} />
                    <FormError />
                  </FormTextField>
                )}
              />
            </div>
          </RemixForm>
        </Form>
      </div>
      <div className="flex items-start  gap-8">
        <WorkspaceDropdown
          workspaces={[
            { id: "w1", name: "Workspace 1" },
            { id: "w2", name: "Workspace 2" },
            { id: "w3", name: "Workspace 3" },
          ]}
        />
        <WorkspaceDropdown
          workspaces={[
            { id: "w1", name: "Workspace 1" },
            { id: "w2", name: "Workspace 2" },
            { id: "w3", name: "Workspace 3" },
          ]}
        />
        <WorkspaceDropdown
          workspaces={[
            { id: "w1", name: "Workspace 1" },
            { id: "w2", name: "Workspace 2" },
            { id: "w3", name: "Workspace 3" },
          ]}
        />
      </div>
      <div className="flex items-start gap-8">
        <Button iconEndName="Settings" size="sm" appearance="primary">
          Button primary
        </Button>
        <Button iconStartName="Check" size="md" appearance="primary">
          Button primary
        </Button>
        <Button size="lg" appearance="primary">
          Button primary
        </Button>
        <Button size="lg" appearance="primary">
          Button primary
        </Button>
      </div>
      <div className="flex items-start  gap-8">
        <Button size="sm" appearance="secondary">
          Button secondary
        </Button>
        <Button size="md" appearance="secondary">
          Button secondary
        </Button>
        <Button
          iconEndName="ChevronDoubleDown"
          size="lg"
          appearance="secondary"
        >
          Button secondary
        </Button>
        <Button size="lg" appearance="secondary">
          Button secondary
        </Button>
      </div>
      <div className="flex items-start  gap-8">
        <Button size="sm" iconStartName="SettingsAlt" appearance="tertiary">
          Button tertiary
        </Button>
        <Button isLoading size="md" appearance="tertiary">
          Button tertiary
        </Button>
        <Button size="lg" appearance="tertiary" iconStartName="SettingsAlt">
          Button tertiary
        </Button>
        <Button size="lg" appearance="tertiary">
          Button tertiary
        </Button>
      </div>
      <div className="flex items-start  gap-8">
        <Button size="sm" iconStartName="SettingsAlt" appearance="outline">
          Button outline
        </Button>
        <Button isLoading size="md" appearance="outline">
          Button outline
        </Button>
        <Button size="lg" appearance="outline" iconStartName="SettingsAlt">
          Button outline
        </Button>
        <Button size="lg" appearance="outline">
          Button outline
        </Button>
      </div>
      <div className="flex items-start  gap-8">
        <Button iconStartName="Search" size="lg" appearance="invalid">
          Button error
        </Button>
        <Button iconStartName="Search" size="lg" appearance="valid">
          Button success
        </Button>
      </div>
    </div>
  );
}
