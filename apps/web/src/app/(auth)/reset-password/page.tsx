import React, { Suspense } from "react";

import { ResetPasswordForm } from "~/features/auth/components/resetPasswordForm";

export const metadata = {
  title: `Reset Password | ${process.env.APP_NAME}`,
  description: `Reset Password`,
};

const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">{"Reset Password"}</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {"Enter a new password below to reset your account"}
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm className="mb-3" />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
