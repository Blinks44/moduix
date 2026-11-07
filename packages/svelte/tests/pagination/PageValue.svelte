<script lang="ts">
  import { usePaginationContext } from '@/components/pagination';

  const pagination = usePaginationContext();
</script>

<output>Page {pagination().page}</output>