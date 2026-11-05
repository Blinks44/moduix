<script lang="ts">
  import {
    Switch,
    SwitchControl,
    SwitchHiddenInput,
    SwitchLabel,
    SwitchThumb,
  } from '@/components/switch';

  const refs: Record<'root' | 'control' | 'thumb' | 'label', Element | null> = $state({
    root: null,
    control: null,
    thumb: null,
    label: null,
  });

  export const getRefs = () => refs;
</script>

<Switch bind:ref={refs.root} size="lg">
  <SwitchControl bind:ref={refs.control}>
    <SwitchThumb bind:ref={refs.thumb} />
  </SwitchControl>
  <SwitchHiddenInput />
  <SwitchLabel bind:ref={refs.label}>Email notifications</SwitchLabel>
</Switch>