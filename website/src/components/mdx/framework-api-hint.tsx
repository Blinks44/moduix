import { useExampleSelection } from './example-panel';

type BindingProp = 'value' | 'open' | 'checked';

const notation: Record<
  'react' | 'solid' | 'vue' | 'svelte',
  Record<BindingProp, { controlled: string; event: string; note: string }>
> = {
  react: {
    value: {
      controlled: 'value={value} onValueChange={(d) => setValue(d.value)}',
      event: 'onValueChange',
      note: 'React uses controlled props with camelCase callback handlers.',
    },
    open: {
      controlled: 'open={open} onOpenChange={(d) => setOpen(d.open)}',
      event: 'onOpenChange',
      note: 'React uses controlled props with camelCase callback handlers.',
    },
    checked: {
      controlled: 'checked={checked} onCheckedChange={(d) => setChecked(d.checked)}',
      event: 'onCheckedChange',
      note: 'React uses controlled props with camelCase callback handlers.',
    },
  },
  solid: {
    value: {
      controlled: 'value={value()} onValueChange={(d) => setValue(d.value)}',
      event: 'onValueChange',
      note: 'Solid reads signal accessors and uses camelCase Ark callbacks.',
    },
    open: {
      controlled: 'open={open()} onOpenChange={(d) => setOpen(d.open)}',
      event: 'onOpenChange',
      note: 'Solid reads signal accessors and uses camelCase Ark callbacks.',
    },
    checked: {
      controlled: 'checked={checked()} onCheckedChange={(d) => setChecked(d.checked)}',
      event: 'onCheckedChange',
      note: 'Solid reads signal accessors and uses camelCase Ark callbacks.',
    },
  },
  vue: {
    value: {
      controlled: 'v-model="value" / @value-change="onChange"',
      event: '@value-change',
      note: 'Vue maps controlled props to v-model and Ark callbacks to kebab-case emits.',
    },
    open: {
      controlled: 'v-model:open="open" / @open-change="onChange"',
      event: '@open-change',
      note: 'Vue maps controlled props to v-model and Ark callbacks to kebab-case emits.',
    },
    checked: {
      controlled: 'v-model:checked="checked" / @checked-change="onChange"',
      event: '@checked-change',
      note: 'Vue maps controlled props to v-model and Ark callbacks to kebab-case emits.',
    },
  },
  svelte: {
    value: {
      controlled: 'bind:value={value} / onValueChange={(d) => ...}',
      event: 'onValueChange',
      note: 'Svelte supports two-way bind: directives alongside camelCase callback props.',
    },
    open: {
      controlled: 'bind:open={open} / onOpenChange={(d) => ...}',
      event: 'onOpenChange',
      note: 'Svelte supports two-way bind: directives alongside camelCase callback props.',
    },
    checked: {
      controlled: 'bind:checked={checked} / onCheckedChange={(d) => ...}',
      event: 'onCheckedChange',
      note: 'Svelte supports two-way bind: directives alongside camelCase callback props.',
    },
  },
};

export function FrameworkApiHint({ prop = 'value' }: { prop?: BindingProp }) {
  const { framework } = useExampleSelection();

  if (import.meta.env.SSG_MD) {
    return `\n> Framework binding: React/Solid \`${prop}\` + \`on${prop[0].toUpperCase()}${prop.slice(1)}Change\`; Vue \`v-model${prop === 'value' ? '' : `:${prop}`}\` / \`@${prop}-change\`; Svelte \`bind:${prop}\` / \`on${prop[0].toUpperCase()}${prop.slice(1)}Change\`.\n`;
  }

  const info = notation[framework.value][prop];

  return (
    <div
      className="rp-not-doc"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px 12px',
        margin: '12px 0 18px',
        padding: '10px 14px',
        border: '1px solid var(--rp-c-divider)',
        borderRadius: '10px',
        background: 'var(--rp-c-bg-soft)',
        fontSize: '13px',
        lineHeight: '20px',
        color: 'var(--rp-c-text-2)',
      }}
    >
      <strong style={{ color: 'var(--rp-c-text-0)', fontWeight: 600 }}>
        {framework.label} binding:
      </strong>
      <code
        style={{
          padding: '2px 7px',
          borderRadius: '6px',
          border: '1px solid var(--rp-c-divider)',
          background: 'var(--rp-c-bg)',
          color: 'var(--rp-c-text-0)',
          fontFamily: 'var(--rp-font-family-mono)',
          fontSize: '12px',
        }}
      >
        {info.controlled}
      </code>
      <span>{info.note}</span>
    </div>
  );
}