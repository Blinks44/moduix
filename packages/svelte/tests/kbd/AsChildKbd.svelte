<script lang="ts">
  import { Kbd, KbdGroup } from '@/components/kbd';

  let groupRef: Element | null = $state(null);
  let keyRef: Element | null = $state(null);

  export const getRefs = () => ({ groupRef, keyRef });
</script>

<KbdGroup bind:ref={groupRef} aria-label="Command K">
  {#snippet asChild(groupProps)}
    <span {...groupProps()} title="Command K">
      <Kbd bind:ref={keyRef}>
        {#snippet asChild(keyProps)}
          <kbd {...keyProps()} title="Escape">Esc</kbd>
        {/snippet}
      </Kbd>
    </span>
  {/snippet}
</KbdGroup>