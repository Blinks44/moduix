<script lang="ts">
  import { Field, FieldHelperText, FieldItem, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import { NativeSelect } from '@moduix/svelte/native-select';
  import styles from '@/components/examples/field/field-item-target.module.css';

  let currency = $state('USD');
</script>

<Field class={styles.root} target="amount">
  <FieldLabel>Amount</FieldLabel>
  <div class={styles.inlineControls}>
    <FieldItem value="currency">
      <NativeSelect bind:value={currency} aria-label="Currency">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </NativeSelect>
    </FieldItem>
    <FieldItem value="amount">
      <Input inputmode="decimal" placeholder="0.00" />
    </FieldItem>
  </div>
  <FieldHelperText>The root label targets the amount input.</FieldHelperText>
</Field>