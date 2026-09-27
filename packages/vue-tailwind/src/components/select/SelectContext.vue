<script setup lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import { SelectContext as ArkSelectContext, type UseSelectContext } from '@ark-ui/vue/select';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseSelectContext<CollectionItem>>) => unknown }>();
</script>

<template>
  <ArkSelectContext v-slot="context">
    <slot v-bind="context" />
  </ArkSelectContext>
</template>