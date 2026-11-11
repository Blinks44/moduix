<script lang="ts">
  import { Field, FieldItem, FieldLabel } from '@/components/field';
  import { Input } from '@/components/input';

  let itemRef: HTMLDivElement | null = $state(null);

  export const getItemRef = () => itemRef;
</script>

<Field id="contact" target="email">
  <FieldItem bind:ref={itemRef} value="email">
    <FieldLabel>Email</FieldLabel>
    <Input />
  </FieldItem>
</Field>