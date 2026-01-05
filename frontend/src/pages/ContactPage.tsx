import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MainLayout from '@/layouts/MainLayout';
import Input from '@/components/Input';
import emailIcon from '@/assets/icons/email-icon.png';
import phoneIcon from '@/assets/icons/phone-icon.png';
import locationIcon from '@/assets/icons/location-icon.png';
import tiktokIcon from '@/assets/icons/tiktok-icon.png';
import facebookIcon from '@/assets/icons/facebook-icon.png';
import youtubeIcon from '@/assets/icons/youtube-icon.png';
import linkinIcon from '@/assets/icons/linkin-icon.png';
import { contactSchema, type ContactFormData } from '@/schemas/formSchemas';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    console.log('Form submitted:', data);
    
    // Mock delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your feedback! We will get back to you soon.');
      reset();
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Name"
                type="text"
                placeholder="Enter you name"
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="mb-4">
                <label htmlFor="contact-message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Enter you message"
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('message')}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
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
                className="w-10 h-10 rounded-full flex items-center justify-center "
              >
                <img src={tiktokIcon} alt="TikTok" className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center "
              >
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center"
              >
                <img src={youtubeIcon} alt="YouTube" className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center"
              >
                <img src={linkinIcon} alt="LinkedIn" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
};


export default ContactPage;
