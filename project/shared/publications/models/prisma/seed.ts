import { PrismaClient } from '@prisma/client';

const FIRST_PUBLICATION_ID = '3bc435c8-63a6-42a8-a07d-faccbdff9334';
const SECOND_PUBLICATION_ID = '70eb6165-a2fd-4d6c-8a96-460b5c8708e3';

// todo: create and pick real one
const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

const getPublications = () => [
  {
    announcement: 'announcement',
    announcementText: 'text of announcement',
    id: FIRST_PUBLICATION_ID,
    title: 'first publication',
    userId: FIRST_USER_ID,
    comments: [
      {
        value: 'first comment',
        userId: FIRST_USER_ID,
      },
      {
        value: 'second comment',
        userId: SECOND_USER_ID,
      },
    ],
  },
  {
    id: SECOND_PUBLICATION_ID,
    title: 'second publication',
    userId: SECOND_USER_ID,
    videoLink:
      'https://www.youtube.com/watch?v=6IWr3LJwKe8&ab_channel=aTolphas',
    comments: [
      {
        value: 'third comment',
        userId: FIRST_USER_ID,
      },
      {
        value: 'fourth comment',
        userId: SECOND_USER_ID,
      },
    ],
    tags: [
      {
        value: 'first tag',
      },
    ],
  },
];

const seedDb = async (prismaClient: PrismaClient) => {
  const mockPublications = getPublications();

  for (const publication of mockPublications) {
    const {
      id,
      title,
      announcement,
      announcementText,
      userId,
      comments,
      tags,
      videoLink,
    } = publication;

    await prismaClient.publication.upsert({
      where: { id },
      update: {},
      create: {
        id,
        title,
        announcement: announcement,
        announcementText: announcementText,
        userId: userId,
        comments: comments
          ? {
              create: comments,
            }
          : undefined,
        tags: tags
          ? {
              create: tags,
            }
          : undefined,
        videoLink,
      },
    });
  }

  console.info('🤘️ Database was filled');
};

const bootstrap = async () => {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
};

bootstrap();
