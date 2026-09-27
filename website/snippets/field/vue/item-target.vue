<script setup lang="ts">
import { Field, FieldHelperText, FieldItem, FieldLabel } from '@moduix/vue/field';
import { Input } from '@moduix/vue/input';
import { NativeSelect } from '@moduix/vue/native-select';
import styles from '@/components/examples/field/field-item-target.module.css';
</script>

<template>
  <Field :class="styles.root" target="amount">
    <FieldLabel>Amount</FieldLabel>
    <div :class="styles.inlineControls">
      <FieldItem value="currency">
        <NativeSelect aria-label="Currency" default-value="USD">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </NativeSelect>
      </FieldItem>
      <FieldItem value="amount">
        <Input input-mode="decimal" placeholder="0.00" />
      </FieldItem>
    </div>
    <FieldHelperText>The root label targets the amount input.</FieldHelperText>
  </Field>
</template>