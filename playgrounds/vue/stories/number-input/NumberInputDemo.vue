<script setup lang="ts">
import { ref } from 'vue';
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
import { ChevronDownIcon, ChevronUpIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './NumberInput.stories.module.css';

defineProps<{
  scenario:
    | 'basic'
    | 'controlled'
    | 'min-max-and-step'
    | 'fraction-digits'
    | 'scrubber'
    | 'mouse-wheel'
    | 'formatted'
    | 'field-validation'
    | 'disabled-and-read-only'
    | 'value-text'
    | 'root-provider'
    | 'custom-icons'
    | 'context';
}>();

const value = ref('24');
const numberInput = useNumberInput({ defaultValue: '3', min: 1, max: 10 });
</script>

<template>
  <NumberInput v-if="scenario === 'basic'" default-value="100">
    <NumberInputLabel>Amount</NumberInputLabel>
    <NumberInputField />
  </NumberInput>

  <div v-else-if="scenario === 'controlled'" :class="styles.stack">
    <NumberInput v-model="value">
      <NumberInputLabel>Controlled value</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <span :class="styles.hint">Current value: {{ value || 'empty' }}</span>
  </div>

  <NumberInput
    v-else-if="scenario === 'min-max-and-step'"
    default-value="10"
    :min="0"
    :max="20"
    :step="2"
  >
    <NumberInputLabel>Quantity (0-20, step 2)</NumberInputLabel>
    <NumberInputField />
  </NumberInput>

  <NumberInput
    v-else-if="scenario === 'fraction-digits'"
    default-value="12.5"
    :step="0.25"
    :format-options="{ minimumFractionDigits: 2, maximumFractionDigits: 2 }"
  >
    <NumberInputLabel>Hours</NumberInputLabel>
    <NumberInputField />
  </NumberInput>

  <NumberInput v-else-if="scenario === 'scrubber'" default-value="250">
    <NumberInputLabel>Adjust value</NumberInputLabel>
    <NumberInputScrubber>Drag left or right to adjust</NumberInputScrubber>
    <NumberInputField />
  </NumberInput>

  <NumberInput v-else-if="scenario === 'mouse-wheel'" default-value="5" allow-mouse-wheel>
    <NumberInputLabel>Mouse wheel enabled</NumberInputLabel>
    <NumberInputField />
  </NumberInput>

  <NumberInput
    v-else-if="scenario === 'formatted'"
    default-value="1250"
    :min="0"
    :step="50"
    :format-options="{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }"
  >
    <NumberInputLabel>Price</NumberInputLabel>
    <NumberInputField />
  </NumberInput>

  <Field v-else-if="scenario === 'field-validation'" invalid>
    <NumberInput :min="1" :max="10" required>
      <NumberInputLabel>Items</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <FieldHelperText>Choose between 1 and 10 items.</FieldHelperText>
    <FieldErrorText>Value should be between 1 and 10.</FieldErrorText>
  </Field>

  <div v-else-if="scenario === 'disabled-and-read-only'" :class="styles.stack">
    <NumberInput default-value="4" disabled>
      <NumberInputLabel>Disabled quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
    <NumberInput default-value="8" read-only>
      <NumberInputLabel>Read-only quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  </div>

  <NumberInput v-else-if="scenario === 'value-text'" default-value="42">
    <NumberInputLabel>Value preview</NumberInputLabel>
    <NumberInputField />
    <NumberInputValueText />
  </NumberInput>

  <div v-else-if="scenario === 'root-provider'" :class="styles.stack">
    <NumberInputRootProvider :value="numberInput">
      <NumberInputLabel>Guests</NumberInputLabel>
      <NumberInputField />
    </NumberInputRootProvider>
    <button type="button" @click="numberInput.setToMax()">Set to max</button>
  </div>

  <NumberInput
    v-else-if="scenario === 'custom-icons'"
    default-value="8"
    :translations="{ decrementLabel: 'Decrease floors', incrementLabel: 'Increase floors' }"
  >
    <NumberInputLabel>Floors</NumberInputLabel>
    <NumberInputControl>
      <NumberInputDecrementTrigger :class="styles.customButton">
        <ChevronDownIcon />
      </NumberInputDecrementTrigger>
      <NumberInputInput :class="styles.customInput" />
      <NumberInputIncrementTrigger :class="styles.customButton">
        <ChevronUpIcon />
      </NumberInputIncrementTrigger>
    </NumberInputControl>
  </NumberInput>

  <NumberInput v-else default-value="42">
    <NumberInputLabel>Amount</NumberInputLabel>
    <NumberInputField />
    <NumberInputContext v-slot="context">
      <output>Numeric value: {{ context.valueAsNumber }}</output>
    </NumberInputContext>
  </NumberInput>
</template>