<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
  } from '@/components/input-group';
</script>

<InputGroup size="lg" class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 text-primary">
  <InputGroupAddon class="bg-background px-0 text-primary">@</InputGroupAddon>
  <InputGroupInput class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5" />
  <InputGroupButton class="rounded-lg bg-muted px-2 text-primary">Copy</InputGroupButton>
</InputGroup>