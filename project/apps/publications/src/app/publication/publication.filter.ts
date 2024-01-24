import { Prisma } from '@prisma/client';

export interface PublicationFilter {
  id?: string;
  userId?: string;
}

// todo: make it work
export function categoryFilterToPrismaFilter(
  filter: PublicationFilter
): Prisma.PublicationWhereInput | undefined {
  if (!filter) {
    return undefined;
  }

  let prismaFilter: Prisma.PublicationWhereInput = {};

  if (filter.userId) {
    prismaFilter = { title: filter.userId };
  }

  return prismaFilter;
}
