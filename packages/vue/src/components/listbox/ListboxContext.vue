<script setup lang="ts" generic="T extends CollectionItem = CollectionItem">
import type { CollectionItem } from '@ark-ui/vue/collection';
import { ListboxContext as ArkListboxContext, type UseListboxContext } from '@ark-ui/vue/listbox';
import type { UnwrapRef } from 'vue';

defineSlots<{ default: (context: UnwrapRef<UseListboxContext<T>>) => unknown }>();
</script>

<template>
  <!-- @vue-generic {T} -->
  <ArkListboxContext v-slot="context">
    <slot v-bind="context" />
  </ArkListboxContext>
</template>