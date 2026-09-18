import type { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & { unoptimized?: boolean };
export default function SiteImage({src, unoptimized: _unoptimized, ...props}: Props) {
  const base = import.meta.env?.BASE_URL ?? '/';
  const resolved = typeof src === 'string' && src.startsWith('/') ? `${base}${src.slice(1)}` : src;
  // Images have explicit alt text and dimensions at each call site.
  // WebP assets are already optimized; static Pages has no image optimization server.
  // oxlint-disable-next-line jsx-a11y/alt-text, next/no-img-element
  return <img {...props} src={resolved}/>;
}
