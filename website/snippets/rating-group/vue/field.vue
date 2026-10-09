<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText } from '@moduix/vue/field';
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupItems,
  RatingGroupLabel,
} from '@moduix/vue/rating-group';
import styles from '@/components/examples/rating-group/component-field.module.css';
</script>

<template>
  <Field :class="styles.field">
    <RatingGroup :default-value="4" required>
      <RatingGroupLabel>Experience score</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems />
      </RatingGroupControl>
    </RatingGroup>
    <FieldHelperText>Required score from 1 to 5.</FieldHelperText>
    <FieldErrorText>Choose a score before continuing.</FieldErrorText>
  </Field>
</template>