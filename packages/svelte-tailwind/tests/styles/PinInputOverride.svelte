<script lang="ts">
  import {
    PinInput,
    PinInputControl,
    PinInputInput,
    PinInputLabel,
    PinInputSeparator,
  } from '@/components/pin-input';
</script>

<PinInput class="w-80 max-w-sm gap-4">
  <PinInputLabel class="text-lg text-primary">Verification code</PinInputLabel>
  <PinInputControl class="gap-4">
    <PinInputInput
      class="h-12 w-40 rounded-lg border-2 bg-muted px-2 py-1 text-primary"
      index={0}
    />
    <PinInputSeparator class="size-8 text-primary" />
  </PinInputControl>
</PinInput>