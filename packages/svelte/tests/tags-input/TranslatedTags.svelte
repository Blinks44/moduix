<script lang="ts">
  import {
    TagsInput,
    TagsInputClearTrigger,
    TagsInputControl,
    TagsInputInput,
    TagsInputItems,
    TagsInputLabel,
  } from '@/components/tags-input';

  const translations = {
    clearTriggerLabel: 'Effacer tous les tags',
    deleteTagTriggerLabel: (value: string) => `Supprimer ${value}`,
    tagSelected: (value: string) => `${value} sélectionné`,
    tagAdded: (value: string) => `${value} ajouté`,
    tagsPasted: (values: string[]) => `${values.length} tags collés`,
    tagEdited: (value: string) => `${value} modifié`,
    tagUpdated: (value: string) => `${value} mis à jour`,
    tagDeleted: (value: string) => `${value} supprimé`,
  };
</script>

<TagsInput defaultValue={['React']} {translations}>
  <TagsInputLabel>Frameworks</TagsInputLabel>
  <TagsInputControl>
    <TagsInputItems />
    <TagsInputInput />
    <TagsInputClearTrigger />
  </TagsInputControl>
</TagsInput>