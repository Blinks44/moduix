<script lang="ts">
  import { Field, FieldErrorText, FieldHelperText } from '@moduix/svelte/field';
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@moduix/svelte/rating-group';
  import styles from '@/components/examples/rating-group/component-field.module.css';
</script>

<Field class={styles.field}>
  <RatingGroup defaultValue={4} required>
    <RatingGroupLabel>Experience score</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
  </RatingGroup>
  <FieldHelperText>Required score from 1 to 5.</FieldHelperText>
  <FieldErrorText>Choose a score before continuing.</FieldErrorText>
</Field>