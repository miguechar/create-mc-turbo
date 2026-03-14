"use server";

import { db } from "@mc/db/client";

export async function getUsers() {
    const users = await db.query.user.findMany();

    return users;
}