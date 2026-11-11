<script lang="ts">
  import { Field, FieldErrorText, FieldHelperText } from '@moduix/svelte/field';
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@moduix/svelte/segment-group';
  import styles from '@/components/examples/segment-group/segment-group-field.module.css';

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];
</script>

<Field class={styles.root} invalid>
  <SegmentGroup aria-label="Framework" defaultValue="React" name="framework" invalid required>
    <SegmentGroupIndicator />
    <SegmentGroupItems items={frameworks} />
  </SegmentGroup>
  <FieldHelperText>Choose the framework used by this project.</FieldHelperText>
  <FieldErrorText>Choose a supported framework.</FieldErrorText>
</Field>