// Minimal, compliant ad-landing hero. This is deliberately short: for paid
// social traffic, a long scroll before the CTA is friction, not
// persuasion. Copy follows the funnel spec exactly, including the required
// trust bullets and the explicit prohibitions (no government branding, no
// Medicare imagery, no fake countdowns/scarcity, no "everyone qualifies"
// language, no unsubstantiated savings figures).
import CompassMark from './CompassMark.jsx';

const TRUST_BULLETS = [
  'Takes about 2 minutes',
  'No obligation to enroll',
  'Reviewed by licensed insurance professionals',
  'Plans and pricing vary by state and eligibility',
];

const PRODUCT_CHIPS = ['PPO', 'Self-Employed', 'Individual', 'Family', 'Small Business'];

export default function LandingHero({ onStart }) {
  return (
    <div className="landing">
      <div className="landing-brand">
        <CompassMark />
        <span>
          <span className="brand-word">COMPASS HEALTH</span>
          <span className="brand-sub">A VERITAS COMPANY</span>
        </span>
      </div>

      <div className="landing-body">
        <h1 className="landing-headline">See What Private Health Plans You May Qualify For</h1>
        <p className="landing-subcopy">
          Answer a few questions to compare health coverage options available in your area.
        </p>

        <button type="button" className="btn btn-primary btn-block landing-cta" onClick={onStart}>
          Check My Options
        </button>

        <ul className="landing-chips" aria-label="Coverage types">
          {PRODUCT_CHIPS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <ul className="landing-trust">
          {TRUST_BULLETS.map((t) => (
            <li key={t}>
              <span className="landing-trust-dot" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <p className="landing-footnote">
        Compass Health, a Veritas company, is a licensed insurance agency and is not affiliated
        with or endorsed by any government agency, including the federal Health Insurance
        Marketplace or Medicare.
      </p>
    </div>
  );
}
