<script setup lang="ts">
import { Highlight } from '@moduix/vue/highlight';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/highlight/highlight-match-all.module.css';
</script>

<template>
  <div :class="styles.comparison">
    <div>
      <div :class="styles.label">Match all</div>
      <Text>
        <Highlight
          match-all
          query="component"
          text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
        />
      </Text>
    </div>
    <div>
      <div :class="styles.label">First match only</div>
      <Text>
        <Highlight
          :match-all="false"
          query="component"
          text="Each component follows WAI-ARIA guidelines. Every component is rigorously tested to ensure accessibility."
        />
      </Text>
    </div>
  </div>
</template>