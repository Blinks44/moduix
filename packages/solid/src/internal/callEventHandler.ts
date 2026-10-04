import type { JSX } from 'solid-js';

// Solid event props accept a callback or a bound [callback, data] pair.
export function callEventHandler<T, E extends Event>(
  handler: JSX.EventHandlerUnion<T, E> | undefined,
  event: Parameters<JSX.EventHandler<T, E>>[0],
) {
  if (typeof handler === 'function') handler(event);
  else handler?.[0](handler[1], event);
}