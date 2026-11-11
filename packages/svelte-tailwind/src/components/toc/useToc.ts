import { useToc as useTocPrimitive } from '@ark-ui/svelte/toc';
import type { UseTocProps, UseTocReturn } from '@ark-ui/svelte/toc';

const useToc = (props?: UseTocProps | (() => UseTocProps)): UseTocReturn =>
  useTocPrimitive(() => {
    const resolvedProps = typeof props === 'function' ? props() : props;

    return {
      ...resolvedProps,
      autoScroll: resolvedProps?.autoScroll ?? false,
    } as UseTocProps;
  });

export default useToc;