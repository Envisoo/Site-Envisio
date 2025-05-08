import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrollNav, setScrollNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('inicio');

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return () => {
      window.removeEventListener('scroll', changeNav);
    };
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSetActive = (to) => {
    setActiveLink(to);
  };

  const navItems = [
    { to: 'inicio', label: 'Início' },
    { to: 'sobre', label: 'Sobre' },
    { to: 'servicos', label: 'Serviços' },
    { to: 'cases', label: 'Cases' },
    { to: 'contato', label: 'Contato' }
  ];

  return (
    <Nav 
      as={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      scrollNav={scrollNav}
    >
      <NavContainer>
        <LogoContainer>
          <NavLogo to="inicio" smooth={true} duration={500} spy={true} exact="true" offset={-80}>
            <LogoIcon><FaCode /></LogoIcon>
            <LogoText>Delf<LogoAccent>Tech</LogoAccent></LogoText>
          </NavLogo>
        </LogoContainer>

        <MobileIcon onClick={toggle}>
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </MobileIcon>

        <NavMenu isOpen={isOpen}>
          {navItems.map((item) => (
            <NavItem key={item.to}>
              <NavLink
                to={item.to}
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
                onClick={toggle}
                onSetActive={handleSetActive}
                isActive={activeLink === item.to}
              >
                {item.label}
                {activeLink === item.to && <NavLinkUnderline layoutId="underline" />}
              </NavLink>
            </NavItem>
          ))}
        </NavMenu>

        <NavBtn>
          <NavBtnLink 
            to="contato"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Orçamento
          </NavBtnLink>
        </NavBtn>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  background: ${({ scrollNav }) => (scrollNav ? 'rgba(10, 25, 47, 0.95)' : 'transparent')};
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: all 0.5s ease;
  backdrop-filter: ${({ scrollNav }) => (scrollNav ? 'blur(10px)' : 'none')};
  box-shadow: ${({ scrollNav }) => (scrollNav ? '0 5px 20px rgba(0, 0, 0, 0.2)' : 'none')};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 50px;
  max-width: 1200px;

  @media screen and (max-width: 768px) {
    padding: 0 24px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLogo = styled(ScrollLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;
`;

const LogoIcon = styled.div`
  color: var(--accent);
  font-size: 1.8rem;
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  color: var(--text);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const LogoAccent = styled.span`
  color: var(--accent);
`;

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    cursor: pointer;
    color: var(--text);
    z-index: 99;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    transition: all 0.5s ease;
    background: var(--primary);
    padding-top: 80px;
  }
`;

const NavItem = styled.li`
  height: 80px;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 60px;
  }
`;

const NavLink = styled(ScrollLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.5rem;
  height: 100%;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? 'var(--accent)' : 'var(--text)')};
  position: relative;
  transition: color 0.3s ease;
  font-weight: 500;

  &:hover {
    color: var(--accent);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
  }
`;

const NavLinkUnderline = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 3px;
  width: 30px;
  background: var(--accent);
  border-radius: 2px;
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(motion(ScrollLink))`
  background: var(--accent);
  padding: 10px 25px;
  color: var(--primary);
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(100, 255, 218, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: #7cffdf;
    box-shadow: 0 8px 20px rgba(100, 255, 218, 0.3);
  }
`;

export default Navbar;