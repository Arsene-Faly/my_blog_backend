import mongoose from "mongoose";
import { connectDatabase } from "@/database/database";

async function resetDatabase(): Promise<void> {

  try {

    await connectDatabase();
    console.log("🔄 Running database reset----------");

    await mongoose.connection.dropDatabase();

    console.log("✅ Database reset successfully----------");

  } catch (error) {

    console.error("❌Database reset failed", error);

  } finally {

    await mongoose.connection.close();

    process.exit(0);
  }
}

resetDatabase();