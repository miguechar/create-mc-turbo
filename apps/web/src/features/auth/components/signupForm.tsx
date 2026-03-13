"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mc/ui/components/button";
import { Input } from "@mc/ui/components/input";
import { useMutation } from "@tanstack/react-query";
import { DiamondPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@mc/auth/client";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@mc/ui/components/field";
import { InputGroup } from "@mc/ui/components/input-group";

export const SignUpFormSchema = z
  .object({
    full_name: z.string().min(3, {
      message: "Full name must be at least 3 characters long",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z
      .string({
        message: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters long",
      }),
    confirmPassword: z
      .string({
        message: "Confirm Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUpForm = ({ className }: { className?: string }) => {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      confirmPassword: "",
    },
  });

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof SignUpFormSchema>) => {
      toast.loading("Signing up...", { id: "signup" });

      const { data: betterAuthData, error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.full_name,
        callbackURL: `/login`,
      });

      console.log("There was an error signing up!", error)

      if (error) {
        toast.error(error.message, { id: "signup" });
        throw new Error(error.message);
      }

      return betterAuthData;
    },
    onError: (error) => {
      toast.error(error.message, { id: "signup" });
    },
    onSuccess: (data) => {
      toast.success(
        "Successfully signed up!, please check your inbox and verify your email",
        { id: "signup" },
      );
    },
  });

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit((form) => signUp(form))}
      className={className}
    >
      <FieldGroup>
        <Controller
          name="full_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Name</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Jane Doe"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
                placeholder="janeDoe@example.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="form-rhf-demo-title">Password</FieldLabel>
              </div>
              <InputGroup>
                <Input
                  {...field}
                  type="password"
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••"
                  autoComplete="off"
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="form-rhf-demo-title">
                  Confirm Password
                </FieldLabel>
              </div>
              <InputGroup>
                <Input
                  {...field}
                  type="password"
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••"
                  autoComplete="off"
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <DiamondPlus />
          )}
          {"Create Account"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default SignUpForm;