import { toNextJsHandler } from "@mc/auth/next-js";

import { auth } from "~/lib/auth";

export const { POST, GET } = toNextJsHandler(auth);
