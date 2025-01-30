import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Shield, Trash2, User } from 'lucide-react';
import useUserStore from '../store/userStore';
import usePostStore from '../store/postStore';
import useThemeStore from '../store/themeStore';

const AdminDashboard = () => {
  const { users, loading: usersLoading, fetchUsers, makeAdmin, deleteUser } = useUserStore();
  const { posts, loading: postsLoading, fetchPosts, deletePost } = usePostStore();
  const [activeTab, setActiveTab] = useState<'users' | 'posts'>('users');
  const { theme } = useThemeStore();
  const isGreenTheme = theme === 'green';

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, [fetchUsers, fetchPosts]);

  const handleMakeAdmin = async (userId: string) => {
    if (window.confirm('Are you sure you want to make this user an admin?')) {
      try {
        await makeAdmin(userId);
        toast.success('User is now an admin');
      } catch (error) {
        toast.error('Failed to make user admin');
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        toast.success('Post deleted successfully');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className={`${isGreenTheme ? 'bg-theme-green-50' : 'bg-white'} rounded-lg shadow-lg p-6 mb-8`}>
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'users'
                ? isGreenTheme 
                  ? 'bg-theme-green-600 text-white'
                  : 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === 'posts'
                ? isGreenTheme 
                  ? 'bg-theme-green-600 text-white'
                  : 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Posts</span>
          </button>
        </div>

        {activeTab === 'users' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={`${isGreenTheme ? 'bg-theme-green-100' : 'bg-gray-50'}`}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`${isGreenTheme ? 'bg-theme-green-50' : 'bg-white'} divide-y divide-gray-200`}>
                {usersLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className={`${isGreenTheme ? 'hover:bg-theme-green-100' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.socialHandle}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'superadmin'
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'admin'
                              ? isGreenTheme 
                                ? 'bg-theme-green-100 text-theme-green-800'
                                : 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {user.role === 'user' && (
                          <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className={`${
                              isGreenTheme 
                                ? 'text-theme-green-600 hover:text-theme-green-900' 
                                : 'text-indigo-600 hover:text-indigo-900'
                            } mr-4`}
                          >
                            Make Admin
                          </button>
                        )}
                        {user.role !== 'superadmin' && (
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsLoading ? (
              <div className="col-span-full text-center py-8">Loading...</div>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className={`${isGreenTheme ? 'bg-theme-green-50' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-medium">{post.user.name}</h3>
                        <p className="text-sm text-gray-500">
                          {post.user.socialHandle}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {post.images.map((image, index) => (
                        <img
                          key={index}
                          src={`${import.meta.env.VITE_UPLOADS_URL}${image}`}
                          alt={`Post ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{post.caption}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
