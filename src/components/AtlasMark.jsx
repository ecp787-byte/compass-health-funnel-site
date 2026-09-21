// The Atlas Health mark: a layered mountain silhouette that reads as a
// monogram "A" — a taller peak in front, a shorter peak stepping out from
// behind it on the right, with a thin band crossing the front peak (the
// letter's crossbar, doubling as a sunrise line / trail mark). Built as an
// original vector interpretation of the brand sheet's mark, not a raster
// trace. Colors are fixed brand values, not theme tokens, so the mark
// never shifts if a UI token is retuned.
//
// `onDark` swaps in the reversed lockup for use on the dark Obsidian hero
// and footer bands, where the default dark-on-light front peak would all
// but disappear into the background - the front peak becomes the light
// face, the crossbar becomes the dark accent, same silhouette either way.
const OBSIDIAN = '#0B0B0B';
const STONE = '#1F1F1F';
const TAUPE = '#A99B80';
const SAGE = '#6B7F72';
const PARCHMENT = '#F6F5F2';

export default function AtlasMark({ className = 'brand-mark', title = 'Atlas Health', onDark = false }) {
  const frontTop = onDark ? '#E7E1D3' : '#2B2B2B';
  const frontBottom = onDark ? TAUPE : OBSIDIAN;
  const backFill = onDark ? SAGE : TAUPE;
  const crossbarFill = onDark ? OBSIDIAN : PARCHMENT;
  const summitFill = onDark ? OBSIDIAN : PARCHMENT;

  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label={title}>
      <defs>
        <linearGradient id={`atlasFrontPeak-${onDark ? 'dark' : 'light'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={frontTop} />
          <stop offset="100%" stopColor={frontBottom} />
        </linearGradient>
      </defs>

      {/* back peak - shorter, stepping out to the right */}
      <polygon points="66,28 38,90 94,90" fill={backFill} />

      {/* front peak - taller, the mark's main stroke */}
      <polygon points="40,10 4,90 78,90" fill={`url(#atlasFrontPeak-${onDark ? 'dark' : 'light'})`} />

      {/* crossbar - a band crossing the front peak, the A's horizontal
          stroke and a sunrise line at once */}
      <polygon points="27,62 53,62 58,72 22,72" fill={crossbarFill} />

      {/* summit accent */}
      <polygon points="40,10 34,24 46,24" fill={summitFill} />
    </svg>
  );
}
