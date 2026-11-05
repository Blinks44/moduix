<script lang="ts">
  import { FieldRoot, type FieldRootProps } from '@ark-ui/svelte/field';
  import { cn } from '@/lib/moduix/cn';
  import { fieldRootClass } from './Field.variants';

  let { class: className, ref = $bindable(null), ...props }: FieldRootProps = $props();
</script>

<FieldRoot {...props} bind:ref class={cn(fieldRootClass, className)} data-slot="field-root" />