// Rewrites `@moduix/<framework>/...` imports in live preview examples to
// `@moduix/<framework>-tailwind/...` and propagates `?tailwind` to local sibling component
// imports (such as Vue and Svelte helper SFCs) when loaded with the `?tailwind` query.
export default function tailwindExampleLoader(source) {
  return source
    .replace(/(['"])@moduix\/(react|solid|vue|svelte)\//g, '$1@moduix/$2-tailwind/')
    .replace(/(\bfrom\s+['"]\.\/[^'"?]+\.(?:tsx|vue|svelte))(['"])/g, '$1?tailwind$2');
}