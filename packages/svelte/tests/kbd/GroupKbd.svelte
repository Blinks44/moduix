<script lang="ts">
  import { Kbd, KbdGroup } from '@/components/kbd';

  let groupRef: Element | null = $state(null);

  export const getRefs = () => ({ groupRef });
</script>

<KbdGroup
  bind:ref={groupRef}
  aria-label="Command K"
  data-testid="group"
  data-scope="consumer"
  data-part="consumer"
  role="presentation"
>
  <Kbd data-testid="key" data-scope="consumer" data-part="consumer">Cmd</Kbd>+<Kbd>K</Kbd>
</KbdGroup>