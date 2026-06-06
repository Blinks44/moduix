import { clsx, type ClassValue } from 'clsx';

type StatefulClassName<TState> = ClassValue | ((state: TState) => ClassValue);

export function mergeClassName<TState>(
  className: StatefulClassName<TState>,
  ...baseClassNames: ClassValue[]
): string | ((state: TState) => string) {
  if (typeof className === 'function') {
    return (state: TState) => clsx(...baseClassNames, className(state));
  }

  return clsx(...baseClassNames, className);
}