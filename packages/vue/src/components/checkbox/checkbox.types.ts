export interface CheckboxGroupEmits {
  valueChange: (value: string[]) => void;
  'update:modelValue': (value: string[]) => void;
}