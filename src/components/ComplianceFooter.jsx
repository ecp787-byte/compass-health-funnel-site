export default function ComplianceFooter() {
  return (
    <div className="compliance-footer">
      <span className="sample-tag">Sample — confirm with compliance/legal before publishing</span>
      <p>
        Compass Health, a Veritas company, is a lead-generation service that connects consumers
        with licensed insurance agents contracted with Veritas Insurance Solutions. Compass
        Health does not sell insurance directly. Not affiliated with or endorsed by any
        government agency, including the federal Health Insurance Marketplace or Medicare. Plan
        availability and pricing vary by state and eligibility.
      </p>
      <nav className="compliance-links">
        <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <a href="/terms" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>
        <a href="#">Contact Us</a>
      </nav>
      <p className="copyright">© {new Date().getFullYear()} Compass Health. All rights reserved.</p>
    </div>
  );
}
