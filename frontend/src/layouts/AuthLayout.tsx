import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Auth Card */}
      <div className="relative z-10 bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
