<script setup lang="ts">
import {
  MenuItem,
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '../../src';
</script>

<template>
  <SplitButton default-open :portalled="false" aria-label="Inline actions">
    <SplitButtonAction as-child><a href="#docs">Docs</a></SplitButtonAction>
    <SplitButtonTrigger aria-label="Inline options" />
    <SplitButtonPositioner
      ><SplitButtonContent
        ><MenuItem value="draft">Save draft</MenuItem></SplitButtonContent
      ></SplitButtonPositioner
    >
  </SplitButton>
  <SplitButton aria-label="Closed actions">
    <SplitButtonAction as-child><a href="#docs">Docs</a></SplitButtonAction>
    <SplitButtonTrigger aria-label="Closed options" />
    <SplitButtonPositioner
      ><SplitButtonContent
        ><MenuItem value="draft">Save draft</MenuItem></SplitButtonContent
      ></SplitButtonPositioner
    >
  </SplitButton>
  <SplitButton default-open aria-label="Portalled actions">
    <SplitButtonAction as-child><a href="#docs">Docs</a></SplitButtonAction>
    <SplitButtonTrigger aria-label="Portalled options" />
    <SplitButtonPositioner
      ><SplitButtonContent
        ><MenuItem value="draft">Save draft</MenuItem></SplitButtonContent
      ></SplitButtonPositioner
    >
  </SplitButton>
</template>