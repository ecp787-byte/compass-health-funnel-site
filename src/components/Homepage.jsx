import { useEffect } from 'react';
import CompassMark from './CompassMark.jsx';
import ComplianceFooter from './ComplianceFooter.jsx';
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
    cta: { label: 'Check My Options', href: '/otp-landing' },
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
    cta: { label: 'Get Help Navigating Your Coverage', href: '/otp-landing' },
    accent: 'navy',
    icon: 'i-people',
  },
];

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

  const featuredArticles = POPULAR_SLUGS.slice(0, 3)
    .map((s) => ARTICLES_BY_SLUG[s])
    .filter(Boolean);

  return (
    <div className="home-page">
      <header className="home-header">
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
            <a className="btn btn-primary home-nav-cta" href="/otp-landing">
              Check My Options
            </a>
          </nav>
        </div>
      </header>

      <section className="home-hero">
        <div className="wrap narrow home-hero-inner">
          <h1 className="home-hero-title">
            Health insurance is complicated. Finding{' '}
            <span className="text-gradient">the right direction</span> shouldn’t be.
          </h1>
          <p className="home-hero-copy">
            Compass Health helps individuals, families, self-employed professionals, and
            businesses understand their healthcare options and find coverage that fits.
          </p>
          <div className="home-hero-actions">
            <a className="btn btn-primary" href="/otp-landing">
              Check My Options
            </a>
            <a className="btn btn-ghost" href="/learn">
              Explore the Education Center
            </a>
          </div>
        </div>
      </section>

      <section className="home-values">
        <div className="wrap home-values-grid">
          {VALUE_PROPS.map((v) => (
            <div className={`home-value-card cat-tint-${v.accent}`} key={v.title}>
              <span className="cat-badge" aria-hidden="true">
                <svg className="icon">
                  <use href={`#${v.icon}`} />
                </svg>
              </span>
              <h2>{v.title}</h2>
              <p>{v.body}</p>
              <a href={v.cta.href}>{v.cta.label} →</a>
            </div>
          ))}
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="home-learn-teaser">
          <div className="wrap">
            <div className="home-learn-teaser-header">
              <h2>From the Education Center</h2>
              <a href="/learn">See all guides →</a>
            </div>
            <div className="learn-grid">
              {featuredArticles.map((a) => {
                const category = getCategory(a.category);
                return (
                  <a
                    className={`learn-card${category ? ` cat-tint-${category.accent}` : ''}`}
                    href={`/learn/${a.slug}`}
                    key={a.slug}
                  >
                    <span className="learn-card-top">
                      {category?.icon && (
                        <span className="cat-badge cat-badge-sm" aria-hidden="true">
                          <svg className="icon">
                            <use href={`#${category.icon}`} />
                          </svg>
                        </span>
                      )}
                      <span className="learn-card-eyebrow">{category?.label}</span>
                    </span>
                    <span className="learn-card-title">{a.h1}</span>
                    <span className="learn-card-dek">{a.dek}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <ComplianceFooter />
    </div>
  );
}
