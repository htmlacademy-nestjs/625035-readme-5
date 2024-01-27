export const MAX_PUBLICATIONS_LIMIT = 25;

export const MAX_TITLE_LENGTH = 50;
export const MIN_TITLE_LENGTH = 20;

export const MIN_ANNOUNCEMENT_LENGTH = 50;
export const MAX_ANNOUNCEMENT_LENGTH = 255;

export const MIN_TEXT_LENGTH = 100;
export const MAX_TEXT_LENGTH = 1024;

export const MIN_QUOTE_AUTHOR_LENGTH = 3;
export const MAX_QUOTE_AUTHOR_LENGTH = 50;

export const MIN_QUOTE_TEXT_LENGTH = 20;
export const MAX_QUOTE_TEXT_LENGTH = 300;

export const MAX_LINK_DESCRIPTION_LENGTH = 300;

export const PublicationValidationMessage = {
  link: {
    link: {
      invalid: {
        format: 'wrong format of the link url',
      },
    },
    linkDescription: {
      invalid: {
        format: 'wrong format of the link description',
        length: `wrong length of the link description (${MAX_LINK_DESCRIPTION_LENGTH})`,
      },
    },
  },
  title: {
    invalid: {
      format: 'wrong format of the title',
      length: `wrong length of the title (min: ${MIN_TITLE_LENGTH} max: ${MAX_TITLE_LENGTH})`,
    },
  },
  video: {
    url: {
      invalid: {
        format: 'wrong format of the video url',
      },
    },
  },
  text: {
    announcement: {
      invalid: {
        format: 'wrong format of the announcement',
        length: `wrong length of the announcement (min: ${MIN_ANNOUNCEMENT_LENGTH} max: ${MAX_ANNOUNCEMENT_LENGTH})`,
      },
    },
    text: {
      invalid: {
        format: 'wrong format of the text',
        length: `wrong length of the text (min: ${MIN_TEXT_LENGTH} max: ${MAX_TEXT_LENGTH})`,
      },
    },
  },
  quote: {
    author: {
      invalid: {
        format: 'wrong format of the author quote',
        length: `wrong length of the quote author (min: ${MIN_QUOTE_AUTHOR_LENGTH} max: ${MAX_QUOTE_AUTHOR_LENGTH})`,
      },
    },
    text: {
      invalid: {
        format: 'wrong format of the text quote',
        length: `wrong length of the quote text (min: ${MIN_QUOTE_TEXT_LENGTH} max: ${MAX_QUOTE_TEXT_LENGTH})`,
      },
    },
  },
  userId: {
    invalidFormat: 'User id should have a string format',
  },
  type: {
    invalidFormat:
      'Publication type should have one of the following values: video, photo, quote, link, text',
  },
  tags: {
    invalidLength: 'Each tag should take at least 3 and maximum 10 signs',
    invalidFormat:
      'Publication tags should be the array of string values. Each tag should start with letter, no whitespaces are allowed',
  },
} as const;

export const PublicationValidationParams = {
  link: {
    length: {
      max: MAX_LINK_DESCRIPTION_LENGTH,
    },
  },
  title: {
    length: {
      min: MIN_TITLE_LENGTH,
      max: MAX_TITLE_LENGTH,
    },
  },
  announcement: {
    length: {
      min: MIN_ANNOUNCEMENT_LENGTH,
      max: MAX_ANNOUNCEMENT_LENGTH,
    },
  },
  text: {
    length: {
      min: MIN_TEXT_LENGTH,
      max: MAX_TEXT_LENGTH,
    },
  },
  quoteAuthor: {
    length: {
      min: MIN_QUOTE_AUTHOR_LENGTH,
      max: MAX_QUOTE_AUTHOR_LENGTH,
    },
  },
  quoteText: {
    length: {
      min: MIN_QUOTE_TEXT_LENGTH,
      max: MAX_QUOTE_TEXT_LENGTH,
    },
  },
  tags: {
    length: {
      min: 3,
      max: 10,
    },
    valueFormat: /^\D\S*$/i,
  },
} as const;

export const PUBLICATION_NOT_FOUND = 'The Publication was not found';
export const PUBLICATION_SEARCH_BY_TITLE_LIMIT = 20;
export const PUBLICATIONS_REQUEST_COUNT = 25;
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_SORT_BY_FIELD = 'createdAt';
