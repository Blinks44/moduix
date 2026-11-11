<script lang="ts">
  import { EnvironmentProvider } from '@ark-ui/svelte/environment';
  import { Portal } from '@ark-ui/svelte/portal';
  import { Button } from '@moduix/svelte/button';
  import { onMount } from 'svelte';
  let host = $state<HTMLDivElement | null>(null);
  let shadowRoot = $state.raw<ShadowRoot>();
  onMount(() => {
    if (host) shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
  });
</script>

<div bind:this={host}></div>
{#if shadowRoot}
  <Portal container={shadowRoot as unknown as HTMLElement}>
    <EnvironmentProvider value={shadowRoot}>
      <Button type="button">Save settings</Button>
    </EnvironmentProvider>
  </Portal>
{/if}