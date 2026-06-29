import "tsconfig-paths/register";
import "dotenv/config";
import { config } from "@/config/app.config";
import { connectDatabase } from "@/database/database";
import app from "@/app";
// import AuthSessionModel from "./modules/auth/models/AuthSession.model";

const PORT = config.PORT || 8001;

async function bootstrap() {
  app.listen(PORT, async() => {
    await connectDatabase();
    console.log(`Server is running on port ${PORT}`);
  });
}


bootstrap();


