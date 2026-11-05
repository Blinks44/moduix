<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
  import {
    NumberInput,
    NumberInputContext,
    NumberInputControl,
    NumberInputDecrementTrigger,
    NumberInputField,
    NumberInputIncrementTrigger,
    NumberInputInput,
    NumberInputLabel,
    NumberInputRootProvider,
    NumberInputScrubber,
    NumberInputValueText,
    useNumberInput,
  } from '@/components/number-input';
  import { ChevronDownIcon, ChevronUpIcon } from '@/lib/moduix/icons/ui';

  const { Story } = defineMeta({
    title: 'Components/NumberInput',
    component: NumberInput,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const stackClass = 'grid items-start gap-3';
  const hintClass = 'text-xs leading-4 text-muted-foreground';
  const customButtonClass = 'bg-muted hover:bg-accent [&>svg]:size-4';
  const customInputClass = 'w-28 text-lg';
</script>

<script lang="ts">
  let value = $state('24');
  const numberInput = useNumberInput({
    id: 'root-provider-number-input',
    defaultValue: '3',
    min: 1,
    max: 10,
  });
</script>

<Story name="Basic" asChild>
  <NumberInput defaultValue="100">
    <NumberInputLabel>Amount</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</Story>

<Story name="Controlled" asChild>
  <div class={stackClass}>
    <NumberInput bind:value>
      <NumberInputLabel>Controlled value</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <span class={hintClass}>Current value: {value || 'empty'}</span>
  </div>
</Story>

<Story name="Min Max And Step" asChild>
  <NumberInput defaultValue="10" min={0} max={20} step={2}>
    <NumberInputLabel>Quantity (0-20, step 2)</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</Story>

<Story name="Sizes" asChild>
  <div class={stackClass}>
    <NumberInput size="xs" defaultValue="8">
      <NumberInputLabel>Extra small</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <NumberInput size="sm" defaultValue="8">
      <NumberInputLabel>Small</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <NumberInput size="md" defaultValue="8">
      <NumberInputLabel>Medium</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <NumberInput size="lg" defaultValue="8">
      <NumberInputLabel>Large</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <NumberInput size="xl" defaultValue="8">
      <NumberInputLabel>Extra large</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  </div>
</Story>

<Story name="Fraction Digits" asChild>
  <NumberInput
    defaultValue="12.5"
    step={0.25}
    formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
  >
    <NumberInputLabel>Hours</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</Story>

<Story name="Scrubber" asChild>
  <NumberInput defaultValue="250">
    <NumberInputLabel>Adjust value</NumberInputLabel>
    <NumberInputScrubber>Drag left or right to adjust</NumberInputScrubber>
    <NumberInputField />
  </NumberInput>
</Story>

<Story name="Mouse Wheel" asChild>
  <NumberInput defaultValue="5" allowMouseWheel>
    <NumberInputLabel>Mouse wheel enabled</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</Story>

<Story name="Formatted" asChild>
  <NumberInput
    defaultValue="1250"
    min={0}
    step={50}
    formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
  >
    <NumberInputLabel>Price</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</Story>

<Story name="With Field Validation" asChild>
  <Field invalid>
    <NumberInput min={1} max={10} required>
      <NumberInputLabel>Items</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <FieldHelperText>Choose between 1 and 10 items.</FieldHelperText>
    <FieldErrorText>Value should be between 1 and 10.</FieldErrorText>
  </Field>
</Story>

<Story name="Disabled And Read Only" asChild>
  <div class={stackClass}>
    <NumberInput defaultValue="4" disabled>
      <NumberInputLabel>Disabled quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <NumberInput defaultValue="8" readOnly>
      <NumberInputLabel>Read-only quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  </div>
</Story>

<Story name="Value Text" asChild>
  <NumberInput defaultValue="42">
    <NumberInputLabel>Value preview</NumberInputLabel>
    <NumberInputField />
    <NumberInputValueText />
  </NumberInput>
</Story>

<Story name="Root Provider" asChild>
  <div class={stackClass}>
    <NumberInputRootProvider value={numberInput}>
      <NumberInputLabel>Guests</NumberInputLabel>
      <NumberInputField />
    </NumberInputRootProvider>
    <button type="button" onclick={() => numberInput().setToMax()}>Set to max</button>
  </div>
</Story>

<Story name="Custom Icons" asChild>
  <NumberInput
    defaultValue="8"
    translations={{ decrementLabel: 'Decrease floors', incrementLabel: 'Increase floors' }}
  >
    <NumberInputLabel>Floors</NumberInputLabel>
    <NumberInputControl>
      <NumberInputDecrementTrigger class={customButtonClass}>
        <ChevronDownIcon />
      </NumberInputDecrementTrigger>
      <NumberInputInput class={customInputClass} />
      <NumberInputIncrementTrigger class={customButtonClass}>
        <ChevronUpIcon />
      </NumberInputIncrementTrigger>
    </NumberInputControl>
  </NumberInput>
</Story>

<Story name="Context" asChild>
  <NumberInput defaultValue="42">
    <NumberInputLabel>Amount</NumberInputLabel>
    <NumberInputField />
    <NumberInputContext>
      {#snippet render(context)}
        <output>Numeric value: {context().valueAsNumber}</output>
      {/snippet}
    </NumberInputContext>
  </NumberInput>
</Story>