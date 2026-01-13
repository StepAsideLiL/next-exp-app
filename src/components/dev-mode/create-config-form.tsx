"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
// import type * as React from "react";
// import { toast } from "sonner";
import createConfigFile from "@/lib/actions/create-config-file";
import { formSchema, type TFormSchema } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

// const formSchema = z.object({
//   title: z.string().min(1, "Site title is required."),
//   description: z.string(),
//   url: z.string(),
//   authorName: z.string(),
//   authorUrl: z.string(),
// });

export default function CreateConfigForm({
  config,
}: {
  config: TFormSchema | null;
}) {
  const form = useForm({
    defaultValues: {
      title: config?.title || "",
      description: config?.description || "",
      url: config?.url || "",
      authorName: config?.authorName || "",
      authorUrl: config?.authorUrl || "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // toast("You submitted the following values:", {
      //   description: (
      //     <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
      //       <code>{JSON.stringify(value, null, 2)}</code>
      //     </pre>
      //   ),
      //   position: "bottom-right",
      //   classNames: {
      //     content: "flex flex-col gap-2",
      //   },
      //   style: {
      //     "--border-radius": "calc(var(--radius)  + 4px)",
      //   } as React.CSSProperties,
      // });

      await createConfigFile(value).then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="title"
          /** biome-ignore lint/correctness/noChildrenProp: <"allow"> */
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldDescription>
                    Title of the side. (tab title)
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
              </Field>
            );
          }}
        />

        <form.Field
          name="description"
          /** biome-ignore lint/correctness/noChildrenProp: <"allow"> */
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
              </Field>
            );
          }}
        />

        <form.Field
          name="url"
          /** biome-ignore lint/correctness/noChildrenProp: <"allow"> */
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Site URL</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
              </Field>
            );
          }}
        />

        <form.Field
          name="url"
          /** biome-ignore lint/correctness/noChildrenProp: <"allow"> */
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Site URL</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
              </Field>
            );
          }}
        />

        <form.Field
          name="authorName"
          /** biome-ignore lint/correctness/noChildrenProp: <"allow"> */
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Author Name</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
              </Field>
            );
          }}
        />

        <form.Field
          name="authorUrl"
          /** biome-ignore lint/correctness/noChildrenProp: <"allow"> */
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Author URL</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
              </Field>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          // biome-ignore lint/correctness/noChildrenProp: <"">
          children={([canSubmit, isSubmitting]) => (
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Submit"}
              </Button>
            </div>
          )}
        />
      </FieldGroup>
    </form>
  );
}
