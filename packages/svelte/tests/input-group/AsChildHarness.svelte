<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
  } from '@/components/input-group';

  let rootRef: Element | null = $state(null);
  let addonRef: Element | null = $state(null);
  let textRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, addonRef, textRef });
</script>

<InputGroup bind:ref={rootRef} data-testid="as-child-root">
  {#snippet asChild(props)}
    <section {...props()} aria-label="Workspace group">
      <InputGroupAddon bind:ref={addonRef}>
        {#snippet asChild(addonProps)}<strong {...addonProps()}>@</strong>{/snippet}
      </InputGroupAddon>
      <InputGroupInput aria-label="Workspace" />
      <InputGroupText bind:ref={textRef}>
        {#snippet asChild(textProps)}<em {...textProps()}>.com</em>{/snippet}
      </InputGroupText>
    </section>
  {/snippet}
</InputGroup>