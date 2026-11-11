<script lang="ts">
  import { Field, FieldHelperText, FieldLabel } from '@moduix/svelte/field';
  import { NativeSelect } from '@moduix/svelte/native-select';
  import styles from '@/components/examples/field/field-native-select.module.css';
</script>

<Field class={styles.root} required>
  <FieldLabel>Priority</FieldLabel>
  <NativeSelect name="priority">
    <option value="" disabled selected>Select priority</option>
    <option value="low">Low</option>
    <option value="normal">Normal</option>
    <option value="high">High</option>
  </NativeSelect>
  <FieldHelperText>Used for triage queues.</FieldHelperText>
</Field>