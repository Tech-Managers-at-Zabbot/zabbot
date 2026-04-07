import "dotenv/config";
import { db } from "@/lib/db";

async function test() {
    try {
        const users = await db.user.findMany({ take: 1 });
        if (users.length) {
            console.log("✅ DB connection successful, first user:", users[0]);
        } else {
            console.log("✅ DB connection successful, but no users found yet.");
        }
    } catch (err) {
        console.error("❌ DB connection failed:", err);
    } finally {
        await db.$disconnect(); // clean disconnect
        process.exit(0);
    }
}

test();