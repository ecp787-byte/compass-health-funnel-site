// Full date of birth — used instead of a bare age field where a funnel
// variant wants the more precise/standard input. Native date picker, capped
// so the applicant is at least 18 (the minimum age to be the primary
// applicant on an individual health plan) and not implausibly old.
export default function StepDob({ value, onChange, autoFocus }) {
  return (
    <div className="quiz-single-input">
      <input
        type="date"
        autoFocus={autoFocus}
        autoComplete="bday"
        className="quiz-input"
        max={maxDob()}
        min="1900-01-01"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function maxDob() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d.toISOString().slice(0, 10);
}

function computeAge(value) {
  const dob = new Date(`${value}T00:00:00`);
  if (Number.isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

export function isValidDob(value) {
  if (!value) return false;
  const age = computeAge(value);
  return age !== null && age >= 18 && age <= 120;
}

export function ageFromDob(value) {
  return computeAge(value);
}
