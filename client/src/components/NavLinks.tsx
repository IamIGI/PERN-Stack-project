import { useDashboardContext } from '../pages/DashboardLayout';
import { UserRole } from '../types';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

interface Props {
  isBigSidebar?: boolean;
}

const NavLinks = ({ isBigSidebar }: Props) => {
  const { user, toggleSidebar } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user!;

        if (path === 'admin' && role !== UserRole.ADMIN)
          return;

        return (
          <NavLink
            to={path}
            key={text}
            onClick={
              isBigSidebar ? undefined : toggleSidebar
            }
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
