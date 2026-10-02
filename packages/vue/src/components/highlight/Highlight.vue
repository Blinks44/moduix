<script setup lang="ts">
import { Highlight as ArkHighlight } from '@ark-ui/vue/highlight';
import type { HighlightProps as ArkHighlightProps } from '@ark-ui/vue/highlight';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Highlight.module.css';

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
    :class="clsx(styles.root, className)"
    :text="text"
    :query="query"
    data-scope="highlight"
    data-part="root"
    data-slot="highlight-root"
  />
</template>