import React from "react";

import { Avatar, AvatarFallback } from "@mc/ui/components/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mc/ui/components/card";

const ProfileCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage Account Details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Avatar className="h-[100px] w-[100px] rounded-full">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-muted-foreground text-sm">Full Name</h1>
            <h1>Miguel Charry</h1>
            <div className="my-2" />
            <h1 className="text-muted-foreground text-sm">Role</h1>
            <h1>Admin</h1>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
