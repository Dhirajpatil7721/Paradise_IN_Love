import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Privacy Policy</h1>

      <p style={styles.intro}>
        At <strong>Paradise In Love</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit or make a purchase from our website.
      </p>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>1. Information We Collect</h2>
        <p>We may collect the following information when you use our website:</p>
        <ul style={styles.list}>
          <li>Personal information (e.g., name, email, phone, address)</li>
          <li>Payment details (processed securely via third-party gateways)</li>
          <li>Shopping preferences and order history</li>
          <li>Device and browser information (IP address, cookies, etc.)</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>2. How We Use Your Information</h2>
        <p>We use your data to:</p>
        <ul style={styles.list}>
          <li>Process your orders and payments</li>
          <li>Send order confirmations, updates, and customer support</li>
          <li>Personalize your shopping experience</li>
          <li>Improve our website, services, and products</li>
          <li>Send promotional offers (only with your consent)</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>3. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>4. Third-Party Services</h2>
        <p>
          We may share your data with trusted third parties, such as payment processors and shipping partners, only as needed to complete your orders. We do not sell your data to anyone.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>5. Cookies</h2>
        <p>
          We use cookies to improve website functionality, track user behavior, and offer personalized experiences. You can control cookies via your browser settings.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>6. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. You can contact us anytime for help regarding your data.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>7. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy occasionally. Changes will be reflected on this page with the date of revision.
        </p>
      </section>

      <p style={styles.footerNote}>
        Last updated: <strong>May 2025</strong>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '3rem auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  title: {
    fontSize: '2.8rem',
    color: '#2c3e50',
    marginBottom: '1rem',
    borderBottom: '3px solid #3498db',
    paddingBottom: '0.5rem',
  },
  intro: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '2rem',
  },
  section: {
    marginBottom: '1.8rem',
  },
  subtitle: {
    fontSize: '1.6rem',
    color: '#2980b9',
    marginBottom: '0.6rem',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '1.5rem',
    lineHeight: '1.5',
  },
  footerNote: {
    marginTop: '2rem',
    fontSize: '1rem',
    textAlign: 'right',
    color: '#666',
  },
};

export default PrivacyPolicy;