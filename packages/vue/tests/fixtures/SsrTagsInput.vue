<script setup lang="ts">
import {
  TagsInput,
  TagsInputLabel,
  TagsInputControl,
  TagsInputItems,
  TagsInputInput,
  TagsInputHiddenInput,
} from '../../src/components/tags-input';
</script>

<template>
  <form>
    <TagsInput :default-value="['React']" name="frameworks"
      ><TagsInputLabel>Frameworks</TagsInputLabel
      ><TagsInputControl><TagsInputItems /><TagsInputInput /></TagsInputControl
      ><TagsInputHiddenInput
    /></TagsInput>
  </form>
</template>