  "use client";

  import React from "react";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Controller, useForm } from "react-hook-form";
  import { Button } from "@workspace/ui/components/button";
  import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
  } from "@workspace/ui/components/field";
  import { InputGroup } from "@workspace/ui/components/input-group";
  import { Input } from "@workspace/ui/components/input";
  import { useMutation } from "@tanstack/react-query";
  import { KeyRound, Loader2 } from "lucide-react";
  import { toast } from "sonner";
  import { redirect, useRouter, useSearchParams } from "next/navigation";
  import { authClient } from "@repo/auth/client";
  import { routes } from "@/lib/routes";

  export const ResetPasswordFormSchema = z.object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  });

  export function ResetPasswordForm({ className }: { className?: string }) {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
      redirect(routes.auth.login);
    }

    const router = useRouter();
    const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
      resolver: zodResolver(ResetPasswordFormSchema),
      defaultValues: {
        password: "",
      },
    });

    const { mutate: signIn, isPending } = useMutation({
      mutationFn: async (data: z.infer<typeof ResetPasswordFormSchema>) => {
        toast.loading("Resetting Password...", { id: "signin" });

        const { error } = await authClient.resetPassword({
          newPassword: data.password,
          token,
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
        toast.success("Successfully changed your password, please login", {
          id: "signin",
        });
        router.push(routes.auth.login);
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
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Password</FieldLabel>
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
              <KeyRound />
            )}
            Login
          </Button>
        </FieldGroup>
      </form>
    );
  }
