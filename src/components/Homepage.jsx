import { useEffect, useState } from 'react';
import CompassMark from './CompassMark.jsx';
import ComplianceFooter from './ComplianceFooter.jsx';
import HeroCompass from './HeroCompass.jsx';
import CoveragePathStepper from './CoveragePathStepper.jsx';
import { FadeUp, SectionReveal, StaggerContainer, StaggerItem, TextReveal } from '../motion/primitives.jsx';
import { ARTICLES_BY_SLUG, POPULAR_SLUGS, getCategory } from '../data/education/index.js';

// The real compasscares.co homepage - a "sophisticated national healthcare
// platform" front door, distinct from the lean, single-purpose funnel at
// /otp-landing built for paid ad traffic. This page's job is to orient an
// organic/direct visitor, point them at the Education Center, and offer the
// same "check your options" path without the funnel's ad-landing urgency.
const VALUE_PROPS = [
  {
    title: 'Compare your options',
    body: 'Answer a few questions and see coverage paths that may fit your household, budget, and timing.',
    cta: { label: 'Check My Options', href: '/otp-landing?start=1' },
    accent: 'teal',
    icon: 'i-checkbig',
  },
  {
    title: 'Understand your benefits',
    body: 'Deductibles, copays, coinsurance, networks - the Education Center breaks down how coverage actually works.',
    cta: { label: 'Visit the Education Center', href: '/learn' },
    accent: 'icy',
    icon: 'i-doc',
  },
  {
    title: 'Talk to a licensed agent',
    body: 'When you’re ready, a licensed agent can walk through real plan options with you directly.',
    cta: { label: 'Get Help Navigating Your Coverage', href: '/otp-landing?start=1' },
    accent: 'navy',
    icon: 'i-people',
  },
];

function useScrolledHeader(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    function update() {
      setScrolled(window.scrollY > threshold);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

export default function Homepage() {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null;
    document.title = 'Compass Health, a Veritas Company | Modern Health Coverage Guidance';

    let metaTag = document.querySelector('meta[name="description"]');
    let createdMeta = false;
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
      createdMeta = true;
    }
    metaTag.setAttribute(
      'content',
      'Compass Health helps individuals, families, and businesses understand their healthcare options and find coverage that fits - plus a free Education Center covering deductibles, copays, HSAs, and the marketplace.'
    );

    return () => {
      document.title = prevTitle;
      if (createdMeta) {
        metaTag.remove();
      } else if (prevDescription !== null) {
        metaTag.setAttribute('content', prevDescription);
      }
    };
  }, []);

  const scrolled = useScrolledHeader();

  const featuredArticles = POPULAR_SLUGS.slice(0, 4)
    .map((s) => ARTICLES_BY_SLUG[s])
    .filter(Boolean);
  const [heroArticle, ...secondaryArticles] = featuredArticles;
  const heroCategory = heroArticle ? getCategory(heroArticle.category) : null;

  return (
    <div className="home-page">
      <header className={`home-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap home-header-inner">
          <a href="/" className="home-brand">
            <CompassMark />
            <span>
              <span className="brand-word">COMPASS HEALTH</span>
              <span className="brand-sub">A VERITAS COMPANY</span>
            </span>
          </a>
          <nav className="home-nav" aria-label="Primary">
            <a href="/learn">Learn</a>
            <a className="btn btn-primary home-nav-cta" href="/otp-landing?start=1">
              Check My Options
            </a>
          </nav>
        </div>
      </header>

      <section className="home-hero">
        <div className="wrap">
          <div className="home-hero-copy-col">
            <FadeUp mode="load" delay={0.05}>
              <span className="home-hero-eyebrow section-label">Coverage, navigated</span>
            </FadeUp>

            <TextReveal
              as="h1"
              className="home-hero-title"
              mode="load"
              delay={0.15}
              stagger={0.11}
              lines={[
                <span className="hero-line-muted">Health insurance</span>,
                <span className="hero-line-muted">is complicated.</span>,
                <span className="hero-line-emph">
                  Finding the <span className="text-gradient">right direction</span>
                </span>,
                <span className="hero-line-emph">shouldn’t be.</span>,
              ]}
            />

            <FadeUp mode="load" delay={0.62}>
              <p className="home-hero-copy">
                Compass Health helps individuals, families, self-employed professionals, and
                businesses understand their healthcare options and find coverage that fits.
              </p>
            </FadeUp>

            <FadeUp mode="load" delay={0.72}>
              <div className="home-hero-actions">
                <a className="btn btn-primary" href="/otp-landing?start=1">
                  Check My Options <span className="cta-arrow">→</span>
                </a>
                <a className="btn btn-ghost" href="/learn">
                  Explore the Education Center
                </a>
              </div>
            </FadeUp>
          </div>

          <FadeUp mode="load" delay={0.3} y={0} className="home-hero-visual-col">
            <HeroCompass />
          </FadeUp>
        </div>
      </section>

      <section className="home-coverage-path-section">
        <div className="wrap home-coverage-path-inner">
          <CoveragePathStepper />
        </div>
      </section>

      <section className="home-waypoints">
        <div className="wrap">
          <SectionReveal className="home-waypoints-head">
            <span className="section-label">How Compass Health helps</span>
            <h2 className="home-waypoints-title">Three ways we point you in the right direction.</h2>
          </SectionReveal>

          <StaggerContainer className="home-waypoints-list">
            {VALUE_PROPS.map((v, i) => (
              <StaggerItem className={`home-waypoint cat-tint-${v.accent}`} key={v.title}>
                <span className="cat-badge" aria-hidden="true">
                  <svg className="icon">
                    <use href={`#${v.icon}`} />
                  </svg>
                </span>
                <div className="home-waypoint-body">
                  <span className="home-waypoint-num">{String(i + 1).padStart(2, '0')}</span>
                  <h2>{v.title}</h2>
                  <p>{v.body}</p>
                  <a href={v.cta.href}>
                    {v.cta.label} <span className="cta-arrow">→</span>
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {heroArticle && (
        <section className="home-learn-teaser">
          <div className="wrap">
            <SectionReveal>
              <div className="home-learn-teaser-header">
                <div>
                  <span className="section-label">Knowledge center</span>
                  <h2>From the Education Center</h2>
                </div>
                <a href="/learn">
                  See all guides <span className="cta-arrow">→</span>
                </a>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.08}>
              <div className="home-learn-teaser-layout">
                <a
                  className={`home-learn-featured${heroCategory ? ` cat-tint-${heroCategory.accent}` : ''}`}
                  href={`/learn/${heroArticle.slug}`}
                >
                  <span className="learn-card-top">
                    {heroCategory?.icon && (
                      <span className="cat-badge cat-badge-sm" aria-hidden="true">
                        <svg className="icon">
                          <use href={`#${heroCategory.icon}`} />
                        </svg>
                      </span>
                    )}
                    <span className="learn-card-eyebrow">{heroCategory?.label}</span>
                  </span>
                  <span className="home-learn-featured-title">{heroArticle.h1}</span>
                  <span className="home-learn-featured-dek">{heroArticle.dek}</span>
                </a>

                <div className="home-learn-secondary-list">
                  {secondaryArticles.map((a) => {
                    const category = getCategory(a.category);
                    return (
                      <a
                        className={`home-learn-secondary-row${category ? ` cat-tint-${category.accent}` : ''}`}
                        href={`/learn/${a.slug}`}
                        key={a.slug}
                      >
                        <span>
                          <span className="home-learn-secondary-row-eyebrow">{category?.label}</span>
                          <span className="home-learn-secondary-row-title">{a.h1}</span>
                        </span>
                        <span className="cta-arrow" aria-hidden="true">→</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

      <ComplianceFooter />
    </div>
  );
}
