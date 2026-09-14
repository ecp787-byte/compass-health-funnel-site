// Clear, visible, NOT pre-checked TCPA-style consent, shown immediately
// before final submission. The exact wording below is placeholder copy -
// it must be reviewed and finalized by compliance/legal before this goes
// live with real ad spend. Keep this component's only job "render whatever
// consent text + links are configured and report checked/unchecked state" -
// the actual legal language should be editable without touching engine code
// (swap CONSENT_COPY for values pulled from a CMS/config if that's easier
// for legal to manage).
const CONSENT_COPY = {
  text:
    'I agree Compass Health may share my information with licensed insurance agents contracted ' +
    'with Veritas Insurance Solutions, and that Compass Health and those agents may contact me ' +
    'by call, text, or email — including by autodialer or prerecorded voice — about health ' +
    'insurance options, even if I’m on a Do Not Call list. Consent isn’t required to get a ' +
    'quote. Msg & data rates may apply. Reply STOP to opt out.',
  links: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

export default function StepConsent({ checked, onChange, summary }) {
  return (
    <div className="quiz-consent">
      {summary && (
        <div className="quiz-consent-summary">
          {summary.map((row) => (
            <div className="quiz-consent-row" key={row.label}>
              <span className="quiz-consent-row-label">{row.label}</span>
              <span className="quiz-consent-row-value">{row.value}</span>
            </div>
          ))}
        </div>
      )}

      <label className="quiz-consent-check">
        <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
        <span>{CONSENT_COPY.text}</span>
      </label>

      <div className="quiz-consent-links">
        {CONSENT_COPY.links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label}
          </a>
        ))}
      </div>

      <p className="quiz-consent-footnote sample-tag">
        Sample consent language — have compliance/legal review and finalize before publishing.
      </p>
    </div>
  );
}
