import React from 'react';

const RefundPolicy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Refund Policy</h1>

      <p style={styles.intro}>
        We value your satisfaction and strive to provide the best service possible. 
        If you are not satisfied with your purchase, please review our refund policy below:
      </p>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Eligibility for Refunds</h2>
        <ul style={styles.list}>
          <li>Refunds are applicable only on products returned within <strong>30 days</strong> of purchase.</li>
          <li>The product must be <strong>unused</strong>, in original packaging, and with all tags attached.</li>
          <li>Proof of purchase is required to process refunds.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Non-Refundable Items</h2>
        <p>Some items are non-refundable, including but not limited to:</p>
        <ul style={styles.list}>
          <li>Customized or personalized products</li>
          <li>Sale or clearance items</li>
          <li>Gift cards</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>How to Request a Refund</h2>
        <p>
          To request a refund, please contact our customer support within <strong>30 days</strong> of delivery with your order details.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Processing Time</h2>
        <p>
          Once we receive your returned product, please allow <strong>7-10 business days</strong> for the refund to be processed.
        </p>
      </section>

      <p style={styles.footerNote}>
        For any questions regarding refunds, please <a href="/contact" style={styles.link}>contact our support team</a>.
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
    fontStyle: 'italic',
    marginTop: '2rem',
    fontSize: '1rem',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
  },
};

export default RefundPolicy;
