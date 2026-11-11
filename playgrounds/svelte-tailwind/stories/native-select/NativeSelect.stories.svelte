<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@/components/field';
  import { NativeSelect } from '@/components/native-select';

  const { Story } = defineMeta({
    title: 'Components/NativeSelect',
    component: NativeSelect,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state('react');
</script>

<Story name="Basic" asChild>
  <NativeSelect value="" aria-label="Framework">
    <option value="" disabled>Choose framework</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="svelte">Svelte</option>
  </NativeSelect>
</Story>

<Story name="Disabled" asChild>
  <NativeSelect value="react" aria-label="Framework" disabled>
    <option value="react">React</option>
    <option value="vue">Vue</option>
  </NativeSelect>
</Story>

<Story name="Controlled" asChild>
  <NativeSelect bind:value aria-label="Framework">
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="svelte">Svelte</option>
  </NativeSelect>
</Story>

<Story name="As Child" exportName="AsChild" asChild>
  <NativeSelect>
    {#snippet asChild(props)}
      <select {...props()} aria-label="Framework">
        <option value="" disabled selected>Choose framework</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </select>
    {/snippet}
  </NativeSelect>
</Story>

<Story name="Grouping" asChild>
  <NativeSelect value="" aria-label="Framework">
    <option value="" disabled>Choose framework</option>
    <optgroup label="UI libraries">
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </optgroup>
    <optgroup label="Meta-frameworks">
      <option value="next">Next.js</option>
      <option value="sveltekit">SvelteKit</option>
    </optgroup>
  </NativeSelect>
</Story>

<Story name="Invalid" asChild>
  <Field invalid>
    <FieldLabel>Framework</FieldLabel>
    <NativeSelect value="" name="framework">
      <option value="" disabled>Choose framework</option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </NativeSelect>
    <FieldErrorText>Choose a framework.</FieldErrorText>
  </Field>
</Story>

<Story name="Multiple" asChild>
  <NativeSelect value={['react', 'vue']} multiple size={3} aria-label="Frameworks">
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="svelte">Svelte</option>
  </NativeSelect>
</Story>

<Story name="With Field" asChild>
  <Field required>
    <FieldLabel>Framework</FieldLabel>
    <NativeSelect value="" name="framework">
      <option value="" disabled>Choose framework</option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
      <option value="svelte">Svelte</option>
    </NativeSelect>
    <FieldHelperText>Select the framework used by this project.</FieldHelperText>
  </Field>
</Story>