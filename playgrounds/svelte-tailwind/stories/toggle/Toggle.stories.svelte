<script module lang="ts">
  import Bell from '@lucide/svelte/icons/bell';
  import Star from '@lucide/svelte/icons/star';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Toggle, ToggleIndicator } from '@/components/toggle';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import ToggleStateLabel from './ToggleStateLabel.svelte';

  const { Story } = defineMeta({
    title: 'Components/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let pressed = $state(false);
</script>

<Story name="Default" asChild>
  <Toggle defaultPressed>
    <Star aria-hidden="true" focusable="false" />
    Favorite
  </Toggle>
</Story>

<Story name="Variants" asChild>
  <div class="flex items-center gap-2">
    <Toggle>Default</Toggle>
    <Toggle variant="outline">Outline</Toggle>
    <Toggle variant="ghost">Ghost</Toggle>
    <Toggle defaultPressed>Pressed</Toggle>
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class="flex items-center gap-2">
    <Toggle size="xs">XS</Toggle>
    <Toggle size="sm">Small</Toggle>
    <Toggle size="md">Medium</Toggle>
    <Toggle size="lg">Large</Toggle>
  </div>
</Story>

<Story name="Icons" asChild>
  <div class="flex items-center gap-2">
    <Toggle variant="outline">
      <Bell aria-hidden="true" focusable="false" />
      Alerts
    </Toggle>
    <Toggle size="icon-md" variant="outline" aria-label="Favorites">
      <Star aria-hidden="true" focusable="false" />
    </Toggle>
    <Toggle size="icon-md" variant="ghost" aria-label="Enabled" defaultPressed>
      <CheckIcon />
    </Toggle>
  </div>
</Story>

<Story name="Disabled" asChild>
  <div class="flex items-center gap-2">
    <Toggle disabled>Disabled</Toggle>
    <Toggle defaultPressed disabled>Pressed</Toggle>
  </div>
</Story>

<Story name="Content Resilience" asChild>
  <div class="flex flex-col items-start gap-3">
    <Toggle variant="outline">
      <Bell aria-hidden="true" focusable="false" />
      Receive account-security and sign-in notifications
    </Toggle>
    <Toggle size="lg" variant="ghost">Archive 1,248 completed notifications</Toggle>
  </div>
</Story>

<Story name="Controlled" asChild>
  <div class="flex flex-col items-start gap-3">
    <Toggle bind:pressed>
      <Bell aria-hidden="true" focusable="false" />
      {pressed ? 'Notifications on' : 'Notifications off'}
    </Toggle>
    <span class="text-xs leading-4 text-muted-foreground">Current value: {String(pressed)}</span>
  </div>
</Story>

<Story name="Indicator" asChild>
  <Toggle aria-label="Favorite" size="icon-md" variant="outline">
    <ToggleIndicator>
      <CheckIcon />
      {#snippet fallback()}<Star aria-hidden="true" focusable="false" />{/snippet}
    </ToggleIndicator>
  </Toggle>
</Story>

<Story name="Context" asChild>
  <Toggle defaultPressed>
    <Bell aria-hidden="true" focusable="false" />
    <ToggleStateLabel />
  </Toggle>
</Story>

<Story name="asChild" exportName="AsChild" asChild>
  <Toggle variant="outline" defaultPressed>
    {#snippet asChild(props)}
      <button {...props({ class: 'border-dashed' })} type="button">
        <CheckIcon />
        Custom button
      </button>
    {/snippet}
  </Toggle>
</Story>

<Story name="Custom Styles" asChild>
  <Toggle
    class="border-[color-mix(in_oklab,var(--color-primary)_45%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-primary)_8%,transparent)] text-primary data-[state=off]:hover:bg-[color-mix(in_oklab,var(--color-primary)_14%,transparent)] data-[state=off]:active:bg-[color-mix(in_oklab,var(--color-primary)_18%,transparent)]"
    variant="outline"
    defaultPressed
  >
    <CheckIcon />
    Styled with a class
  </Toggle>
</Story>