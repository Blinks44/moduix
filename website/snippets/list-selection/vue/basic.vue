<script setup lang="ts">
import { createListCollection, useListSelection } from '@ark-ui/vue/collection';
import { computed } from 'vue';
const teams = createListCollection({
  items: [
    { label: 'Platform', value: 'platform' },
    { label: 'Product', value: 'product' },
    { label: 'Design', value: 'design', disabled: true },
  ],
});
const selection = useListSelection({
  collection: teams,
  selectionMode: 'single',
  deselectable: true,
});
const selectedLabel = computed(() => {
  const value = selection.firstSelectedValue.value;
  return value ? `Selected: ${teams.stringify(value)}` : 'No team selected';
});
</script>
<template>
  <section aria-labelledby="team-heading">
    <h3 id="team-heading">Choose a team</h3>
    <ul>
      <li v-for="team in teams.items" :key="team.value">
        <button
          type="button"
          :aria-pressed="selection.isSelected(team.value)"
          :disabled="teams.getItemDisabled(team)"
          @click="selection.select(team.value)"
        >
          {{ team.label }}
        </button>
      </li>
    </ul>
    <p aria-live="polite">{{ selectedLabel }}</p>
  </section>
</template>