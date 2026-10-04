<script setup lang="ts" generic="T extends CollectionItem = CollectionItem">
import type { CollectionItem } from '@ark-ui/vue/collection';
import { SelectContext as ArkSelectContext, type UseSelectContext } from '@ark-ui/vue/select';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseSelectContext<T>>) => unknown }>();
</script>

<template>
  <!-- @vue-generic {T} -->
  <ArkSelectContext v-slot="context">
    <slot v-bind="context" />
  </ArkSelectContext>
</template>