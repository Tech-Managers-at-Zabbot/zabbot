import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Zabbot learning system...");

  const [basicsJourney, convoJourney] = await Promise.all([
    prisma.journey.upsert({
      where: { slug: "journey-basics" },
      update: {},
      create: {
        slug: "journey-basics",
        title: "Yoruba Basics",
        description: "Start your Yoruba learning journey from scratch",
        order: 1,
        status: "ACTIVE",

        imageThumbnail:
          "https://your-cdn.com/images/journeys/yoruba-basics.jpg",
      },
    }),

    prisma.journey.upsert({
      where: { slug: "journey-conversation" },
      update: {},
      create: {
        slug: "journey-conversation",
        title: "Daily Conversation",
        description: "Learn real-life Yoruba conversations",
        order: 2,
        status: "ACTIVE",

        imageThumbnail:
          "https://your-cdn.com/images/journeys/daily-conversation.jpg",
      },
    }),
  ]);

  const sparks = await Promise.all([
    prisma.spark.upsert({
      where: { slug: "greetings-1" },
      update: {},
      create: {
        title: "Greetings 1",
        slug: "greetings-1",
        description: "Basic Yoruba greetings",
        order: 1,
        journeyId: basicsJourney.id,
        category: "LANGUAGE",
        difficulty: "BEGINNER",
        xpReward: 50,
        isPublished: true,
        status: "ACTIVE",

        imageThumbnail:
          "https://your-cdn.com/images/sparks/greetings-1.jpg",

        bgColor: "#24A5EE",
        timeEstimate: 5,
      },
    }),

    prisma.spark.upsert({
      where: { slug: "introductions" },
      update: {},
      create: {
        title: "Introductions",
        slug: "introductions",
        description: "How to introduce yourself",
        order: 2,
        journeyId: basicsJourney.id,
        category: "LANGUAGE",
        difficulty: "BEGINNER",
        xpReward: 60,
        isPublished: true,
        status: "ACTIVE",

        imageThumbnail:
          "https://your-cdn.com/images/sparks/introductions.jpg",

        bgColor: "#1E90FF",
        timeEstimate: 6,
      },
    }),

    prisma.spark.upsert({
      where: { slug: "daily-expressions" },
      update: {},
      create: {
        title: "Daily Expressions",
        slug: "daily-expressions",
        description: "Common daily Yoruba expressions",
        order: 1,
        journeyId: convoJourney.id,
        category: "PRACTICE",
        difficulty: "BEGINNER",
        xpReward: 70,
        isPublished: true,
        status: "ACTIVE",

        imageThumbnail:
          "https://your-cdn.com/images/sparks/daily-expressions.jpg",

        bgColor: "#FF7A59",
        timeEstimate: 7,
      },
    }),
  ]);

  await prisma.vocabulary.upsert({
    where: { yorubaWord: "Bawo ni" },
    update: {},
    create: {
      yorubaWord: "Bawo ni",
      englishTranslation: "How are you?",
      tones: "Bá-wo-ni",

      imageUrl: "https://your-cdn.com/images/vocab/bawo-ni.jpg",

      maleAudioUrl: "https://your-cdn.com/audio/bawo-ni-male.mp3",
      femaleAudioUrl: "https://your-cdn.com/audio/bawo-ni-female.mp3",
    },
  });

  await prisma.vocabulary.upsert({
    where: { yorubaWord: "O dáa" },
    update: {},
    create: {
      yorubaWord: "O dáa",
      englishTranslation: "I am fine",
      tones: "Ó-dáa",

      // 🖼️ IMAGE ADDED
      imageUrl: "https://your-cdn.com/images/vocab/o-daa.jpg",

      maleAudioUrl: "https://your-cdn.com/audio/o-daa-male.mp3",
      femaleAudioUrl: "https://your-cdn.com/audio/o-daa-female.mp3",
    },
  });

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });