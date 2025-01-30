import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserPlus } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  socialHandle: z.string().min(2, 'Social handle must be at least 2 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const { theme } = useThemeStore();
  const isGreenTheme = theme === 'green';
  
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className={`${isGreenTheme ? 'bg-theme-green-50' : 'bg-white'} p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all hover:scale-[1.01]`}>
        <div className="flex items-center justify-center mb-8">
          <UserPlus className={`h-12 w-12 ${isGreenTheme ? 'text-theme-green-600' : 'text-indigo-600'}`} />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...registerField('name')}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${
                isGreenTheme 
                  ? 'focus:ring-theme-green-500 focus:border-theme-green-500' 
                  : 'focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...registerField('email')}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${
                isGreenTheme 
                  ? 'focus:ring-theme-green-500 focus:border-theme-green-500' 
                  : 'focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...registerField('password')}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${
                isGreenTheme 
                  ? 'focus:ring-theme-green-500 focus:border-theme-green-500' 
                  : 'focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="socialHandle" className="block text-sm font-medium text-gray-700">
              Social Handle
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">@</span>
              </div>
              <input
                type="text"
                {...registerField('socialHandle')}
                className={`block w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${
                  isGreenTheme 
                    ? 'focus:ring-theme-green-500 focus:border-theme-green-500' 
                    : 'focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
            </div>
            {errors.socialHandle && (
              <p className="mt-1 text-sm text-red-600">{errors.socialHandle.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isGreenTheme
                ? 'bg-theme-green-600 hover:bg-theme-green-700 focus:ring-theme-green-500'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
