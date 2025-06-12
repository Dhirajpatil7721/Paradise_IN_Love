import React from 'react';

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md mt-12 mb-20 font-sans text-gray-900">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-4 border-blue-400 pb-2">
        Terms and Conditions
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p className="text-lg leading-relaxed">
          Welcome to our website. By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy.
          If you disagree with any part of these terms, please do not use our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Use of Website</h2>
        <p className="text-lg leading-relaxed">
          You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
        <p className="text-lg leading-relaxed">
          All content, trademarks, and data on this website including but not limited to software, text, graphics, logos, and images are our property or the property of our content suppliers.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Limitation of Liability</h2>
        <p className="text-lg leading-relaxed">
          We shall not be held responsible for any damages arising from the use or inability to use the materials on this site.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Changes to Terms</h2>
        <p className="text-lg leading-relaxed">
          We reserve the right to modify these terms at any time. Updated terms will be posted on this page with an updated revision date.
        </p>
      </section>

      <section className="mt-10">
        <p className="italic text-lg">
          If you have any questions about these Terms and Conditions, please{' '}
          <a href="/contact" className="text-blue-600 hover:underline">
            contact us
          </a>.
        </p>
      </section>
    </div>
  );
};

export default TermsConditions;
