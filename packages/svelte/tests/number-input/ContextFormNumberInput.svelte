<script lang="ts">
  import {
    NumberInput,
    NumberInputContext,
    NumberInputField,
    NumberInputLabel,
  } from '@/components/number-input';
</script>

<form>
  <NumberInput defaultValue="42">
    <NumberInputLabel>Quantity</NumberInputLabel>
    <NumberInputField />
    <NumberInputContext>
      {#snippet render(context)}
        <input name="quantity" type="hidden" value={context().valueAsNumber} />
      {/snippet}
    </NumberInputContext>
  </NumberInput>
</form>