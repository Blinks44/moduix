<script lang="ts">
  import { Field, FieldLabel } from '@/components/field';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
  } from '@/components/input-group';

  let rootRef: Element | null = $state(null);
  let addonRef: Element | null = $state(null);
  let inputRef: Element | null = $state(null);
  let textRef: Element | null = $state(null);
  let buttonRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, addonRef, inputRef, textRef, buttonRef });
</script>

<Field disabled id="workspace" invalid readOnly>
  <FieldLabel>Workspace</FieldLabel>
  <InputGroup
    bind:ref={rootRef}
    class="consumer-root"
    data-part="consumer-part"
    data-scope="consumer-scope"
    data-size="xs"
    data-slot="consumer-slot"
    data-testid="input-group"
    size="lg"
  >
    <InputGroupAddon
      bind:ref={addonRef}
      class="consumer-addon"
      data-part="consumer-part"
      data-scope="consumer-scope"
      data-slot="consumer-slot">@</InputGroupAddon
    >
    <InputGroupInput bind:ref={inputRef} />
    <InputGroupText
      bind:ref={textRef}
      class="consumer-text"
      data-part="consumer-part"
      data-scope="consumer-scope"
      data-slot="consumer-slot">.com</InputGroupText
    >
    <InputGroupButton bind:ref={buttonRef} class="consumer-button" data-slot="consumer-slot"
      >Copy</InputGroupButton
    >
  </InputGroup>
</Field>