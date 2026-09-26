<script setup lang="ts" generic="T extends CollectionItem = CollectionItem">
import type { CollectionItem } from '@ark-ui/vue/collection';
import {
  ComboboxContext as ArkComboboxContext,
  type UseComboboxContext,
} from '@ark-ui/vue/combobox';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseComboboxContext<T>>) => unknown }>();
</script>

<template>
  <ArkComboboxContext v-slot="context">
    <slot v-bind="context" />
  </ArkComboboxContext>
</template>