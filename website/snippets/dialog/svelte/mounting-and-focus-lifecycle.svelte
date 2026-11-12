<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Dialog,
    DialogBackdrop,
    DialogBody,
    DialogCloseIcon,
    DialogContent,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';

  let inputRef = $state<HTMLInputElement | null>(null);
  let finalFocusRef = $state<HTMLButtonElement | null>(null);
</script>

<Button bind:ref={finalFocusRef}>Final focus target</Button>
<Dialog lazyMount unmountOnExit initialFocusEl={() => inputRef} finalFocusEl={() => finalFocusRef}>
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>Edit profile</Button>{/snippet}
  </DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogBody>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input bind:ref={inputRef} />
        </Field>
      </DialogBody>
      <DialogCloseIcon />
    </DialogContent>
  </DialogPositioner>
</Dialog>