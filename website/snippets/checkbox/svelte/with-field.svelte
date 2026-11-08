<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
  import { Field, FieldErrorText, FieldHelperText } from '@moduix/svelte/field';
  import styles from '@/components/examples/checkbox/checkbox-with-field.module.css';
</script>

<Field class={styles.root}>
  <Checkbox required name="terms" value="accepted">
    <CheckboxControl />
    <CheckboxLabel>Accept terms</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
  <FieldHelperText>Required to continue.</FieldHelperText>
  <FieldErrorText>Please accept the terms.</FieldErrorText>
</Field>