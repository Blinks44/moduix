<script lang="ts">
  import {
    Field,
    FieldErrorText,
    FieldHelperText,
    FieldLabel,
    FieldRequiredIndicator,
  } from '@/components/field';
  import { Input } from '@/components/input';

  const refs: Record<'root' | 'label' | 'helper' | 'error' | 'indicator', Element | null> = $state({
    root: null,
    label: null,
    helper: null,
    error: null,
    indicator: null,
  });

  export const getRefs = () => refs;
</script>

<Field bind:ref={refs.root} invalid required>
  <FieldLabel bind:ref={refs.label}>
    Name <FieldRequiredIndicator bind:ref={refs.indicator} />
  </FieldLabel>
  <Input />
  <FieldHelperText bind:ref={refs.helper}>Shown on your profile.</FieldHelperText>
  <FieldErrorText bind:ref={refs.error}>Enter a name.</FieldErrorText>
</Field>