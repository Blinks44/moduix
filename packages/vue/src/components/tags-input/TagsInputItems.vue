<script setup lang="ts">
import { useTagsInputContext } from '@ark-ui/vue/tags-input';
import TagsInputItem from './TagsInputItem.vue';
import TagsInputItemDeleteTrigger from './TagsInputItemDeleteTrigger.vue';
import TagsInputItemInput from './TagsInputItemInput.vue';
import TagsInputItemPreview from './TagsInputItemPreview.vue';
import TagsInputItemText from './TagsInputItemText.vue';

const tagsInput = useTagsInputContext();
</script>

<template>
  <TagsInputItem
    v-for="(value, index) in tagsInput.value"
    :key="`${value}-${index}`"
    :index="index"
    :value="value"
  >
    <TagsInputItemPreview>
      <TagsInputItemText>{{ value }}</TagsInputItemText>
      <TagsInputItemDeleteTrigger />
    </TagsInputItemPreview>
    <TagsInputItemInput />
  </TagsInputItem>
</template>