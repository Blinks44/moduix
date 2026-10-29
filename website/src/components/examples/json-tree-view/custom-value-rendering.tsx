import { JsonTreeView, JsonTreeViewTree } from '@moduix/react/json-tree-view';
import styles from '@/components/examples/json-tree-view/json-tree-view-custom-value-rendering.module.css';

const release = {
  name: '@moduix/react',
  repository: 'https://github.com/moduix/moduix',
  docs: 'https://moduix.dev/docs/json-tree-view',
  version: '3.2.0',
};

// String values arrive with their quotes, for example `"https://…"`.
const toUrl = (value: unknown) =>
  typeof value === 'string' && value.startsWith('"https://') ? value.slice(1, -1) : undefined;

export default function CustomValueRenderingJsonTreeViewDemo() {
  return (
    <JsonTreeView data={release} defaultExpandedDepth={1}>
      <JsonTreeViewTree
        renderValue={(node) => {
          const url = node.type === 'text' ? toUrl(node.value) : undefined;
          return url ? (
            <a href={url} target="_blank" rel="noreferrer" className={styles.link}>
              "{url}"
            </a>
          ) : undefined;
        }}
      />
    </JsonTreeView>
  );
}