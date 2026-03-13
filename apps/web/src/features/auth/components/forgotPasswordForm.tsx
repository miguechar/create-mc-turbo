"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mc/ui/components/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@mc/ui/components/field";
import { Input } from "@mc/ui/components/input";
import { useMutation } from "@tanstack/react-query";
import { Loader2, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@mc/auth/client";
import { routes } from "~/lib/routes";
import { useRouter } from "next/navigation";

export const ForgotPasswordReset = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export function ForgotPasswordForm({ className }: { className?: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof ForgotPasswordReset>>({
    resolver: zodResolver(ForgotPasswordReset),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof ForgotPasswordReset>) => {
      toast.loading("Sending password reset email...", { id: "signin" });

      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/${routes.auth.resetPassword.url}`,
      });

      if (error) {
        throw new Error(error.message);
      }
      return;
    },
    onError: (error) => {
      toast.error(error.message || "An Unknown Error Occurred", {
        id: "signin",
      });
    },
    onSuccess: () => {
      toast.success("If an account exists, you will receive an email", {
        id: "signin",
      });
      router.push("/");
    },
  });

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit((form) => signIn(form))}
      className={className}
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="example@example.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw />
          )}
          Update Password
        </Button>
      </FieldGroup>
    </form>
  );
}
