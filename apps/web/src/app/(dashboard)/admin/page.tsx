import React from "react";

import DefaultMargins from "~/components/DefaultMargins";
import Header from "~/components/header";
import { UsersTable } from "~/features/admin/components/usersTable";

export const metadata = {
  title: `${process.env.APP_NAME} | Admin`,
  description: "Admin page",
};

const AdminPage = () => {
  return (
    <DefaultMargins>
      <Header title="Admin" subtitle="Manage Admins" />
      <UsersTable />
    </DefaultMargins>
  );
};

export default AdminPage;
