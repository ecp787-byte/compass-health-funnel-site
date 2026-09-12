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
    "By checking this box and clicking Submit, I agree that Compass Health and its " +
    'licensed agents may contact me at the phone number and email address provided above — ' +
    'including by call, text (SMS/MMS), and email, and using an automatic telephone dialing ' +
    'system or prerecorded/artificial voice — about health insurance options, even if my number ' +
    'is on a Do Not Call list. I understand consent is not a condition of purchase, message and ' +
    'data rates may apply, message frequency varies, and I can reply STOP to opt out of texts at ' +
    'any time.',
  links: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Licensing & Disclosures', href: '#' },
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
          <a key={l.label} href={l.href}>
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
