<script setup lang="ts">
import { Highlight as ArkHighlight } from '@ark-ui/vue/highlight';
import type { HighlightProps as ArkHighlightProps } from '@ark-ui/vue/highlight';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkHighlightProps {
  class?: HTMLAttributes['class'];
  text: ArkHighlightProps['text'];
  query: ArkHighlightProps['query'];
}

const { class: className, text, query } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkHighlight
    v-bind="attrs"
    :class="
      cn(
        'rounded-xs bg-[color-mix(in_oklab,var(--color-warning)_40%,var(--color-accent))] box-decoration-clone px-1 py-px font-medium text-foreground no-underline shadow-none',
        className,
      )
    "
    :text="text"
    :query="query"
    data-scope="highlight"
    data-part="root"
    data-slot="highlight-root"
  />
</template>