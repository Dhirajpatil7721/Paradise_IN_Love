import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-12 mb-20 font-sans text-gray-800">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 border-b-4 border-blue-500 pb-2">
        Return Policy
      </h1>

      <p className="mb-8 text-lg leading-relaxed">
        We want you to be completely happy with your purchase. If you need to return an item, please review the details below.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">
          Return Eligibility
        </h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Items must be returned within <strong>7 days</strong> from the date of delivery.</li>
          <li>Products must be unused, in their original packaging, and in the same condition as when you received them.</li>
          <li>A receipt or proof of purchase is required for all returns.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">
          Non-Returnable Items
        </h2>
        <p className="mb-3 text-lg">Returns are not accepted for:</p>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Personalized or customized products</li>
          <li>Sale or clearance items</li>
          <li>Gift cards and downloadable software</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">
          Return Process
        </h2>
        <p className="text-lg leading-relaxed">
          To initiate a return, please contact our customer service team within <strong>7 days</strong> with your order details and reason for return.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">
          Refunds and Exchanges
        </h2>
        <p className="text-lg leading-relaxed">
          Once your return is received and inspected, we will notify you of the approval or rejection of your return. Approved returns will be refunded to the original payment method or exchanged as per your request.
        </p>
      </section>

      <p className="italic text-lg mt-8">
        Need help? Please{' '}
        <a href="/contact" className="text-blue-600 hover:underline">
          contact our support team
        </a>{' '}
        for assistance.
      </p>
    </div>
  );
};

export default ReturnPolicy;
