import { create } from 'zustand';
import api from '../lib/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  socialHandle: string;
  role: 'user' | 'admin' | 'superadmin';
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  makeAdmin: (userId: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/users');
      set({ users: data, loading: false, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false });
    }
  },

  makeAdmin: async (userId) => {
    try {
      const { data } = await api.put(`/users/${userId}/make-admin`);
      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? { ...user, role: 'admin' } : user
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to make user admin' });
    }
  },

  deleteUser: async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
      }));
    } catch (error) {
      set({ error: 'Failed to delete user' });
    }
  },
}));

export default useUserStore;