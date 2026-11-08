<script lang="ts">
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/input/input-native-attributes.module.css';
</script>

<Field class={styles.root}>
  <FieldLabel>Security code</FieldLabel>
  <Input
    htmlSize={8}
    inputmode="numeric"
    maxlength={6}
    name="security-code"
    autocomplete="one-time-code"
    placeholder="000000"
  />
</Field>