"use client";

import { EllipsisVertical, UserCircle } from "lucide-react";

import { authClient } from "@mc/auth/client";
import { Badge } from "@mc/ui/components/badge";
import { Button } from "@mc/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@mc/ui/components/dropdown-menu";
import { Skeleton } from "@mc/ui/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mc/ui/components/table";

import { useGetUsersQuery } from "~/data/admin/useGetUsersQuery";

export function UsersTable() {
  const { data: users, isLoading } = useGetUsersQuery();

  async function setUserRole(userId: string, role: "admin" | "user") {
    const { data, error } = await authClient.admin.setRole({
      userId,
      role,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table className="bg-card rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Banned</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((users) => (
              <TableRow key={users.id}>
                <TableCell className="text-muted-foreground">
                  {users.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {users.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {users.role}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {users.banned ? "Banned" : "Not Banned"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(users.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-muted-foreground text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size={"icon"} variant={"ghost"}>
                        <EllipsisVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>
                          <div className="flex items-center gap-3">
                            <UserCircle className="h-4 w-4" />
                            {users.name}
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
