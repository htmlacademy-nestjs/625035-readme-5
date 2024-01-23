import { PrismaClient } from '@prisma/client';

const FIRST_PUBLICATION_ID = '3bc435c8-63a6-42a8-a07d-faccbdff9334';
const SECOND_PUBLICATION_ID = '70eb6165-a2fd-4d6c-8a96-460b5c8708e3';

// todo: create and pick real one
const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

type Publication = {
  comments?: { value: string; userId: string }[];
  id: string;
  tags: [];
  title: string;
  type: 'text' | 'video';
  userId: string;
};

type TextPublication = Publication & {
  announcement: string;
  text: string;
};

type VideoPublication = Publication & {
  videoLink: string;
};

const getPublications = () => [
  {
    announcement: 'announcement',
    text: 'text of announcement',
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
    type: 'text',
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
    type: 'video',
  },
];

const seedDb = async (prismaClient: PrismaClient) => {
  const mockPublications = getPublications();

  for (const publication of mockPublications) {
    const { type } = publication;

    const strategy = {
      text: async ({
        announcement,
        comments,
        id,
        tags,
        text,
        title,
        userId,
      }: TextPublication) =>
        await prismaClient.publication.upsert({
          where: { id },
          update: {},
          create: {
            comments: comments
              ? {
                  create: comments,
                }
              : undefined,
            id,
            tags: tags
              ? {
                  create: tags,
                }
              : undefined,
            userId,
            textPublication: {
              create: {
                announcement,
                text,
                title,
              },
            },
          },
        }),
      video: async ({
        comments,
        id,
        tags,
        title,
        userId,
        videoLink,
      }: VideoPublication) =>
        await prismaClient.publication.upsert({
          where: { id },
          update: {},
          create: {
            comments: comments
              ? {
                  create: comments,
                }
              : undefined,
            id,
            tags: tags ? { create: tags } : undefined,
            userId,
            videoPublication: {
              create: {
                title,
                videoLink,
              },
            },
          },
        }),
    };

    await strategy[type](publication);
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
