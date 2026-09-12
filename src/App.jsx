import { useEffect, useState } from 'react';
import IconSprite from './components/IconSprite.jsx';
import LandingHero from './components/LandingHero.jsx';
import ComplianceFooter from './components/ComplianceFooter.jsx';
import QuizEngine from './components/quiz/QuizEngine.jsx';
import ResultsPage from './components/ResultsPage.jsx';
import { loadProgress } from './lib/progress.js';
import { trackPageView, getAttribution } from './lib/tracking.js';

// Three stages: landing (minimal ad-landing page) -> quiz (one question per
// screen) -> results (personalized confirmation + next-step CTA). This
// replaces the old long-scroll marketing page - see ARCHITECTURE.md for the
// reasoning (a long scroll before the CTA is friction for paid-social
// traffic, and conflicts with the AD -> TAP -> FAST LOAD -> ONE-TAP
// QUESTIONS flow the funnel is built around).
export default function App() {
  // If there's saved in-progress quiz state (e.g. the person switched to
  // their messages app to read an OTP code and came back), resume straight
  // into the quiz instead of dropping them back on the landing page.
  const [stage, setStage] = useState(() => (loadProgress() ? 'quiz' : 'landing'));
  const [finalAnswers, setFinalAnswers] = useState(null);

  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <>
      <IconSprite />
      {stage === 'landing' && (
        <>
          <LandingHero onStart={() => setStage('quiz')} />
          <ComplianceFooter />
        </>
      )}

      {stage === 'quiz' && (
        <QuizEngine
          onComplete={(answers) => {
            setFinalAnswers(answers);
            setStage('results');
          }}
        />
      )}

      {stage === 'results' && finalAnswers && (
        <>
          <ResultsPage answers={finalAnswers} attribution={getAttribution()} />
          <ComplianceFooter />
        </>
      )}
    </>
  );
}
