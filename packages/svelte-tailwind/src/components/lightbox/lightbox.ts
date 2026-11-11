export type LightboxImageSelectDetails = {
  alt?: string;
  element: HTMLImageElement;
  src: string;
};

type RootRefValue = HTMLElement | null | undefined;

export type LightboxBindProps = {
  onImageSelect: (details: LightboxImageSelectDetails) => void;
  selector: string;
  rootRef?: HTMLElement | (() => RootRefValue);
  rootSelector?: string;
};

export const resolveImage = (
  target: EventTarget | null,
  selector: string,
  rootNode: HTMLElement,
): LightboxImageSelectDetails | null => {
  const matchedNode = target instanceof Element ? target.closest(selector) : null;
  if (!matchedNode || !rootNode.contains(matchedNode)) {
    return null;
  }

  const imageNode =
    matchedNode instanceof HTMLImageElement ? matchedNode : matchedNode.querySelector('img');
  if (!imageNode) {
    return null;
  }

  // An explicitly empty data-lightbox-src excludes the image.
  const src = imageNode.dataset.lightboxSrc ?? (imageNode.currentSrc || imageNode.src);
  return src ? { src, alt: imageNode.alt || undefined, element: imageNode } : null;
};

export const resolveRootNode = (
  rootRef: LightboxBindProps['rootRef'],
  rootSelector: string | undefined,
): HTMLElement | null => {
  const rootNode = typeof rootRef === 'function' ? rootRef() : rootRef;
  return rootNode ?? (rootSelector ? document.querySelector<HTMLElement>(rootSelector) : null);
};