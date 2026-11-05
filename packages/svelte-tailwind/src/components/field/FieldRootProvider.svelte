<script lang="ts">
  import { FieldRootProvider, type FieldRootProviderProps } from '@ark-ui/svelte/field';
  import { cn } from '@/lib/moduix/cn';
  import { fieldRootClass } from './Field.variants';

  let { class: className, ...props }: FieldRootProviderProps = $props();
</script>

<FieldRootProvider
  {...props}
  class={cn(fieldRootClass, className)}
  data-slot="field-root-provider"
/>