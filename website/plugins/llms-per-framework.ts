import type { RspressPlugin } from '@rspress/core';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FRAMEWORKS = [
  { id: 'react', label: 'React' },
  { id: 'solid', label: 'Solid' },
  { id: 'vue', label: 'Vue' },
  { id: 'svelte', label: 'Svelte' },
] as const;

type FrameworkId = (typeof FRAMEWORKS)[number]['id'];

const FW_BLOCK_RE =
  /\n?<!-- moduix-fw:(react|solid|vue|svelte) -->\n([\s\S]*?)<!-- \/moduix-fw -->\n?/g;

const defaultOutDir = fileURLToPath(new URL('../doc_build', import.meta.url));

function normalizeMarkdown(markdown: string): string {
  return `${markdown.replace(/\n{3,}/g, '\n\n').trimEnd()}\n`;
}

function filterForFramework(
  markdown: string,
  keep: FrameworkId,
): { content: string; stripped: boolean } {
  const keepLabel = FRAMEWORKS.find((fw) => fw.id === keep)?.label;
  const labelPrefix = keepLabel ? `**${keepLabel}**\n\n` : '';
  let stripped = false;
  const filtered = markdown.replace(FW_BLOCK_RE, (_match, fw: FrameworkId, body: string) => {
    if (fw === keep) {
      const trimmed = body.trimEnd();
      const withoutRedundantLabel =
        labelPrefix && trimmed.startsWith(labelPrefix)
          ? trimmed.slice(labelPrefix.length)
          : trimmed;
      return `\n${withoutRedundantLabel}\n`;
    }
    stripped = true;
    return '\n';
  });
  return { content: normalizeMarkdown(filtered), stripped };
}

function stripMarkersOnly(markdown: string): string {
  const cleaned = markdown.replace(FW_BLOCK_RE, (_match, _fw: FrameworkId, body: string) => {
    return `\n${body.trimEnd()}\n`;
  });
  return normalizeMarkdown(cleaned);
}

function injectFrameworkNote(markdown: string, siteOrigin: string): string {
  const note =
    `> Examples on this page show React. Full framework-specific documentation: ` +
    FRAMEWORKS.map((fw) => `[${fw.label}](${siteOrigin}/llms-${fw.id}.txt)`).join(' | ') +
    '.';
  if (markdown.includes(note)) return markdown;
  const match = markdown.match(/^(# [^\n]+\n(?:\n[^\n#`>*][^\n]*\n)?)/);
  if (!match) return `${note}\n\n${markdown}`;
  const head = match[1].trimEnd();
  const rest = markdown.slice(match[1].length).replace(/^\n+/, '');
  return `${head}\n\n${note}\n\n${rest}`;
}

function walkMarkdownFiles(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMarkdownFiles(fullPath, out);
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(fullPath);
  }
  return out;
}

function updateLlmsIndex(llmsTxt: string, siteOrigin: string): string {
  const sectionHeader = '## Framework-specific full docs';
  if (llmsTxt.includes(sectionHeader)) return llmsTxt;

  const section = [
    sectionHeader,
    '',
    ...FRAMEWORKS.map(
      (fw) =>
        `- [${fw.label} full documentation](${siteOrigin}/llms-${fw.id}.txt): Complete moduix documentation with ${fw.label} installation commands and code examples only.`,
    ),
    `- [All frameworks full documentation](${siteOrigin}/llms-full.txt): Combined documentation containing React, Solid, Vue, and Svelte examples.`,
  ].join('\n');

  const firstHeading = llmsTxt.indexOf('\n## ');
  if (firstHeading === -1) return `${llmsTxt.trimEnd()}\n\n${section}\n`;
  const before = llmsTxt.slice(0, firstHeading).trimEnd();
  const after = llmsTxt.slice(firstHeading + 1);
  return `${before}\n\n${section}\n\n${after}`;
}

// Post-processes Rspress SSG_MD output to:
// 1. Emit compact per-framework bundles (`/llms-{react,solid,vue,svelte}.txt`).
// 2. Strip non-React example duplicates from individual `.md` pages so agents can read a page in context.
// 3. Remove internal framework markers from `/llms-full.txt` and link the per-framework bundles in `/llms.txt`.
export function pluginLlmsPerFramework(): RspressPlugin {
  return {
    name: 'moduix-llms-per-framework',
    afterBuild(config) {
      const outDir = config.outDir ? path.resolve(config.outDir) : defaultOutDir;
      const siteOrigin = (config.siteOrigin ?? 'https://moduix.dev').replace(/\/$/, '');

      const llmsFullPath = path.join(outDir, 'llms-full.txt');
      if (existsSync(llmsFullPath)) {
        const rawFull = readFileSync(llmsFullPath, 'utf8');
        for (const fw of FRAMEWORKS) {
          const { content } = filterForFramework(rawFull, fw.id);
          const header =
            `# moduix (${fw.label} Documentation)\n\n` +
            `> Complete moduix documentation filtered to ${fw.label} installation commands and examples. ` +
            `Other frameworks: ${FRAMEWORKS.filter((item) => item.id !== fw.id)
              .map((item) => `[${item.label}](${siteOrigin}/llms-${item.id}.txt)`)
              .join(', ')}.\n\n---\n\n`;
          writeFileSync(path.join(outDir, `llms-${fw.id}.txt`), `${header}${content}`, 'utf8');
        }
        writeFileSync(llmsFullPath, stripMarkersOnly(rawFull), 'utf8');
      }

      for (const subdir of ['docs', 'blocks']) {
        for (const mdFile of walkMarkdownFiles(path.join(outDir, subdir))) {
          const raw = readFileSync(mdFile, 'utf8');
          if (!raw.includes('<!-- moduix-fw:')) continue;
          const { content, stripped } = filterForFramework(raw, 'react');
          const finalMd = stripped ? injectFrameworkNote(content, siteOrigin) : content;
          writeFileSync(mdFile, finalMd, 'utf8');
        }
      }

      const llmsTxtPath = path.join(outDir, 'llms.txt');
      if (existsSync(llmsTxtPath)) {
        const rawIndex = readFileSync(llmsTxtPath, 'utf8');
        writeFileSync(llmsTxtPath, updateLlmsIndex(rawIndex, siteOrigin), 'utf8');
      }
    },
  };
}