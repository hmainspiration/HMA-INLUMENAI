/**
 * Updates the browser tab Favicon dynamically based on theme mode.
 * - Modo Claro: color #060C04 (con acento de luz #3D80FD)
 * - Modo Oscuro / Profundo: color #FEFAE8 (con acento de luz #3D80FD)
 */
export const updateFavicon = (isNegative: boolean): void => {
  if (typeof document === 'undefined') return;

  const colorMain = isNegative ? '#FEFAE8' : '#060C04';
  const colorAccent = '#3D80FD';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" fill="none">
  <g transform="translate(563.69, 279.43) rotate(-45)"><rect x="-33.5" y="-201" width="67" height="402" rx="33.5" fill="${colorMain}" /></g>
  <g transform="translate(397.87, 540.01) rotate(45)"><rect x="-33.5" y="-134" width="67" height="268" rx="33.5" fill="${colorMain}" /></g>
  <g transform="translate(575.53, 362.34) rotate(45)"><rect x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" fill="${colorAccent}" /></g>
  <g transform="translate(420.4, 481.95) rotate(-105)"><rect x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" fill="${colorAccent}" /></g>
  <g transform="translate(611.07, 611.07) rotate(-45)"><rect x="-33.5" y="-33.5" width="67" height="67" rx="33.5" fill="${colorAccent}" /></g>
  <g transform="translate(516.31, 800.57) rotate(-45)"><rect x="-33.5" y="-201" width="67" height="402" rx="33.5" fill="${colorAccent}" /></g>
  <g transform="translate(279.43, 516.31) rotate(45)"><rect x="-33.5" y="-201" width="67" height="402" rx="33.5" fill="${colorAccent}" /></g>
  <g transform="translate(800.57, 563.69) rotate(45)"><rect x="-33.5" y="-201" width="67" height="402" rx="33.5" fill="${colorMain}" /></g>
  <g transform="translate(539.99, 397.87) rotate(-45)"><rect x="-33.5" y="-134" width="67" height="268" rx="33.5" fill="${colorAccent}" /></g>
  <g transform="translate(540.01, 682.13) rotate(-45)"><rect x="-33.5" y="-134" width="67" height="268" rx="33.5" fill="${colorMain}" /></g>
  <g transform="translate(384.86, 446.42) rotate(15)"><rect x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" fill="${colorMain}" /></g>
  <g transform="translate(433.41, 646.6) rotate(45)"><rect x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" fill="${colorMain}" /></g>
  <g transform="translate(504.47, 717.66) rotate(45)"><rect x="-33.5" y="-83.75" width="67" height="167.5" rx="33.5" fill="${colorAccent}" /></g>
</svg>`;

  const encodedSvg = encodeURIComponent(svg);
  const dataUri = `data:image/svg+xml,${encodedSvg}`;

  let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    document.head.appendChild(link);
  }
  link.href = dataUri;
};
