import { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import Button from '@/components/Button';
import Input from '@/components/Input';
import plusIcon from '@/assets/icons/plus-icon.png';
import reloadIcon from '@/assets/icons/reload-icon.png';
import searchIcon from '@/assets/icons/search-icon.png';
import editIcon from '@/assets/icons/edit-icon.png';
import deleteIcon from '@/assets/icons/delete-icon.png';
import saveIcon from '@/assets/icons/save-icon.png';
import lessIcon from '@/assets/icons/less-icon.png';
import less2Icon from '@/assets/icons/less2-icon.png';
import greaterIcon from '@/assets/icons/greater-icon.png';
import greater2Icon from '@/assets/icons/greater2-icon.png';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  status: boolean;
}

const UserManagementPage = () => {
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState(false);

  // Sample user data
  const users: User[] = [
    {
      id: '1',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@domain.com',
      username: 'admin',
      phoneNumber: '+84987654321',
      status: true,
    },
    {
      id: '2',
      firstName: 'Editor',
      lastName: 'User',
      email: 'editor@domain.com',
      username: 'editor',
      phoneNumber: '+84987654321',
      status: true,
    },
    {
      id: '3',
      firstName: 'Cong',
      lastName: 'Dinh',
      email: 'congdinh@domain.com',
      username: 'congdinh',
      phoneNumber: '+84987654321',
      status: true,
    },
    {
      id: '4',
      firstName: 'Van',
      lastName: 'Nguyen',
      email: 'vannguyen@domain.com',
      username: 'vannguyen',
      phoneNumber: '+84987654321',
      status: true,
    },
  ];

  const handleSearch = () => {
    console.log('Searching:', { searchName, searchStatus });
  };

  const handleClear = () => {
    setSearchName('');
    setSearchStatus(false);
  };

  const handleSave = () => {
    console.log('Saving user:', {
      firstName,
      lastName,
      email,
      username,
      password,
      dateOfBirth,
      phoneNumber,
      status,
    });
  };

  const handleCancel = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setDateOfBirth('');
    setPhoneNumber('');
    setStatus(false);
  };

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId: string) => {
    console.log('Delete user:', userId);
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* User Management Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">User Management</h1>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter username to search"
                className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <label className="flex items-center gap-2 h-9 px-4  rounded-md w-full">
                <input
                  type="checkbox"
                  checked={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.checked)}
                  className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <img src={plusIcon} alt="Create" className="w-4 h-4 brightness-0 invert" /> Create
            </button>
            <div className="flex gap-3">
              <button
                onClick={handleClear}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <img src={reloadIcon} alt="Clear" className="w-4 h-4" /> Clear
              </button>
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <img src={searchIcon} alt="Search" className="w-4 h-4 brightness-0 invert" /> Search
              </button>
            </div>
          </div>
        </div>

        {/* User List Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">User List</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    First Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Last Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    User Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Phone Number
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{user.firstName}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{user.lastName}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{user.username}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{user.phoneNumber}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {user.status ? 'Yes' : 'No'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <img src={editIcon} alt="Edit" className="w-5 h-5" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
                <img src={less2Icon} alt="First" className="w-4 h-4" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
              </button>
              <button className="w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
                <img src={lessIcon} alt="Previous" className="w-4 h-4" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
              </button>
              <button className="px-3 py-1 border border-blue-500 bg-blue-50 text-blue-600 rounded-md">
                1
              </button>
              <button className="px-3 py-1 border border-blue-500 rounded-md hover:bg-blue-50 text-blue-600">
                2
              </button>
              <button className="px-3 py-1 border border-blue-500 rounded-md hover:bg-blue-50 text-blue-600">
                3
              </button>
              <button className="w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
                <img src={greaterIcon} alt="Next" className="w-4 h-4" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
              </button>
              <button className="w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
                <img src={greater2Icon} alt="Last" className="w-4 h-4" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
              </button>
            </div>

            <div className="text-sm text-gray-600">
              1-10 of {users.length}
            </div>
          </div>
        </div>

        {/* Add User Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add User</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* User Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your user name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="Enter your date of birth"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <img src={reloadIcon} alt="Cancel" className="w-4 h-4" /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <img src={saveIcon} alt="Save" className="w-4 h-4 brightness-0 invert" /> Save
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
