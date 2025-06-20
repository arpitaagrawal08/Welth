import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";

// ⛔ Don't import individual functions here
// ✅ Do this instead:
import * as functions from "@/lib/inngest/functions"; // Eager import all!

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: Object.values(functions), // ✅ Register all functions
});
