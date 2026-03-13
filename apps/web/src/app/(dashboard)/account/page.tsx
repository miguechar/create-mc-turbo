import React from "react";

import DefaultMargins from "~/components/DefaultMargins";
import Header from "~/components/header";
import ProfileCard from "~/features/account/components/profileCard";
import { SessionTable } from "~/features/account/components/sessionTable";

const AccountPage = () => {
  return (
    <DefaultMargins>
      <Header title="Account" subtitle="Manage Account Details" />
      <div className="flex flex-col gap-3">
        <ProfileCard />
        <Header title="Session" subtitle="Active Sessions" />
        <SessionTable />
      </div>
    </DefaultMargins>
  );
};

export default AccountPage;
