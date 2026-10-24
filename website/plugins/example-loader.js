import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

// Expands `<Example name="button/basic" />` in MDX into the preview frame and the React, Solid,
// Vue, and CSS sources. It runs as a loader, not a remark plugin, because Rspress skips custom
// remark plugins when it renders the Markdown pages used by llms.txt.

const websiteRoot = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const examplePattern = /^<Example name="([^"]+)"([^>]*?)\s*\/>$/gm;

function toIdentifier(name) {
  return name.replace(/(^|[/-])(\w)/g, (_, __, letter) => letter.toUpperCase());
}

function cssImports(reactFile) {
  const source = readFileSync(reactFile, 'utf8');
  return [...source.matchAll(/^import \w+ from '([^']+\.css)';$/gm)].map(([, specifier]) =>
    specifier.startsWith('@/')
      ? path.join(websiteRoot, 'src', specifier.slice(2))
      : path.join(path.dirname(reactFile), specifier),
  );
}

export default function exampleLoader(source) {
  if (!source.includes('<Example ')) return source;

  const relative = (file) => path.relative(path.dirname(this.resourcePath), file);
  const imports = new Set();

  const content = source.replace(examplePattern, (_, name, attributes) => {
    const dir = path.dirname(name);
    const base = path.basename(name);
    const reactFile = path.join(websiteRoot, 'src/components/examples', dir, `${base}.tsx`);
    const solidFile = path.join(websiteRoot, 'snippets', dir, 'solid', `${base}.tsx`);
    const vueFile = path.join(websiteRoot, 'snippets', dir, 'vue', `${base}.vue`);
    for (const file of [reactFile, solidFile, vueFile]) {
      if (!existsSync(file)) throw new Error(`<Example name="${name}"> cannot find ${file}.`);
      this.addDependency(file);
    }

    const identifier = `Example${toIdentifier(name)}`;
    imports.add(`import ${identifier} from '@/components/examples/${dir}/${base}.tsx';`);
    imports.add(`import ${identifier}Solid from '${relative(solidFile)}?raw';`);
    imports.add(`import ${identifier}Vue from '${relative(vueFile)}?raw';`);

    const styles = cssImports(reactFile).map(
      (file) => `\`\`\`css title="${path.basename(file)}" file="${relative(file)}"\n\`\`\``,
    );

    return `<ExampleFrame variant="component"${attributes}>
  <${identifier} />
</ExampleFrame>

<ExampleCode>
<div className="docs-reference">
  <Tabs
    groupId="framework"
    values={[
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
    ]}
    className="docs-tabs"
  >
    <Tab value="react">

\`\`\`tsx pure file="${relative(reactFile)}"
\`\`\`

    </Tab>
    <Tab value="solid">

<CodeBlockRuntime lang="tsx" code={${identifier}Solid} />

    </Tab>
    <Tab value="vue">

<CodeBlockRuntime lang="vue" code={${identifier}Vue} />

    </Tab>
  </Tabs>

${styles.join('\n\n')}
</div>

</ExampleCode>`;
  });

  const frontmatter = content.match(/^---\n[\s\S]*?\n---\n/)?.[0] ?? '';
  return `${frontmatter}\n${[...imports].join('\n')}\n${content.slice(frontmatter.length)}`;
}