import { useEffect, useRef, useState } from 'react';
import AtlasMark from './AtlasMark.jsx';
import ComplianceFooter from './ComplianceFooter.jsx';
import CoveragePathStepper from './CoveragePathStepper.jsx';
import { FadeUp, SectionReveal, StaggerContainer, StaggerItem, TextReveal } from '../motion/primitives.jsx';
import { ARTICLES_BY_SLUG, POPULAR_SLUGS, getCategory } from '../data/education/index.js';
import mountainHiker from '../assets/mountain-hiker.jpg';

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

const COVERAGE_LINKS = [
  {
    href: '#coverage-individual',
    label: 'Individuals & Families',
    body: 'Coverage for you and the people who matter most.',
  },
  {
    href: '#coverage-self-employed',
    label: 'Self-Employed',
    body: 'Health insurance built for your independence.',
  },
  {
    href: '#coverage-business',
    label: 'Business',
    body: 'Group plans to support your team and its growth.',
  },
];

const COVERAGE_STAGES = [
  {
    id: 'coverage-individual',
    title: 'Individual & Family',
    body: 'Flexible coverage for you and the people who matter most, at every age and stage.',
    href: '/otp-landing?start=1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="8.5" cy="8" r="3" />
        <circle cx="16" cy="9.2" r="2.3" />
        <path d="M2.5 20c0-3.3 2.68-6 6-6s6 2.7 6 6" />
        <path d="M14.5 14.6c2.6.4 4.5 2.5 4.5 5.4" />
      </svg>
    ),
  },
  {
    id: 'coverage-self-employed',
    title: 'Self-Employed',
    body: 'Health insurance built for independent work, without an employer plan behind you.',
    href: '/otp-landing?start=1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      </svg>
    ),
  },
  {
    id: 'coverage-business',
    title: 'Business',
    body: 'Group health benefits to help you support your team as it grows.',
    href: '/otp-landing?start=1',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M9 21v-4h6v4M8.5 8h1.2M14.3 8h1.2M8.5 12h1.2M14.3 12h1.2" />
      </svg>
    ),
  },
  {
    id: 'coverage-marketplace',
    title: 'Marketplace & More',
    body: 'Compare Marketplace, private, and employer-sponsored plans side by side.',
    href: '/learn/marketplace-vs-private-vs-employer-insurance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a13 13 0 010 18M12 3a13 13 0 000 18M3 12h18" />
      </svg>
    ),
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
    document.title = 'Atlas Health, a Veritas Company | Modern Health Coverage Guidance';

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
      'Atlas Health helps individuals, families, and businesses understand their healthcare options and find coverage that fits - plus a free Education Center covering deductibles, copays, HSAs, and the marketplace.'
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
  const [coverageOpen, setCoverageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const coverageMenuRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!coverageOpen && !mobileMenuOpen) return undefined;
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setCoverageOpen(false);
        setMobileMenuOpen(false);
      }
    }
    function onClickOutside(e) {
      if (coverageOpen && coverageMenuRef.current && !coverageMenuRef.current.contains(e.target)) {
        setCoverageOpen(false);
      }
      if (mobileMenuOpen && headerRef.current && !headerRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [coverageOpen, mobileMenuOpen]);

  const featuredArticles = POPULAR_SLUGS.slice(0, 4)
    .map((s) => ARTICLES_BY_SLUG[s])
    .filter(Boolean);
  const [heroArticle, ...secondaryArticles] = featuredArticles;
  const heroCategory = heroArticle ? getCategory(heroArticle.category) : null;

  return (
    <div className="home-page">
      <header className={`home-header${scrolled ? ' is-scrolled' : ''}`} ref={headerRef}>
        <div className="wrap home-header-inner">
          <a href="/" className="home-brand">
            <AtlasMark onDark={!scrolled} />
            <span>
              <span className="brand-word">ATLAS HEALTH</span>
              <span className="brand-sub">A VERITAS COMPANY</span>
            </span>
          </a>
          <nav className="home-nav" aria-label="Primary">
            <div className="home-nav-dropdown" ref={coverageMenuRef}>
              <button
                type="button"
                className="home-nav-dropdown-trigger"
                aria-haspopup="true"
                aria-expanded={coverageOpen}
                onClick={() => setCoverageOpen((v) => !v)}
              >
                Coverage
                <svg className="home-nav-dropdown-caret" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {coverageOpen && (
                <div className="home-nav-dropdown-menu" role="menu">
                  {COVERAGE_LINKS.map((c) => (
                    <a role="menuitem" href={c.href} key={c.href} onClick={() => setCoverageOpen(false)}>
                      <span className="home-nav-dropdown-item-label">{c.label}</span>
                      <span className="home-nav-dropdown-item-body">{c.body}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="/learn">Resources</a>
            <a className="btn btn-primary home-nav-cta home-nav-pill" href="/otp-landing?start=1">
              Get Started
            </a>
          </nav>

          <button
            type="button"
            className="home-nav-burger"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-haspopup="true"
            aria-expanded={mobileMenuOpen}
            aria-controls="home-mobile-menu"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <span className={`home-nav-burger-bar${mobileMenuOpen ? ' is-open' : ''}`} />
            <span className={`home-nav-burger-bar${mobileMenuOpen ? ' is-open' : ''}`} />
            <span className={`home-nav-burger-bar${mobileMenuOpen ? ' is-open' : ''}`} />
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="home-mobile-menu" id="home-mobile-menu" aria-label="Mobile">
            <span className="home-mobile-menu-label">Coverage</span>
            {COVERAGE_LINKS.map((c) => (
              <a href={c.href} key={c.href} onClick={() => setMobileMenuOpen(false)}>
                {c.label}
              </a>
            ))}
            <a href="/learn" onClick={() => setMobileMenuOpen(false)}>
              Resources
            </a>
          </nav>
        )}
      </header>

      <section className="home-hero">
        <div className="wrap">
          <div className="home-hero-copy-col">
            <FadeUp mode="load" delay={0}>
              <span className="pill-badge">
                <span className="pill-badge-dot" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Free coverage check &mdash; about 2 minutes
              </span>
            </FadeUp>

            <FadeUp mode="load" delay={0.05}>
              <span className="home-hero-eyebrow section-label">Coverage, guided</span>
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
                  Coverage for <span className="text-accent-flat">what’s next</span>
                </span>,
                <span className="hero-line-emph">starts here.</span>,
              ]}
            />

            <FadeUp mode="load" delay={0.62}>
              <p className="home-hero-copy">
                Atlas Health helps individuals, families, self-employed professionals, and
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

            <FadeUp mode="load" delay={0.8}>
              <p className="hero-trust-line">
                <b>Licensed in all 50 states</b>
                <span className="hero-trust-dot" aria-hidden="true" />
                No obligation to enroll
                <span className="hero-trust-dot" aria-hidden="true" />
                Takes about 2 minutes
              </p>
            </FadeUp>
          </div>

          {/* The real "Find your direction" widget itself, not a mockup of
              it - full logic, state, and CTA destination intact. It floats
              as a card over the hero photo on desktop and drops in-flow
              below the copy on mobile; either way there's exactly one
              instance on the page. */}
          <FadeUp mode="load" delay={0.9} className="home-hero-stepper">
            <CoveragePathStepper />
          </FadeUp>
        </div>
      </section>

      <section className="home-coverage-stages">
        <div className="wrap">
          <SectionReveal className="home-coverage-stages-head">
            <div className="home-coverage-stages-head-text">
              <span className="section-label">Health coverage, your way</span>
              <h2 className="home-coverage-stages-title">Coverage for every stage of life.</h2>
            </div>
            <p className="home-coverage-stages-copy">
              Whether you're covering yourself, your family, or your team, we'll help you find
              options that fit.
            </p>
          </SectionReveal>

          <StaggerContainer className="home-coverage-stages-grid">
            {COVERAGE_STAGES.map((c) => (
              <StaggerItem className="home-coverage-stage-card" id={c.id} key={c.id}>
                <span className="home-coverage-stage-icon" aria-hidden="true">{c.icon}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <a href={c.href} className="home-coverage-stage-link">
                  Learn more <span className="cta-arrow">→</span>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="home-options-explainer">
        <div className="wrap">
          <SectionReveal className="home-options-head">
            <span className="section-label">Understanding your options</span>
            <h2 className="home-options-title">Coverage tends to come from one of three places.</h2>
          </SectionReveal>

          <StaggerContainer className="home-options-grid">
            <StaggerItem className="home-options-col">
              <span className="home-options-col-num">01</span>
              <h3>Marketplace</h3>
              <p>
                Plans sold through the federal or state Health Insurance Marketplace, open to
                individuals and families shopping for coverage on their own.
              </p>
            </StaggerItem>
            <StaggerItem className="home-options-col">
              <span className="home-options-col-num">02</span>
              <h3>Employer-sponsored</h3>
              <p>
                Coverage offered through a job, where the employer typically covers part of the
                monthly premium.
              </p>
            </StaggerItem>
            <StaggerItem className="home-options-col">
              <span className="home-options-col-num">03</span>
              <h3>Private plans</h3>
              <p>
                Coverage purchased directly from an insurance carrier, outside the Marketplace,
                for people who want more flexibility in timing or plan design.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <FadeUp delay={0.1}>
            <a className="home-options-link" href="/learn/marketplace-vs-private-vs-employer-insurance">
              Compare all three in detail <span className="cta-arrow">→</span>
            </a>
          </FadeUp>
        </div>
      </section>

      <section className="home-waypoints">
        <div className="wrap">
          <SectionReveal className="home-waypoints-head">
            <span className="section-label">How Atlas Health helps</span>
            <h2 className="home-waypoints-title">Three ways we help you move forward.</h2>
          </SectionReveal>

          <div className="home-waypoints-grid">
            <FadeUp className="home-waypoint-photo">
              <img
                src={mountainHiker}
                alt="A hiker pausing to take in a mountain view"
                loading="lazy"
              />
              <p className="home-waypoint-photo-caption">
                Guidance that treats you like a person, not a policy number.
              </p>
            </FadeUp>

            <StaggerContainer className="home-waypoints-text">
              {VALUE_PROPS.map((v, i) => (
                <StaggerItem className={`home-waypoint cat-tint-${v.accent}`} key={v.title}>
                  <span className="home-waypoint-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="home-waypoint-body">
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

      <section className="home-final-cta">
        <div className="wrap home-final-cta-inner">
          <SectionReveal className="home-final-cta-copy">
            <span className="section-label">Real guidance, real people</span>
            <h2>A healthier tomorrow is a conversation away.</h2>
            <p>
              Answer a few questions and see coverage paths that may fit your household, budget,
              and timing &mdash; no obligation to enroll.
            </p>
          </SectionReveal>
          <FadeUp delay={0.12} className="home-final-cta-actions">
            <a className="btn btn-primary" href="/otp-landing?start=1">
              Check My Options <span className="cta-arrow">→</span>
            </a>
            <p className="home-final-cta-note">Licensed in all 50 states &middot; Takes about 2 minutes</p>
          </FadeUp>
        </div>
      </section>

      <ComplianceFooter />
    </div>
  );
}
