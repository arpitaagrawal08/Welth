import { seedTransactions } from "@/actions/seed";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response("Seeding is disabled in production", { status: 403 });
  }

  try {
    const result = await seedTransactions();
    return Response.json(result);
  } catch (error) {
    return new Response("Error seeding database", { status: 500 });
  }
}