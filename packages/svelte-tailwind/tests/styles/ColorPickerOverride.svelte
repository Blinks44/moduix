<script lang="ts">
  import {
    ColorPicker,
    ColorPickerControl,
    ColorPickerTrigger,
    parseColor,
  } from '@/components/color-picker';
</script>

<ColorPicker class="w-80" defaultValue={parseColor('#eb5e41')}>
  <ColorPickerControl>
    <ColorPickerTrigger aria-label="Open color picker" />
  </ColorPickerControl>
</ColorPicker>