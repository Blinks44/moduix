import { useToc as useTocPrimitive } from '@ark-ui/vue/toc';
import type { UseTocProps, UseTocReturn } from '@ark-ui/vue/toc';
import { computed, toValue } from 'vue';
import type { MaybeRef } from 'vue';

const useToc = (
  props: MaybeRef<UseTocProps>,
  emits?: Parameters<typeof useTocPrimitive>[1],
): UseTocReturn =>
  useTocPrimitive(
    computed(() => {
      const resolvedProps = toValue(props);

      return {
        ...resolvedProps,
        autoScroll: resolvedProps?.autoScroll ?? false,
      };
    }),
    emits,
  );

export default useToc;