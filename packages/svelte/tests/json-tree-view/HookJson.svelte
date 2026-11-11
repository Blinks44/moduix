<script lang="ts">
  import { useJsonTreeView } from '@/components/json-tree-view';

  let data: unknown = $state({ status: 'before' });
  let maxPreviewItems = $state(1);
  const tree = useJsonTreeView(() => ({
    id: 'hook-json',
    data,
    maxPreviewItems,
  }));

  export const update = () => {
    data = { status: 'after' };
    maxPreviewItems = 2;
  };
  export const read = () => tree();
</script>