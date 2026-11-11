<script lang="ts">
  import { Text } from '@/components/text';
</script>

<Text
  data-testid="default"
  data-part="custom-part"
  data-scope="custom-scope"
  data-size="xs"
  data-slot="custom-slot"
  data-tone="primary"
  data-weight="bold"
>
  Body copy
</Text>
<Text as="small" data-testid="small">Supporting copy</Text>
<Text as="strong" data-testid="strong">Important copy</Text>