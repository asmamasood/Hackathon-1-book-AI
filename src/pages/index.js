import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function LandingPage() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="AI-Native textbook for humanoid robotics and physical AI - Learn from ROS 2 foundations to autonomous AI agents">
      <main className={styles.landingPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Physical AI & Humanoid Robotics
            </h1>
            <p className={styles.heroSubtitle}>
              Explore Humanoid Robotics from Robotic Nervous Systems to Autonomous AI Agents.
            </p>
          </div>

          {/* Hero Image */}
          <div className={styles.heroImageWrapper}>
            <img
              src="/img/hero-robot.svg"
              alt="Humanoid robot illustration representing Physical AI and Robotics"
              className={styles.heroImage}
              loading="eager"
              width="600"
              height="400"
            />
          </div>

          {/* Call to Action */}
          <div className={styles.ctaSection}>
            <Link
              to="/docs/robotic-nervous-system/"
              className={styles.ctaButton}
              aria-label="Navigate to Module 01: The Robotic Nervous System">
              Start Learning
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.landingFooter}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Physical AI & Humanoid Robotics
          </p>
          <p className={styles.attribution}>
            Built with{' '}
            <a
              href="https://docusaurus.io/"
              target="_blank"
              rel="noopener noreferrer">
              Docusaurus
            </a>
          </p>
        </footer>
      </main>
    </Layout>
  );
}
