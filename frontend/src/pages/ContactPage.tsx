import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import emailIcon from '@/assets/icons/email-icon.png';
import phoneIcon from '@/assets/icons/phone-icon.png';
import locationIcon from '@/assets/icons/location-icon.png';
import tiktokIcon from '@/assets/icons/tiktok-icon.png';
import facebookIcon from '@/assets/icons/facebook-icon.png';
import youtubeIcon from '@/assets/icons/youtube-icon.png';
import linkinIcon from '@/assets/icons/linkin-icon.png';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your feedback! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
      <MainLayout className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-32">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">CONTACT</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form Section */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback</h2>
            <p className="text-gray-600 mb-6">
              Please fill out the form below to send us your feedback. We will get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter you name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter you message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300"
              >
                Send
              </button>
            </form>
          </div>

          {/* Our Information Section */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Information</h2>
            <p className="text-gray-600 mb-6">
              We are always here to help you. You can contact us through the following ways.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              {/* Email */}
              <div className="flex items-start gap-3">
                <img src={emailIcon} alt="Email" className="w-6 h-6 mt-1" />
                <div>
                  <a
                    href="mailto:congdinh2021@gmail.com"
                    className="text-gray-900 hover:text-blue-500 transition-colors"
                  >
                    congdinh2021@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <img src={phoneIcon} alt="Phone" className="w-6 h-6 mt-1" />
                <div>
                  <a
                    href="tel:+84944551356"
                    className="text-gray-900 hover:text-blue-500 transition-colors"
                  >
                    +84 944 551 356
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <img src={locationIcon} alt="Location" className="w-6 h-6 mt-1" />
                <div>
                  <p className="text-gray-900">
                    123 Xuan Dinh, Bac Tu Liem, Ha Noi, Viet Nam
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <img src={tiktokIcon} alt="TikTok" className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <img src={youtubeIcon} alt="YouTube" className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <img src={linkinIcon} alt="LinkedIn" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
    );
};


export default ContactPage;
