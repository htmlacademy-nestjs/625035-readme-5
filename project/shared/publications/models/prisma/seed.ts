import { PrismaClient, PublicationType, Tag } from '@prisma/client';

const FIRST_TAG_ID = '9cc21e1e-5ea8-459a-aaec-45d7f55c5543';
const SECOND_TAG_ID = 'c31cea73-4c88-4ede-b21b-b67010c6a7bb';

const FIRST_PUBLICATION_ID = '3bc435c8-63a6-42a8-a07d-faccbdff9334';
const SECOND_PUBLICATION_ID = '70eb6165-a2fd-4d6c-8a96-460b5c8708e3';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

const getPublications = () => [
  {
    announcement: 'announcement',
    announcementText: 'text of announcement',
    authorId: FIRST_USER_ID,
    id: FIRST_PUBLICATION_ID,
    tags: [FIRST_TAG_ID],
    title: 'first publication',
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
    type: PublicationType.text,
  },
  {
    id: SECOND_PUBLICATION_ID,
    title: 'second publication',
    authorId: SECOND_USER_ID,
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
    tags: [SECOND_TAG_ID],
    type: PublicationType.video,
  },
];

const getTags = (): Tag[] => [
  {
    id: FIRST_TAG_ID,
    value: 'first tag',
  },
  {
    id: SECOND_TAG_ID,
    value: 'second tag',
  },
];

const seedDb = async (prismaClient: PrismaClient) => {
  const tags = getTags();

  const promises = tags.map((tag) =>
    prismaClient.tag.upsert({
      where: { id: tag.id },
      update: {},
      create: {
        id: tag.id,
        value: tag.value,
      },
    })
  );

  await Promise.all(promises);

  const mockPublications = getPublications();

  for (const publication of mockPublications) {
    const {
      type,
      id,
      comments,
      tags,
      authorId,
      announcement,
      announcementText,
      title,
      videoLink,
    } = publication;
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
              connect: tags.map((tag: string) => ({
                id: tag,
              })),
            }
          : undefined,
        authorId,
        type,
        announcement,
        announcementText,
        title,
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
