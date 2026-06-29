import "tsconfig-paths/register";
import "dotenv/config";
import { config } from "@/config/app.config";
import { connectDatabase } from "@/database/database";
import app from "@/app";

const PORT = process.env.PORT || config.PORT || 8001;

async function bootstrap() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();