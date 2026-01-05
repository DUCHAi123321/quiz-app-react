import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import { useRole } from '@/hooks/useRole';
import type { RoleRequest } from '@/types/role';
import { Toaster } from 'react-hot-toast';
import plusIcon from '@/assets/icons/plus-icon.png';
import reloadIcon from '@/assets/icons/reload-icon.png';
import searchIcon from '@/assets/icons/search-icon.png';
import editIcon from '@/assets/icons/edit-icon.png';
import deleteIcon from '@/assets/icons/delete-icon.png';
import saveIcon from '@/assets/icons/save-icon.png';

const RoleManagementPage = () => {
  const { loading, roles, fetchRoles, searchRoles, createRole, updateRole, deleteRole } = useRole();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Search filters
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState(true);

  // Form states
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [status, setStatus] = useState(true);

  // Fetch roles on mount and page change
  useEffect(() => {
    loadRoles();
  }, [currentPage, itemsPerPage]);

  const loadRoles = () => {
    fetchRoles({ 
      page: currentPage - 1, 
      size: itemsPerPage, 
      sort: 'createdAt', 
      direction: 'DESC' 
    });
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
    
    searchParams.active = searchStatus;
    
    console.log('Search params:', searchParams);
    searchRoles(searchParams);
  };

  const handleClear = () => {
    setSearchName('');
    setSearchStatus(true);
    setCurrentPage(1);
    loadRoles();
  };

  const handleSave = async () => {
    if (!roleName.trim()) {
      return;
    }

    const roleData: RoleRequest = {
      name: roleName,
      description: roleDescription || undefined,
      active: status,
    };

    try {
      if (editingId) {
        await updateRole(editingId, roleData);
      } else {
        await createRole(roleData);
      }
      handleCancel();
      loadRoles();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleCancel = () => {
    setRoleName('');
    setRoleDescription('');
    setStatus(true);
    setEditingId(null);
  };

  const handleEdit = (roleId: string) => {
    const role = roles?.content.find(r => r.id === roleId);
    if (role) {
      setRoleName(role.name);
      setRoleDescription(role.description || '');
      setStatus(role.active);
      setEditingId(roleId);
    }
  };

  const handleDelete = async (roleId: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      try {
        await deleteRole(roleId);
        loadRoles();
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="p-6">
        {/* Role Management Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Role Management</h1>

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
                placeholder="Enter role name to search"
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
                  checked={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3">
            <Button icon={plusIcon} iconAlt="Create" size="md">
              Create
            </Button>
            <div className="flex gap-3">
              <Button onClick={handleClear} variant="secondary" icon={reloadIcon} iconAlt="Clear" size="md">
                Clear
              </Button>
              <Button onClick={handleSearch} icon={searchIcon} iconAlt="Search" size="md">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Role List Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Role List</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Description
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
                    <td colSpan={4} className="py-3 px-4 text-center text-sm text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : roles && roles.content.length > 0 ? (
                  roles.content.map((role) => (
                    <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">{role.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{role.description || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {role.active ? 'Yes' : 'No'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(role.id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <img src={editIcon} alt="Edit" className="w-5 h-5" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
                          </button>
                          <button
                            onClick={() => handleDelete(role.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-3 px-4 text-center text-sm text-gray-500">
                      No roles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={roles?.totalPages || 0}
            totalItems={roles?.totalElements || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>

        {/* Add Role Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {editingId ? 'Edit Role' : 'Add Role'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter role name (e.g., ROLE_ADMIN)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Enter role description"
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
            <Button onClick={handleCancel} variant="secondary" icon={reloadIcon} iconAlt="Cancel" size="lg">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading} icon={saveIcon} iconAlt="Save" size="lg">
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RoleManagementPage;
