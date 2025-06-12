import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>Paradise In Love</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit or make a purchase from our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        When you browse or shop on our website, we may collect the following information:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Personal information (e.g., name, email, phone, address)</li>
        <li>Payment details (processed securely via third-party gateways)</li>
        <li>Shopping preferences and order history</li>
        <li>Device and browser information (IP address, cookies, etc.)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your data to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Process your orders and payments</li>
        <li>Send order confirmations, updates, and customer support</li>
        <li>Personalize your shopping experience</li>
        <li>Improve our website, services, and products</li>
        <li>Send promotional offers (only with your consent)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
      <p className="mb-4">
        We may share your data with trusted third parties, such as payment processors and shipping partners, only as needed to complete your orders. We do not sell your data to anyone.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies</h2>
      <p className="mb-4">
        We use cookies to improve website functionality, track user behavior, and offer personalized experiences. You can control cookies via your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, correct, or delete your personal information. You can contact us anytime for help regarding your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update our Privacy Policy occasionally. Changes will be reflected on this page with the date of revision.
      </p>

      <p className="mt-8 text-sm text-gray-600">Last updated: May 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
