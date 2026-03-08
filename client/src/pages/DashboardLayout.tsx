import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import {
  BigSidebar,
  Navbar,
  SmallSidebar,
} from '../components';
import { createContext, useContext, useState } from 'react';
import {
  checkDefaultTheme,
  darkThemeLocalStorageName,
} from '../App';
import serverRequest from '../utils/serverRequest.utils';
import { toast } from 'react-toastify';

// eslint-disable-next-line
export const loader = async () => {
  try {
    const { data } = await serverRequest.get(
      '/users/current-user',
    );
    return data;
    // eslint-disable-next-line
  } catch (_) {
    return redirect('/');
  }
};

export interface User {
  name: string;
  avatar?: string;
}

interface DashBoardContextInterface {
  user: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
}

const initValues: DashBoardContextInterface = {
  user: { name: '', avatar: '' },
  showSidebar: false,
  isDarkTheme: false,
  toggleDarkTheme: () => {},
  toggleSidebar: () => {},
  logoutUser: () => {},
};

const DashboardContext =
  createContext<DashBoardContextInterface>(initValues);

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] =
    useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    checkDefaultTheme,
  );

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle(
      'dark-theme',
      newDarkTheme,
    );
    localStorage.setItem(
      darkThemeLocalStorageName,
      `${newDarkTheme}`,
    );
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    navigate('/');
    await serverRequest.get('/auth/logout');
    toast.success('Logging out...');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export default DashboardLayout;

//Fast refresh issue
// eslint-disable-next-line
export const useDashboardContext = () =>
  useContext(DashboardContext);
