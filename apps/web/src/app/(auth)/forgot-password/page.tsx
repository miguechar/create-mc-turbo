import React from "react";
import Link from "next/link";

import { ForgotPasswordForm } from "~/features/auth/components/forgotPasswordForm";
import { routes } from "~/lib/routes";

export const metadata = {
  title: `Reset Password | ${process.env.APP_NAME}`,
  description: `Reset Password`,
};

const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">{"Forgot Password?"}</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {"Don't worry, we'll send you a link to reset your password"}
        </p>
      </div>
      <ForgotPasswordForm className="mb-3" />
      <div className="flex flex-col gap-3">
        <span className="flex w-full items-center justify-center gap-1 text-sm">
          {"Remembered your password? "}
          <Link href={routes.auth.login.url} className="hover:underline">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
