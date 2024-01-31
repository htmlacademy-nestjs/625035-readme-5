export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;

export const ApplicationServiceURL = {
  Auth: 'http://localhost:3000/api/auth',
  Files: 'http://localhost:3002/api/files',
  Publications: 'http://localhost:3001/api/publications',
  Tags: 'http://localhost:3001/api/tags',
} as const;

export const getAuthHeader = (req: Request) => ({
  headers: {
    Authorization: req.headers['authorization'],
  },
});
