<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
  import {
    Switch,
    SwitchControl,
    SwitchHiddenInput,
    SwitchLabel,
    SwitchRootProvider,
    SwitchThumb,
    useSwitch,
  } from '@/components/switch';
  import PowerIcon from './PowerIcon.svelte';
  import SwitchContextLabel from './SwitchContextLabel.svelte';

  const { Story } = defineMeta({
    title: 'Components/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const stackClass = 'flex flex-col items-start gap-3';
  const hintClass = 'text-xs leading-4 text-muted-foreground';
  const customIconThumbClass =
    'data-[state=checked]:text-primary data-[state=unchecked]:text-muted-foreground [&>svg]:size-3';
  const siblingRowClass = 'flex items-center gap-2';
  const labelClass = 'text-foreground text-sm leading-5 font-medium';
</script>

<script lang="ts">
  let checked = $state(true);
  let submitted = $state('Nothing submitted');
  const switchApi = useSwitch({ defaultChecked: true });
</script>

<Story name="Basic" asChild>
  <Switch defaultChecked>
    <SwitchControl />
    <SwitchLabel>Enable notifications</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</Story>

<Story name="Sizes" asChild>
  <div class={stackClass}>
    <Switch size="xs" defaultChecked>
      <SwitchControl />
      <SwitchLabel>Extra-small</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <Switch size="sm" defaultChecked>
      <SwitchControl />
      <SwitchLabel>Small</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <Switch size="md" defaultChecked>
      <SwitchControl />
      <SwitchLabel>Medium</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <Switch size="lg" defaultChecked>
      <SwitchControl />
      <SwitchLabel>Large</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <Switch size="xl" defaultChecked>
      <SwitchControl />
      <SwitchLabel>Extra-large</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  </div>
</Story>

<Story name="Disabled" asChild>
  <div class={stackClass}>
    <Switch disabled>
      <SwitchControl />
      <SwitchLabel>Enable dark mode</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <Switch defaultChecked disabled>
      <SwitchControl />
      <SwitchLabel>Keep me signed in</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  </div>
</Story>

<Story name="Controlled" asChild>
  <div class={stackClass}>
    <Switch bind:checked>
      <SwitchControl />
      <SwitchLabel>{checked ? 'On' : 'Off'}</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <span class={hintClass}>Current value: {String(checked)}</span>
  </div>
</Story>

<Story name="Read Only" asChild>
  <div class={stackClass}>
    <Switch readOnly>
      <SwitchControl />
      <SwitchLabel>Managed by policy</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <Switch defaultChecked readOnly>
      <SwitchControl />
      <SwitchLabel>Always on</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  </div>
</Story>

<Story name="Custom Icon" asChild>
  <Switch defaultChecked>
    <SwitchControl>
      <SwitchThumb class={customIconThumbClass}>
        <PowerIcon />
      </SwitchThumb>
    </SwitchControl>
    <SwitchLabel>Use custom thumb icon</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</Story>

<Story name="Context" asChild>
  <Switch defaultChecked>
    <SwitchControl />
    <SwitchContextLabel />
    <SwitchHiddenInput />
  </Switch>
</Story>

<Story name="Root Provider" asChild>
  <div class={stackClass}>
    <Button variant="outline" onclick={() => switchApi().toggleChecked()}>Toggle externally</Button>
    <SwitchRootProvider value={switchApi}>
      <SwitchControl />
      <SwitchLabel>External state owner</SwitchLabel>
      <SwitchHiddenInput />
    </SwitchRootProvider>
  </div>
</Story>

<Story name="As Child" exportName="AsChild" asChild>
  <Switch defaultChecked>
    {#snippet asChild(props)}
      <label {...props({ class: siblingRowClass })}>
        <SwitchControl />
        <span class={labelClass}>Enable reminders</span>
        <SwitchHiddenInput />
      </label>
    {/snippet}
  </Switch>
</Story>

<Story name="Native Form" asChild>
  <form
    class={stackClass}
    onsubmit={(event) => {
      event.preventDefault();
      submitted = JSON.stringify(Array.from(new FormData(event.currentTarget).entries()));
    }}
    onreset={() => (submitted = 'Nothing submitted')}
  >
    <Switch name="notifications" defaultChecked>
      <SwitchControl />
      <SwitchLabel>Notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <Button type="submit">Submit</Button>
    <Button type="reset" variant="outline">Reset</Button>
    <output>{submitted}</output>
  </form>
</Story>

<Story name="Form Integration" asChild>
  <Field invalid>
    <Switch name="notifications" required>
      <SwitchControl />
      <SwitchLabel>Notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <FieldHelperText>Used for product and account updates.</FieldHelperText>
    <FieldErrorText>Notification preference is required.</FieldErrorText>
  </Field>
</Story>