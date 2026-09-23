import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  gap: 24px;
  padding: 16px;
  border-bottom: 2px solid black;
`;

// NavLink is just like react-router's <Link>, except it knows when its own
// `to` matches the current URL and adds an "active" class name for us to
// style — that's how we highlight whichever stage you're currently on.
const StyledLink = styled(NavLink)`
  font-family: Oxygen;
  font-weight: 700;
  text-decoration: none;
  color: black;

  &.active {
    text-decoration: underline;
  }
`;

function Nav() {
  return (
    <NavBar>
      <StyledLink to="/dump">1. Brain Dump</StyledLink>
      <StyledLink to="/elaborate">2. Elaborate</StyledLink>
      <StyledLink to="/sort">3. Sort</StyledLink>
    </NavBar>
  );
}

export { Nav };
