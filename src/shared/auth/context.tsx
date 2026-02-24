import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { tokenStore } from "../../shared/api/tokenStore";
import { authApi, userApi } from "../../entities/user/api";
import type { User, LoginDto, RegisterDto } from "../../entities/user/model";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const TOKEN_KEY = "prestige_token";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) {
      setLoading(false);
      return;
    }
    tokenStore.set(storedToken);
    userApi
      .getMe()
      .then((u) => {
        setUser(u);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem("clientId");
        tokenStore.clear();
      })
      .finally(() => setLoading(false));
  }, []);

  const persistToken = (token: string, userId: string) => {
    tokenStore.set(token);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("clientId", userId);
  };

  const clearSession = () => {
    tokenStore.clear();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("clientId");
    setUser(null);
  };

  const login = useCallback(async (dto: LoginDto) => {
    const res = await authApi.login(dto);
    persistToken(res.accessToken, res.user.id);
    localStorage.setItem("clientId", res.user.id);
    setUser(res.user);
  }, []);

  const register = useCallback(async (dto: RegisterDto) => {
    const res = await authApi.register(dto);
    persistToken(res.accessToken, res.user.id);
    setUser(res.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* ignore server errors on logout */
    }
    clearSession();
  }, []);

  const refreshUser = useCallback(async () => {
    const updated = await userApi.getMe();
    setUser(updated);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
