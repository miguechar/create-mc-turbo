import React from "react";
import Link from "next/link";

import SignUpForm from "~/features/auth/components/signupForm";
import { routes } from "~/lib/routes";

const SignupPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create your account
        </p>
      </div>
      <SignUpForm className="mb-3" />
      <div className="flex flex-col gap-3">
        <span className="flex w-full items-center justify-center gap-1 text-sm">
          {"Already have an account? "}
          <Link href={routes.auth.login.url} className="hover:underline">
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
