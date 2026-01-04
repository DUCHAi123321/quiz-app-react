import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import Input from '@/components/Input';
import { useUser } from '@/hooks/useUser';
import type { UserRequest } from '@/types/user';
import toast, { Toaster } from 'react-hot-toast';

const UserManagementPage = () => {
  const { loading, users, fetchUsers, createUser, updateUser, deleteUser } = useUser();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

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

    const userData: UserRequest = {
      email,
      fullName,
      password,
    };

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
      setEmail(user.email);
      setFullName(user.fullName);
      setPassword(''); // Don't populate password for security
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
    setEmail('');
    setFullName('');
    setPassword('');
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <Button 
            variant="primary" 
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            {isFormOpen ? 'Close Form' : '+ Add New User'}
          </Button>
        </div>

        {/* Create/Edit Form */}
        {isFormOpen && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit User' : 'Create New User'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                />
                
                <Input
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  required
                />
                
                <Input
                  label={editingId ? "New Password (leave blank to keep current)" : "Password"}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required={!editingId}
                  minLength={8}
                />
              </div>

              <div className="flex gap-4 mt-6">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Saving...' : editingId ? 'Update User' : 'Create User'}
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : users && users.content.length > 0 ? (
                users.content.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.roles.map(r => r.name.replace('ROLE_', '')).join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {users && users.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={users.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
