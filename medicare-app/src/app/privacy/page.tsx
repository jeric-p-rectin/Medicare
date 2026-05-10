import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/landing/Footer';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for MED-Alert - Medical Electronic Database with Alert System.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16">
        <h1 className="text-4xl font-extrabold text-medicare-red mb-8">Privacy Policy</h1>
        
        <div className="prose prose-medicare max-w-none text-medicare-dark-gray">
          <p className="mb-6">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-medicare-dark-gray mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to MED-Alert ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal and medical information. This Privacy Policy outlines how we collect, use, and safeguard data within the Medical Electronic Database with Alert System for School Clinics and Barangay Health Centers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-medicare-dark-gray mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We collect information to provide better services to all our users. The types of information we collect include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2"><strong>Personal Identification Information:</strong> Names, contact details, and identification numbers.</li>
              <li className="mb-2"><strong>Health and Medical Information:</strong> Medical history, diagnoses, treatments, and visit records necessary for clinic management and disease outbreak detection.</li>
              <li className="mb-2"><strong>Usage Data:</strong> Information on how you interact with our platform to help us improve user experience.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-medicare-dark-gray mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              Your information is used exclusively for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">To provide, maintain, and improve the MED-Alert system.</li>
              <li className="mb-2">To track patient records and manage clinic operations effectively.</li>
              <li className="mb-2">To detect and send automated alerts regarding potential disease outbreaks within the community.</li>
              <li className="mb-2">To ensure compliance with local health regulations and standards (e.g., DepEd and LGU requirements).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-medicare-dark-gray mb-4">4. Data Security and Privacy</h2>
            <p className="mb-4">
              We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. Access to medical records is strictly role-based, ensuring that only authorized personnel (such as clinic nurses and doctors) can view sensitive patient information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-medicare-dark-gray mb-4">5. Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="font-semibold text-medicare-red">
              <a href="mailto:medalertportal@gmail.com">medalertportal@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
