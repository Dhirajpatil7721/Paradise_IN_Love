import React from 'react';

const Disclaimer = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-12 mb-20 font-sans text-gray-800">
      <h1 className="text-4xl font-bold text-red-600 mb-6 border-b-4 border-red-400 pb-2">
        Disclaimer
      </h1>

      <p className="mb-6 text-lg leading-relaxed">
        The information provided on this website is for general informational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        This site may contain links to external websites that are not provided or maintained by us. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
      </p>

      <p className="italic text-lg mt-8">
        If you have any questions about this disclaimer, please{' '}
        <a href="/contact" className="text-red-600 hover:underline">
          contact us
        </a>.
      </p>
    </div>
  );
};

export default Disclaimer;
