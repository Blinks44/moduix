<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Field, FieldErrorText } from '@/components/field';
  import {
    PinInput,
    PinInputControl,
    PinInputHiddenInput,
    PinInputInput,
    PinInputInputs,
    PinInputLabel,
    PinInputRootProvider,
    PinInputSeparator,
    usePinInput,
  } from '@/components/pin-input';
  import styles from './PinInput.stories.module.css';

  const PIN_COUNT = 6;

  const { Story } = defineMeta({
    title: 'Components/PinInput',
    component: PinInput,
    args: { count: PIN_COUNT },
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value: string[] = $state([]);
  let invalidValue = $state('');
  const pinInput = usePinInput({ id: 'root-provider-pin-input', count: PIN_COUNT });
</script>

<Story name="Basic" asChild>
  <PinInput count={PIN_COUNT}>
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
    <PinInputHiddenInput />
  </PinInput>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.stack}>
    <PinInput count={PIN_COUNT} size="xs">
      <PinInputLabel>Extra small</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
    <PinInput count={PIN_COUNT} size="sm">
      <PinInputLabel>Small</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
    <PinInput count={PIN_COUNT} size="md">
      <PinInputLabel>Medium</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
    <PinInput count={PIN_COUNT} size="lg">
      <PinInputLabel>Large</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
    <PinInput count={PIN_COUNT} size="xl">
      <PinInputLabel>Extra large</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  </div>
</Story>

<Story name="Alphanumeric" asChild>
  <div class={styles.stack}>
    <PinInput count={PIN_COUNT} type="alphanumeric" bind:value>
      <PinInputLabel>Recovery code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
    <p class={styles.hint}>Current value: {value.join('') || 'empty'}</p>
  </div>
</Story>

<Story name="Grouped Layout" asChild>
  <PinInput count={PIN_COUNT}>
    <PinInputLabel>Auth code</PinInputLabel>
    <PinInputControl>
      {#each [0, 1, 2] as index (index)}
        <PinInputInput {index} />
      {/each}
      <PinInputSeparator />
      {#each [3, 4, 5] as index (index)}
        <PinInputInput {index} />
      {/each}
    </PinInputControl>
  </PinInput>
</Story>

<Story name="Placeholder" asChild>
  <PinInput count={PIN_COUNT} placeholder="*">
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
    <PinInputHiddenInput />
  </PinInput>
</Story>

<Story name="Masked" asChild>
  <PinInput count={4} mask>
    <PinInputLabel>PIN</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
  </PinInput>
</Story>

<Story name="Otp Mode" asChild>
  <PinInput count={PIN_COUNT} otp name="verificationCode">
    <PinInputLabel>One-time code</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
    <PinInputHiddenInput />
  </PinInput>
</Story>

<Story name="Blur On Complete" asChild>
  <PinInput count={PIN_COUNT} blurOnComplete>
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
  </PinInput>
</Story>

<Story name="With Field Validation" asChild>
  <Field invalid required>
    <PinInput count={PIN_COUNT}>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
    <FieldErrorText>Please enter the verification code.</FieldErrorText>
  </Field>
</Story>

<Story name="Invalid Value" asChild>
  <div class={styles.stack}>
    <PinInput
      count={PIN_COUNT}
      type="alphabetic"
      onValueInvalid={(details) => (invalidValue = details.value)}
    >
      <PinInputLabel>Invite code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
    <p class={styles.hint}>Last rejected character: {invalidValue || 'none'}</p>
  </div>
</Story>

<Story name="Root Provider" asChild>
  <div class={styles.stack}>
    <PinInputRootProvider value={pinInput}>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInputRootProvider>
    <button type="button" onclick={() => pinInput().clearValue()}>Clear value</button>
  </div>
</Story>

<Story name="Custom Styling" asChild>
  <PinInput count={PIN_COUNT} class={styles.customRoot}>
    <PinInputLabel>Styled code</PinInputLabel>
    <PinInputControl>
      {#each [0, 1, 2] as index (index)}
        <PinInputInput {index} class={styles.customInput} />
      {/each}
      <PinInputSeparator />
      {#each [3, 4, 5] as index (index)}
        <PinInputInput {index} class={styles.customInput} />
      {/each}
    </PinInputControl>
  </PinInput>
</Story>