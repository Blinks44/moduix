<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import { Field, FieldErrorText, FieldLabel } from '@/components/field';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupClearTrigger,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
  } from '@/components/input-group';
  import styles from './InputGroup.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/InputGroup',
    component: InputGroup,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let emailValue = $state('');
  let messageValue = $state('');
  let searchValue = $state('moduix');
  let searchInput: Element | null = $state(null);
</script>

<Story name="Default" asChild>
  <Field class={styles.field}>
    <FieldLabel>Workspace</FieldLabel>
    <InputGroup>
      <InputGroupAddon>@</InputGroupAddon>
      <InputGroupInput placeholder="maps" />
    </InputGroup>
  </Field>
</Story>

<Story name="With Action" exportName="WithAction" asChild>
  <Field class={styles.field}>
    <FieldLabel>Invite by email</FieldLabel>
    <InputGroup>
      <InputGroupInput bind:value={emailValue} type="email" placeholder="name@example.com" />
      <InputGroupButton disabled={!emailValue}>Send</InputGroupButton>
    </InputGroup>
  </Field>
</Story>

<Story name="Textarea" asChild>
  <Field class={styles.field}>
    <FieldLabel>Message</FieldLabel>
    <InputGroup>
      <InputGroupTextarea bind:value={messageValue} autoresize placeholder="Write a reply" />
      <InputGroupAddon align="block">
        {messageValue.length}/280
        <Button class={styles.send} size="sm" disabled={!messageValue.trim()}>Send</Button>
      </InputGroupAddon>
    </InputGroup>
  </Field>
</Story>

<Story name="Prefix Suffix" exportName="PrefixSuffix" asChild>
  <Field class={styles.field}>
    <FieldLabel>Monthly budget</FieldLabel>
    <InputGroup>
      <InputGroupAddon class={styles.currency}>$</InputGroupAddon>
      <InputGroupInput inputmode="decimal" placeholder="2500" />
      <InputGroupText>USD</InputGroupText>
    </InputGroup>
  </Field>
</Story>

<Story name="As Child" exportName="AsChild" asChild>
  <Field class={styles.field}>
    <FieldLabel>Workspace</FieldLabel>
    <InputGroup>
      {#snippet asChild(props)}
        <div {...props()}>
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput placeholder="maps" />
        </div>
      {/snippet}
    </InputGroup>
  </Field>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.stack}>
    <InputGroup size="xs"
      ><InputGroupAddon>@</InputGroupAddon><InputGroupInput
        placeholder="Extra-small group"
      /></InputGroup
    >
    <InputGroup size="sm"
      ><InputGroupAddon>@</InputGroupAddon><InputGroupInput placeholder="Small group" /></InputGroup
    >
    <InputGroup size="md"
      ><InputGroupAddon>@</InputGroupAddon><InputGroupInput
        placeholder="Medium group"
      /></InputGroup
    >
    <InputGroup size="lg"
      ><InputGroupAddon>@</InputGroupAddon><InputGroupInput placeholder="Large group" /></InputGroup
    >
    <InputGroup size="xl"
      ><InputGroupAddon>@</InputGroupAddon><InputGroupInput
        placeholder="Extra-large group"
      /></InputGroup
    >
  </div>
</Story>

<Story name="Disabled" asChild>
  <Field class={styles.field} disabled>
    <FieldLabel>Workspace handle</FieldLabel>
    <InputGroup>
      <InputGroupAddon>@</InputGroupAddon>
      <InputGroupInput value="maps" />
      <InputGroupButton disabled>Copy</InputGroupButton>
    </InputGroup>
  </Field>
</Story>

<Story name="Read Only" exportName="ReadOnly" asChild>
  <Field class={styles.field} readOnly>
    <FieldLabel>Workspace handle</FieldLabel>
    <InputGroup>
      <InputGroupAddon>@</InputGroupAddon>
      <InputGroupInput value="maps" />
      <InputGroupButton>Copy</InputGroupButton>
    </InputGroup>
  </Field>
</Story>

<Story name="With Field Validation" exportName="WithFieldValidation" asChild>
  <Field class={styles.field} invalid>
    <FieldLabel>Domain</FieldLabel>
    <InputGroup>
      <InputGroupInput placeholder="company" />
      <InputGroupText>.test.com</InputGroupText>
    </InputGroup>
    <FieldErrorText>Please enter a domain.</FieldErrorText>
  </Field>
</Story>

<Story name="Custom Styles" exportName="CustomStyles" asChild>
  <InputGroup class={styles.customGroup}>
    <InputGroupAddon class={styles.customAddon}>@</InputGroupAddon>
    <InputGroupInput placeholder="custom-group" />
    <InputGroupButton class={styles.customButton}>Check</InputGroupButton>
  </InputGroup>
</Story>

<Story name="Clear Trigger" exportName="ClearTrigger" asChild>
  <Field class={styles.field}>
    <FieldLabel>Search</FieldLabel>
    <InputGroup>
      <InputGroupInput bind:ref={searchInput} bind:value={searchValue} placeholder="Search…" />
      {#if searchValue}
        <InputGroupClearTrigger
          aria-label="Clear search"
          onclick={() => {
            searchValue = '';
            (searchInput as HTMLInputElement).focus();
          }}
        />
      {/if}
    </InputGroup>
  </Field>
</Story>