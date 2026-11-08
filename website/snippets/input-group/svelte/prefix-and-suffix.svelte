<script lang="ts">
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
  } from '@moduix/svelte/input-group';
  import styles from '@/components/examples/input-group/input-group-prefix-and-suffix.module.css';

  const currency = {
    symbol: '$',
    code: 'USD',
  };
</script>

<Field class={styles.root}>
  <FieldLabel>Monthly budget</FieldLabel>
  <InputGroup>
    <InputGroupAddon>{currency.symbol}</InputGroupAddon>
    <InputGroupInput inputmode="decimal" placeholder="2500" />
    <InputGroupText>{currency.code}</InputGroupText>
  </InputGroup>
</Field>