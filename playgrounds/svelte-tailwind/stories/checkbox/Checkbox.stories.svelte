<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxLabel,
    CheckboxRootProvider,
    useCheckbox,
  } from '@/components/checkbox';
  import { Fieldset, FieldsetLegend } from '@/components/fieldset';
  import CheckboxItem from './CheckboxItem.svelte';

  const { Story } = defineMeta({
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const notificationOptions = [
    { value: 'email', label: 'Email updates' },
    { value: 'push', label: 'Push notifications' },
    { value: 'sms', label: 'SMS alerts' },
  ];

  const sizeOptions = [
    { value: 'xs', label: 'Extra-small' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra-large' },
  ] as const;

  const frameworkOptions = [
    { value: 'react', label: 'React' },
    { value: 'solid', label: 'Solid' },
    { value: 'vue', label: 'Vue' },
  ];

  const extendedFrameworkOptions = [...frameworkOptions, { value: 'svelte', label: 'Svelte' }];

  const stackClass = 'flex flex-col items-start gap-3';
  const hintClass = 'text-xs leading-4 text-muted-foreground';
  const buttonClass = 'rounded-sm border border-border bg-background px-3 py-2 text-sm leading-5';
  const narrowClass = 'flex w-72 flex-col items-start gap-3';
  const wrapperClass = 'flex flex-col items-start gap-2';
  const groupHeadingClass = 'text-sm leading-5 font-semibold text-foreground';
  const customGroupClass = 'gap-3 text-primary';
  const customRootClass = 'gap-3 text-primary';
</script>

<script lang="ts">
  let checked = $state(true);
  let alerts = $state(['push']);
  let result = $state('frameworks: []');
  let selected = $state(['react']);
  const checkbox = useCheckbox({ defaultChecked: true });
  const allValues = frameworkOptions.map((option) => option.value);
  const allSelected = $derived(selected.length === allValues.length);
  const indeterminate = $derived(selected.length > 0 && selected.length < allValues.length);
</script>

<Story name="Basic" asChild>
  <CheckboxItem defaultChecked>Enable notifications</CheckboxItem>
</Story>

<Story name="Controlled" asChild>
  <div class={stackClass}>
    <CheckboxItem {checked} onCheckedChange={(details) => (checked = details.checked === true)}>
      {checked ? 'Enabled' : 'Disabled'}
    </CheckboxItem>
    <span class={hintClass}>Current value: {String(checked)}</span>
  </div>
</Story>

<Story name="Root Provider" asChild>
  <div class={stackClass}>
    <CheckboxRootProvider value={checkbox}>
      <CheckboxControl />
      <CheckboxLabel>Managed outside the tree</CheckboxLabel>
      <CheckboxHiddenInput />
    </CheckboxRootProvider>
    <button
      type="button"
      class={buttonClass}
      onclick={() => checkbox().setChecked(!checkbox().checked)}
    >
      {checkbox().checked ? 'Uncheck' : 'Check'}
    </button>
  </div>
</Story>

<Story name="Indeterminate" asChild>
  <CheckboxItem checked="indeterminate">Select all team members</CheckboxItem>
</Story>

<Story name="Sizes" asChild>
  <div class={stackClass}>
    {#each sizeOptions as option (option.value)}
      <CheckboxItem size={option.value} defaultChecked>{option.label}</CheckboxItem>
    {/each}
  </div>
</Story>

<Story name="Disabled" asChild>
  <div class={stackClass}>
    <CheckboxItem disabled>Receive weekly summary</CheckboxItem>
    <CheckboxItem defaultChecked disabled>Share anonymous usage data</CheckboxItem>
  </div>
</Story>

<Story name="Read Only" asChild>
  <div class={stackClass}>
    <CheckboxItem readOnly>Keep current selection</CheckboxItem>
    <CheckboxItem defaultChecked readOnly>Preserve existing setting</CheckboxItem>
  </div>
</Story>

<Story name="Invalid" asChild>
  <div class={stackClass}>
    <CheckboxItem invalid required>Accept the data processing terms</CheckboxItem>
    <CheckboxItem defaultChecked invalid>Keep the invalid selection</CheckboxItem>
  </div>
</Story>

<Story name="Content Resilience" asChild>
  <div class={narrowClass}>
    <CheckboxItem defaultChecked>
      Email me a weekly summary of security, billing, and workspace activity
    </CheckboxItem>
    <CheckboxItem>
      Allow administrators to contact me when an account setting needs attention
    </CheckboxItem>
  </div>
</Story>

<Story name="Custom Indicator" asChild>
  <CheckboxItem defaultChecked indicator="custom">Custom indicator</CheckboxItem>
</Story>

<Story name="Group" asChild>
  <div class={wrapperClass}>
    <div class={groupHeadingClass}>Notification Channels</div>
    <CheckboxGroup defaultValue={['email']} name="notifications">
      {#each notificationOptions as option (option.value)}
        <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
      {/each}
    </CheckboxGroup>
  </div>
</Story>

<Story name="Group Controlled" asChild>
  <div class={wrapperClass}>
    <div class={groupHeadingClass}>Active Alerts</div>
    <CheckboxGroup bind:value={alerts} name="alerts">
      {#each notificationOptions as option (option.value)}
        <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
      {/each}
    </CheckboxGroup>
    <span class={hintClass}>Current value: {alerts.join(', ') || 'none'}</span>
  </div>
</Story>

<Story name="Group With Fieldset" asChild>
  <Fieldset>
    <FieldsetLegend>Frameworks</FieldsetLegend>
    <CheckboxGroup defaultValue={['react']} name="frameworks">
      {#each frameworkOptions as option (option.value)}
        <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
      {/each}
    </CheckboxGroup>
  </Fieldset>
</Story>

<Story name="Group With Max Selected" asChild>
  <CheckboxGroup defaultValue={['react', 'solid']} maxSelectedValues={2} name="frameworks">
    {#each extendedFrameworkOptions as option (option.value)}
      <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
    {/each}
  </CheckboxGroup>
</Story>

<Story name="Group With Form" asChild>
  <form
    class={stackClass}
    onsubmit={(event) => {
      event.preventDefault();
      result = `frameworks: ${JSON.stringify(new FormData(event.currentTarget).getAll('frameworks'))}`;
    }}
  >
    <CheckboxGroup defaultValue={['react']} name="frameworks">
      {#each frameworkOptions as option (option.value)}
        <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
      {/each}
    </CheckboxGroup>
    <button type="submit" class={buttonClass}>Submit</button>
    <span class={hintClass}>{result}</span>
  </form>
</Story>

<Story name="Group With Select All" asChild>
  <div class={wrapperClass}>
    <CheckboxItem
      checked={indeterminate ? 'indeterminate' : allSelected}
      onCheckedChange={(details) => (selected = details.checked === true ? allValues : [])}
    >
      Select all
    </CheckboxItem>
    <CheckboxGroup bind:value={selected} name="frameworks">
      {#each frameworkOptions as option (option.value)}
        <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
      {/each}
    </CheckboxGroup>
  </div>
</Story>

<Story name="Invalid Group" asChild>
  <div class={wrapperClass}>
    <div class={groupHeadingClass}>Notification Channels</div>
    <CheckboxGroup invalid defaultValue={['email']} name="channels">
      {#each notificationOptions as option (option.value)}
        <CheckboxItem value={option.value}>{option.label}</CheckboxItem>
      {/each}
    </CheckboxGroup>
    <span class={hintClass}>Use `invalid` on the group when selection is required.</span>
  </div>
</Story>

<Story name="Custom Styling" asChild>
  <div class={wrapperClass}>
    <div class={groupHeadingClass}>Styled Channels</div>
    <CheckboxGroup defaultValue={['email']} class={customGroupClass} name="styled-channels">
      {#each notificationOptions as option (option.value)}
        <CheckboxItem value={option.value} class={customRootClass} indicator="custom" customStyled>
          {option.label}
        </CheckboxItem>
      {/each}
    </CheckboxGroup>
  </div>
</Story>