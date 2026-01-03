import { Link, useLocation } from 'react-router-dom';
import questionIcon from '@/assets/icons/question-icon.png';
import humanIcon from '@/assets/icons/human-icon.png';
import userIcon from '@/assets/icons/user-icon.png';
import securityIcon from '@/assets/icons/security-icon.png';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Quiz Management',
      path: '/management/quiz',
      icon: humanIcon,
    },
    {
      name: 'Question Management',
      path: '/management/question',
      icon: questionIcon,
    },
    {
      name: 'User Management',
      path: '/management/user',
      icon: userIcon,
    },
    {
      name: 'Role Management',
      path: '/management/role',
      icon: securityIcon,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Menu</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <img src={item.icon} alt={item.name} className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
