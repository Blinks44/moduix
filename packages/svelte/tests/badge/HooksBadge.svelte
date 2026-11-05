<script lang="ts">
  import { Badge, BadgeDot } from '@/components/badge';
</script>

<Badge
  variant="secondary"
  data-testid="badge"
  data-scope="custom"
  data-part="custom"
  data-slot="custom"
  data-variant="outline"
>
  <BadgeDot data-testid="dot" data-part="custom" aria-hidden="false" />
  Draft
</Badge>