<script lang="ts">
  import { Tag, TagCloseTrigger, TagEndElement, TagLabel } from '@/components/tag';

  let {
    clicked,
    label,
    labelledby,
    size = 'md',
    submitted,
    variant = 'default',
  }: {
    clicked: () => void;
    label?: string;
    labelledby?: string;
    size?: 'sm' | 'md' | 'lg';
    submitted: () => void;
    variant?: 'default' | 'outline';
  } = $props();
</script>

<form
  onsubmit={(event) => {
    event.preventDefault();
    submitted();
  }}
>
  <span id="remove-label">Remove chosen filter</span>
  <Tag {size} {variant} data-testid="tag">
    <TagLabel>Filter</TagLabel>
    <TagEndElement>
      <TagCloseTrigger aria-label={label} aria-labelledby={labelledby} onclick={clicked} />
    </TagEndElement>
  </Tag>
</form>