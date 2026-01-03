import { Link } from 'react-router-dom';
import { CONTACT_INFO, ROUTES } from '@/constants';
import logo from '@/assets/icons/logo.png';
import emailIcon from '@/assets/icons/email-icon.png';
import phoneIcon from '@/assets/icons/phone-icon.png';
import locationIcon from '@/assets/icons/location-icon.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Logo" className="w-6 h-6" />
              <span className="text-xl font-bold text-gray-800">Quizzes</span>
            </div>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.HOME} className="text-sm text-primary hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to={ROUTES.QUIZZES} className="text-sm text-primary hover:underline">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT} className="text-sm text-primary hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="text-sm text-primary hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <img src={emailIcon} alt="Email" className="w-4 h-4" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary hover:underline">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <img src={phoneIcon} alt="Phone" className="w-4 h-4" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-primary hover:underline">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <img src={locationIcon} alt="Location" className="w-4 h-4 mt-0.5" />
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
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© May 2024 - ReactJS 19</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
