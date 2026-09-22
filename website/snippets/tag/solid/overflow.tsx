import { Tag, TagCloseTrigger, TagEndElement, TagLabel } from '@moduix/solid/tag';
import styles from '@/components/examples/tag/tag-overflow.module.css';

const label = 'Ready for stakeholder review after legal approval';

export default function TagTruncatedDemo() {
  return (
    <Tag class={styles.constrained}>
      <TagLabel title={label}>{label}</TagLabel>
      <TagEndElement>
        <TagCloseTrigger aria-label="Remove long tag" />
      </TagEndElement>
    </Tag>
  );
}
