<script lang="ts">
  import { Card, type CardRootProps } from '@/components/card';

  let { ...props }: CardRootProps = $props();
</script>

<Card {...props}>Large card</Card>