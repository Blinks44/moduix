<script setup lang="ts">
import { EnvironmentProvider } from '@ark-ui/vue/environment';
import { Button } from '@moduix/vue/button';
import { onMounted, ref, shallowRef } from 'vue';
const host = ref<HTMLDivElement | null>(null);
const shadowRoot = shallowRef<ShadowRoot>();
onMounted(() => {
  if (host.value)
    shadowRoot.value = host.value.shadowRoot ?? host.value.attachShadow({ mode: 'open' });
});
</script>
<template>
  <div ref="host" />
  <Teleport v-if="shadowRoot" :to="shadowRoot">
    <EnvironmentProvider :value="shadowRoot"
      ><Button type="button">Save settings</Button></EnvironmentProvider
    >
  </Teleport>
</template>