import { Prisma } from '@prisma/client';

export interface PublicationFilter {
  id?: string;
  userId?: string;
}

export function categoryFilterToPrismaFilter(
  filter: PublicationFilter
): Prisma.VideoPublicationWhereInput | undefined {
  if (!filter) {
    return undefined;
  }

  let prismaFilter: Prisma.VideoPublicationWhereInput = {};

  if (filter.userId) {
    prismaFilter = { title: filter.userId };
  }

  return prismaFilter;
}
