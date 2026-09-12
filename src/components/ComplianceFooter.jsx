export default function ComplianceFooter() {
  return (
    <div className="compliance-footer">
      <span className="sample-tag">Sample — confirm with compliance/legal before publishing</span>
      <p>
        Compass Health, a Veritas company, is a licensed insurance agency. Placeholder: licensed
        in [list your actual licensed states]. NPN #[your National Producer Number]. Not
        affiliated with or endorsed by any government agency, including the federal Health
        Insurance Marketplace or Medicare. Plan availability and pricing vary by state and
        eligibility.
      </p>
      <nav className="compliance-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms &amp; Conditions</a>
        <a href="#">Contact Us</a>
      </nav>
      <p className="copyright">© {new Date().getFullYear()} Compass Health. All rights reserved.</p>
    </div>
  );
}
