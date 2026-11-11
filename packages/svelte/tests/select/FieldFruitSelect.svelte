<script lang="ts">
  import { Field } from '@/components/field';
  import FruitSelect from './FruitSelect.svelte';
</script>

<Field disabled invalid required><FruitSelect defaultValue={['apple']} /></Field>