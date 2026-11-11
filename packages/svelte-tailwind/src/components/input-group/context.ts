import { getContext, setContext } from 'svelte';
import type { InputSize } from '../input';

export type InputGroupSize = InputSize;

export type InputGroupAddonAlign = 'inline' | 'block';

type InputGroupSizeAccessor = () => InputGroupSize;

const inputGroupSizeContextKey = Symbol('InputGroupSize');

export const setInputGroupSize = (size: InputGroupSizeAccessor) =>
  setContext(inputGroupSizeContextKey, size);

export const useInputGroupSize = (): InputGroupSizeAccessor =>
  getContext<InputGroupSizeAccessor | undefined>(inputGroupSizeContextKey) ?? (() => 'md');