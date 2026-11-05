<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxIndicator,
    CheckboxLabel,
  } from '@/components/checkbox';

  const refs: Record<'root' | 'control' | 'indicator' | 'label' | 'group', Element | null> = $state(
    { root: null, control: null, indicator: null, label: null, group: null },
  );

  export const getRefs = () => refs;
</script>

<CheckboxGroup bind:ref={refs.group} defaultValue={['email']}>
  <Checkbox bind:ref={refs.root} value="email" size="lg">
    <CheckboxControl bind:ref={refs.control}>
      <CheckboxIndicator bind:ref={refs.indicator} />
    </CheckboxControl>
    <CheckboxHiddenInput />
    <CheckboxLabel bind:ref={refs.label}>Email notifications</CheckboxLabel>
  </Checkbox>
</CheckboxGroup>