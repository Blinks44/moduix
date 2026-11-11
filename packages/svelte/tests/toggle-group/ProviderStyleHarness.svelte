<script lang="ts">
  import {
    ToggleGroupItem,
    ToggleGroupRootProvider,
    useToggleGroup,
  } from '@/components/toggle-group';

  let rootRef: Element | null = $state(null);
  let variant = $state<'outline' | 'ghost'>('outline');
  let size = $state<'sm' | 'lg'>('sm');
  const toggleGroup = useToggleGroup({ id: 'provider-style-toggle-group', defaultValue: ['left'] });

  export const getRefs = () => ({ rootRef });
  export const update = () => {
    variant = 'ghost';
    size = 'lg';
  };
</script>

<ToggleGroupRootProvider
  bind:ref={rootRef}
  value={toggleGroup}
  {variant}
  {size}
  aria-label="Provider"
>
  {#snippet asChild(props)}
    <section {...props()}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
    </section>
  {/snippet}
</ToggleGroupRootProvider>