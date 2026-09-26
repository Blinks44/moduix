<script setup lang="ts">
import { ChevronDown as ChevronDownIcon } from '@lucide/vue';
import {
  Collapsible,
  CollapsibleBody,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/vue/collapsible';
import styles from '@/components/examples/collapsible/collapsible-custom-composition.module.css';

const recoveryKeys = ['alien-bean-pasta', 'wild-irish-burrito', 'horse-battery-staple'];
</script>

<template>
  <Collapsible :class="styles.root">
    <CollapsibleTrigger as-child>
      <button type="button" :class="styles.customTrigger">
        Styled recovery keys
        <CollapsibleIndicator :class="styles.customIndicator">
          <ChevronDownIcon />
        </CollapsibleIndicator>
      </button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody :class="styles.customContentBody">
        <ul :class="styles.keysList">
          <li v-for="key in recoveryKeys" :key="key">{{ key }}</li>
        </ul>
      </CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</template>