<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import type { InputGroupAddonAlign } from './context';

  export interface InputGroupTextProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {
    align?: InputGroupAddonAlign;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  import { useInputGroupSize } from './context';
  import { inputGroupTextVariants } from './variants';

  let {
    align = 'inline',
    class: className,
    ref = $bindable(null),
    ...props
  }: InputGroupTextProps = $props();

  const groupSize = useInputGroupSize();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={cn(inputGroupTextVariants({ size: groupSize() }), className)}
  data-scope="input-group"
  data-part="text"
  data-slot="input-group-text"
  data-align={align}
/>