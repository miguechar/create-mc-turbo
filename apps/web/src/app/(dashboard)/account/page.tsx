import React from "react";
import Link from "next/link";
import { PlusCircle, UserPlus } from "lucide-react";

import { Button } from "@mc/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@mc/ui/components/empty";

import DefaultMargins from "~/components/DefaultMargins";
import Header from "~/components/header";
import ProfileCard from "~/features/account/components/profileCard";
import { SessionTable } from "~/features/account/components/sessionTable";
import { getSession } from "~/lib/auth";
import { routes } from "~/lib/routes";

const AccountPage = async () => {
  const session = await getSession();

  return (
    <DefaultMargins>
      <Header title="Account" subtitle="Manage Account Details" />
      {session ? (
        <div className="flex flex-col gap-3">
          <ProfileCard />
          <Header title="Session" subtitle="Active Sessions" />
          <SessionTable />
        </div>
      ) : (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UserPlus />
            </EmptyMedia>
            <EmptyTitle>No Active Session</EmptyTitle>
            <EmptyDescription>
              {"You don't appear to have signed in to any account. Create an accont to get started."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href={routes.auth.signup.url}>
              <Button variant="outline" size="sm">
                <PlusCircle />
                Create Account
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      )}
    </DefaultMargins>
  );
};

export default AccountPage;
