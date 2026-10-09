<script setup lang="ts">
import { createListCollection, useListSelection } from '@ark-ui/vue/collection';
const teams = createListCollection({
  items: [
    { label: 'Platform', value: 'platform' },
    { label: 'Product', value: 'product' },
    { label: 'Design', value: 'design' },
  ],
});
const selection = useListSelection({
  collection: teams,
  selectionMode: 'multiple',
  initialSelectedValues: ['platform'],
});
const { isEmpty, selectedValues } = selection;
const toggleAll = () => {
  if (selection.isAllSelected()) selection.clear();
  else selection.setSelectedValues(teams.getValues());
};
</script>
<template>
  <section aria-labelledby="teams-heading">
    <h3 id="teams-heading">Choose teams</h3>
    <ul>
      <li v-for="team in teams.items" :key="team.value">
        <button
          type="button"
          :aria-pressed="selection.isSelected(team.value)"
          @click="selection.select(team.value)"
        >
          {{ team.label }}
        </button>
      </li>
    </ul>
    <button type="button" @click="toggleAll">
      {{ selection.isAllSelected() ? 'Clear all' : 'Select all' }}
    </button>
    <output aria-live="polite">{{
      isEmpty ? 'No teams selected' : `Selected: ${teams.stringifyMany(selectedValues)}`
    }}</output>
  </section>
</template>