import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { NavItem as PFNavItem } from '@patternfly/react-core';

type ActiveChildrenProps = {
  isActive: boolean;
  children: React.ReactNode;
  setIsActive: (isActive: boolean) => void;
};

const ActiveChildren: React.FC<ActiveChildrenProps> = ({ isActive, children, setIsActive }) => {
  React.useEffect(() => {
    setIsActive(isActive);
  }, [isActive, setIsActive]);
  return children;
};

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};

const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <PFNavItem id={to} isActive={isActive}>
      <NavLink to={to}>
        {({ isActive }) => (
          <ActiveChildren setIsActive={setIsActive} isActive={isActive}>
            {children}
          </ActiveChildren>
        )}
      </NavLink>
    </PFNavItem>
  );
};

export default NavItem;
