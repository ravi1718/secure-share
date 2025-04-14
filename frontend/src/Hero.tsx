
import { SignInButton } from '@clerk/clerk-react'
const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Your Digital Document Vault
        </h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Store, manage, and securely share your important documents all in one
          place. From mark sheets to passports, access your documents anytime,
          anywhere.
        </p>
      <SignInButton>
      <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 text-sm sm:text-base">Get Started</button>
    </SignInButton>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
          <DocumentCard title="Identity Documents" color="text-blue-700" />
          <DocumentCard title="Educational Certificates" color="text-purple-700" />
          <DocumentCard title="Financial Records" color="text-green-700" />
          <DocumentCard title="Health Documents" color="text-pink-700" />
        </div>
      </div>

      <div className="mt-16 max-w-6xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Everything you need to manage your important documents digitally.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard title="Secure Storage" desc="All your documents are stored with advanced encryption for maximum security." />
          <FeatureCard title="Easy Sharing" desc="Share your documents securely with government agencies or trusted contacts." />
          <FeatureCard title="Centralized Access" desc="Access all your important documents from one secure location." />
          <FeatureCard title="Aadhar Integration" desc="Link your documents with your Aadhar number for added security and convenience." />
          <FeatureCard title="Document Categories" desc="Organize your documents by category for easy access and management." />
          <FeatureCard title="Verified Access" desc="Two-factor authentication ensures your documents are accessed only by you." />
        </div>
      </div>

      <div className="mt-20 bg-blue-600 text-white text-center py-10 px-4 sm:px-8 rounded-lg">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">Ready to go paperless?</h3>
        <p className="text-sm sm:text-base">Join thousands of citizens who have already digitized their documents.</p>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-gray-200">
    <h4 className="text-base sm:text-lg font-semibold text-blue-700 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm sm:text-base">{desc}</p>
  </div>
);

const DocumentCard = ({ title, color }: { title: string; color: string }) => (
  <div className={`bg-white p-4 sm:p-6 shadow rounded text-center border border-gray-200`}>
    <p className={`font-semibold ${color} text-sm sm:text-base`}>{title}</p>
  </div>
);

export default Hero;
