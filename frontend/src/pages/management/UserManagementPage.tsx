import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import { useUser } from '@/hooks/useUser';
import type { UserRequest } from '@/types/user';
import toast, { Toaster } from 'react-hot-toast';
import editIcon from '@/assets/icons/edit-icon.png';
import deleteIcon from '@/assets/icons/delete-icon.png';
import plusIcon from '@/assets/icons/plus-icon.png';
import reloadIcon from '@/assets/icons/reload-icon.png';
import searchIcon from '@/assets/icons/search-icon.png';
import saveIcon from '@/assets/icons/save-icon.png';

const UserManagementPage = () => {
  const { loading, users, fetchUsers, createUser, updateUser, deleteUser } = useUser();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Search filters
  const [searchName, setSearchName] = useState('');
  const [filterActive, setFilterActive] = useState(true);
  
  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [active, setActive] = useState(true);

  // Fetch users on mount and page change
  useEffect(() => {
    loadUsers();
  }, [currentPage, itemsPerPage]);

  const loadUsers = () => {
    fetchUsers({ 
      page: currentPage - 1, 
      size: itemsPerPage, 
      sort: 'createdAt', 
      direction: 'DESC' 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password match when password is provided
    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Validate password is required when creating new user
    if (!editingId && !password) {
      toast.error('Password is required');
      return;
    }

    const userData: UserRequest = {
      firstName,
      lastName,
      email,
      username: username || undefined,
      phoneNumber: phoneNumber || undefined,
      dateOfBirth: dateOfBirth || undefined,
      active,
    };

    // Only include password if it's provided (for create or update with new password)
    if (password && password.trim()) {
      userData.password = password;
    }

    try {
      if (editingId) {
        await updateUser(editingId, userData);
      } else {
        await createUser(userData);
      }
      resetForm();
      loadUsers();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleEdit = (id: string) => {
    const user = users?.content.find(u => u.id === id);
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setUsername(user.username || '');
      setPhoneNumber(user.phoneNumber || '');
      setDateOfBirth(user.dateOfBirth || '');
      setPassword(''); // Don't populate password for security
      setConfirmPassword(''); // Reset confirm password
      setActive(user.active);
      setEditingId(id);
      setIsFormOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setUsername('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
    setDateOfBirth('');
    setActive(true);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleClearSearch = () => {
    setSearchName('');
    setFilterActive(true);
    setCurrentPage(1);
    loadUsers();
  };

  const handleSearch = () => {
    setCurrentPage(1);
    const searchParams: any = {
      page: 0,
      size: itemsPerPage,
      sort: 'createdAt',
      direction: 'DESC'
    };
    
    if (searchName && searchName.trim()) {
      searchParams.name = searchName.trim();
    }
    
    // Tick checkbox = active users (status yes)
    // No tick = inactive users (status no)
    searchParams.active = filterActive;
    
    console.log('Search params:', searchParams);
    fetchUsers(searchParams);
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="p-6">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">User Management</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter name to search"
                className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <label className="flex items-center gap-2 h-9 px-4 rounded-md w-full">
                <input
                  type="checkbox"
                  checked={filterActive}
                  onChange={(e) => setFilterActive(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-between gap-3">
            <Button 
              variant="primary" 
              onClick={() => setIsFormOpen(!isFormOpen)}
              icon={plusIcon}
              iconAlt="Create"
              size="md"
            >
              Create
            </Button>
            
            <div className="flex gap-3">
              <Button 
                variant="secondary"
                onClick={handleClearSearch}
                icon={reloadIcon}
                iconAlt="Clear"
                size="md"
              >
                Clear
              </Button>
              <Button 
                variant="primary"
                onClick={handleSearch}
                icon={searchIcon}
                iconAlt="Search"
                size="md"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">User List</h3>
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-3 px-4 text-center text-sm text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : users && users.content.length > 0 ? (
                users.content.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {user.firstName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {user.lastName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {user.username || '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {user.phoneNumber || '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {user.active ? 'Yes' : 'No'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <img src={editIcon} alt="Edit" className="w-5 h-5" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-3 px-4 text-center text-sm text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={users?.totalPages || 0}
            totalItems={users?.totalElements || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>

        {/* Create/Edit Form */}
        {isFormOpen && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit User' : 'Add User'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    required
                  />
                </div>
                
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
                    required
                  />
                </div>

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
                    required
                  />
                </div>
                
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {editingId ? "New Password (leave blank to keep current)" : "Password"}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!editingId}
                    minLength={8}
                  />
                </div>

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
                    required={!editingId}
                    minLength={8}
                  />
                </div>
                
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
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <Button type="button" variant="secondary" onClick={resetForm} icon={reloadIcon} iconAlt="Cancel" size="lg">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={loading} icon={saveIcon} iconAlt="Save" size="lg">
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Pagination - Removed from here as it's now inside the table section */}
        {/* {users && users.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={users.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )} */}
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
