import { CONTACT_INFO, TEAM_MEMBERS } from '@/constants';
import MainLayout from '@/layouts/MainLayout';
import logo from '@/assets/icons/logo.png';
import emailIcon from '@/assets/icons/email-icon.png';
import phoneIcon from '@/assets/icons/phone-icon.png';
import locationIcon from '@/assets/icons/location-icon.png';
import quizIllustration from '@/assets/images/quiz-bg-01.png';

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src={logo} alt="Logo" className="w-8 h-8" />
                <h1 className="text-3xl font-bold text-gray-800">Quizzes</h1>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Contact</h2>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <img src={emailIcon} alt="Email" className="w-5 h-5" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary hover:underline">
                    {CONTACT_INFO.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <img src={phoneIcon} alt="Phone" className="w-5 h-5" />   
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-primary hover:underline">
                    {CONTACT_INFO.phone}
                  </a>
                </div>

                <div className="flex items-start gap-3 text-gray-600">
                  <img src={locationIcon} alt="Location" className="w-5 h-5 mt-0.5" />
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {CONTACT_INFO.address}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex justify-center">
              <img 
                src={quizIllustration} 
                alt="Quiz Illustration" 
                className="w-96 h-96 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="mb-4 flex justify-center">
                  <img 
                    src={member.avatar}
                    alt={member.name}
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
