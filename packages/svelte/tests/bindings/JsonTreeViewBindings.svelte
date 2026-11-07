<script lang="ts">
  import { JsonTreeView, JsonTreeViewTree } from '@/components/json-tree-view';
  import { data } from '../json-tree-view/data';

  let expandedValue = $state<string[]>([]);
  let selectedValue = $state<string[]>([]);
  let focusedValue = $state<string | undefined>();
  let checkedValue = $state<string[]>([]);

  export const write = (
    key: 'expandedValue' | 'selectedValue' | 'focusedValue' | 'checkedValue',
    nodeValue: string,
  ) => {
    if (key === 'expandedValue') expandedValue = [nodeValue];
    if (key === 'selectedValue') selectedValue = [nodeValue];
    if (key === 'focusedValue') focusedValue = nodeValue;
    if (key === 'checkedValue') checkedValue = [nodeValue];
  };
  export const read = () => ({ expandedValue, selectedValue, focusedValue, checkedValue });
</script>

<JsonTreeView {data} bind:expandedValue bind:selectedValue bind:focusedValue bind:checkedValue>
  <JsonTreeViewTree />
</JsonTreeView>