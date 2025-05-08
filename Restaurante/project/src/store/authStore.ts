import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
}

const API_BASE_URL = 'http://localhost:3000';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  token: null,

  signIn: async (email: string, password: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to sign in');
      }

      const data = await response.json();
      set({ user: data.user, token: data.token }); // Armazena o usuário e o token
      localStorage.setItem('token', data.token); // Salva o token no localStorage
    } catch (error) {
      throw error;
    }
  },

  signUp: async (email: string, password: string, fullName: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to sign up');
      }

      const data = await response.json();
      set({ user: data.user, token: data.token }); // Armazena o usuário e o token
      localStorage.setItem('token', data.token); // Salva o token no localStorage
    } catch (error) {
      throw error;
    }
  },

  signOut: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Envia o token no cabeçalho
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to sign out');
      }

      set({ user: null, token: null });
      localStorage.removeItem('token'); // Remove o token do localStorage
    } catch (error) {
      throw error;
    }
  },

  loadUser: async () => {
    try {
      set({ isLoading: true });

      const token = localStorage.getItem('token');
      if (!token) {
        set({ user: null, isLoading: false });
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/session`, {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load user session');
      }

      const data = await response.json();
      if (data.user) {
        set({ user: data.user, token });
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      localStorage.removeItem('token'); // Remove o token inválido
      set({ user: null, token: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));