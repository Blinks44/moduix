<script setup lang="ts">
import { ChevronDown as ChevronDownIcon } from '@lucide/vue';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/vue/collapsible';
import styles from '@/components/examples/collapsible/collapsible-build-from-parts.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
</script>

<template>
  <Collapsible :class="styles.root">
    <CollapsibleTrigger>
      Recovery keys
      <CollapsibleIndicator>
        <ChevronDownIcon :stroke-width="3" />
      </CollapsibleIndicator>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div :class="styles.body">
        <ul :class="styles.keysList">
          <li v-for="key in recoveryKeys" :key="key">{{ key }}</li>
        </ul>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>