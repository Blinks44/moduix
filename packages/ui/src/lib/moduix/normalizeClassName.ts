export const normalizeClassName = (className: unknown): string | undefined =>
  typeof className === 'string' ? className : undefined;