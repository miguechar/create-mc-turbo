"use client";

import React, { useState } from "react";
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
import { KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@mc/auth/client";
import Link from "next/link";
import { routes } from "~/lib/routes";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@mc/ui/components/input-otp";

export const LoginFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const TwoFactorSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

type LoginStep = "credentials" | "two-factor";

export function LoginForm({ className }: { className?: string }) {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>("credentials");
  const [code, setCode] = useState<string>("");

  const credentialsForm = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const twoFactorForm = useForm<z.infer<typeof TwoFactorSchema>>({
    resolver: zodResolver(TwoFactorSchema),
    defaultValues: { code: "" },
  });

  const { mutate: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: async (data: z.infer<typeof LoginFormSchema>) => {
      toast.loading("Signing in...", { id: "signin" });

      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (res.error) {
        throw new Error(res.error.message);
      }

      return res.data;
    },
    onError: (error) => {
      toast.error(error.message || "An Unknown Error Occurred", {
        id: "signin",
      });
    },
    onSuccess: (data) => {
      if ("twoFactorRedirect" in data) {
        setStep("two-factor");
        toast.info("Enter your 2FA code", { id: "signin" });
      } else {
        toast.success("Successfully signed in", { id: "signin" });
        router.push(routes.home.url);
      }
    },
  });

  const { mutate: verify2FA, isPending: isVerifying } = useMutation({
    mutationFn: async (code: string) => {
      toast.loading("Verifying code...", { id: "2fa" });

      const res = await authClient.twoFactor.verifyTotp({
        code,
      });

      if (res.error) {
        throw new Error(res.error.message);
      }

      return res.data;
    },
    onError: (error) => {
      toast.error(error.message || "Invalid code", { id: "2fa" });
      twoFactorForm.reset();
    },
    onSuccess: () => {
      toast.success("Successfully signed in", { id: "2fa" });
      router.push("/org/home");
    },
  });

  if (step === "two-factor") {
    return (
      <form
        onSubmit={twoFactorForm.handleSubmit((form) => verify2FA(form.code))}
        className={className}
      >
        <FieldGroup>
          <div className="mb-4 text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-2 text-lg font-semibold">
              Two-Factor Authentication
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <div className="flex w-full justify-center">
            <InputOTP
              id="disabled"
              maxLength={6}
              className="flex w-full"
              value={code}
              onChange={(e) => setCode(e)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button onClick={() => verify2FA(code)} disabled={isVerifying}>
            {isVerifying && <Loader2 className="h-4 w-4 animate-spin" />}
            Verify
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setStep("credentials");
              twoFactorForm.reset();
            }}
          >
            Back to login
          </Button>
        </FieldGroup>
      </form>
    );
  }

  return (
    <form
      onSubmit={credentialsForm.handleSubmit((form) => signIn(form))}
      className={className}
    >
      <FieldGroup>
        <Controller
          name="email"
          control={credentialsForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="example@example.com"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={credentialsForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href={routes.auth.forgotPassword.url}
                  className="text-sm hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                {...field}
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" disabled={isSigningIn}>
          {isSigningIn ? (
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