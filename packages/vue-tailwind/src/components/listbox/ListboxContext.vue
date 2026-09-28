<script setup lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import { ListboxContext as ArkListboxContext, type UseListboxContext } from '@ark-ui/vue/listbox';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseListboxContext<CollectionItem>>) => unknown }>();
</script>

<template>
  <ArkListboxContext v-slot="context">
    <slot v-bind="context" />
  </ArkListboxContext>
</template>