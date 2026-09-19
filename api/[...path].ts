import app from '../server/index';

export default function handler(req: unknown, res: unknown) {
  return app(req as Parameters<typeof app>[0], res as Parameters<typeof app>[1]);
}
