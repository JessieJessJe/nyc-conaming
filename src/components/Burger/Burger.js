//FROM https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
// Burger.js
import React from 'react';
import { StyledBurger } from './Burger.styled';

const Burger = ({expanded, toggleSidebar}) => {
  return (
    <StyledBurger open={expanded} onClick={toggleSidebar}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

export default Burger;