"use client";

import React from "react";

import { authClient } from "@mc/auth/client";
import { Avatar, AvatarFallback } from "@mc/ui/components/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mc/ui/components/card";

import { getUserInitials } from "~/lib/getUserInitials";

const ProfileCard = () => {
  const { data: session } = authClient.useSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage Account Details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Avatar className="h-[100px] w-[100px] rounded-full">
            <AvatarFallback>
              {getUserInitials(session?.user.name ?? "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-muted-foreground text-sm">Full Name</h1>
            <h1>{session?.user.name}</h1>
            <div className="my-2" />
            <h1 className="text-muted-foreground text-sm">Role</h1>
            <h1>{"-"}</h1>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
