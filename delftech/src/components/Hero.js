import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import heroImage from '../assets/hero-bg.jpg'; // You'll need to add this image

const Hero = () => {
  const [hover, setHover] = useState(false);
  
  // Text animation for typing effect


  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer id="inicio">
      <HeroBg>
        <ImageBg src={heroImage} alt="Background" />
        <Overlay />
        <ParticlesContainer>
          {[...Array(20)].map((_, i) => (
            <Particle 
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </ParticlesContainer>
      </HeroBg>
      <HeroContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroAccent>Bem-vindo à</HeroAccent>
          <HeroH1>
            Delf<AccentText>Tech</AccentText>
          </HeroH1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroH2>Inovação & Tecnologia</HeroH2>
          <HeroP>
          </HeroP>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <HeroBtnWrapper>
            <Button
              to="contato"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
              primary="true"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Consulta
            </Button>
            <Button
              to="servicos"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
              primary="false"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Conhecer Serviços
            </Button>
          </HeroBtnWrapper>
        </motion.div>
      </HeroContent>
      <ScrollDown 
        to="sobre" 
        smooth={true} 
        duration={500} 
        spy={true} 
        exact="true" 
        offset={-80}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div>
          <span className="arrow-down"></span>
        </div>
      </ScrollDown>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  background: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 100vh;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const HeroAccent = styled.span`
  color: var(--accent);
  font-size: 1.2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 16px;
  display: block;
`;

const AccentText = styled.span`
  color: var(--accent);
`;

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ImageBg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  -o-object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(10, 25, 47, 0.8) 0%,
    rgba(10, 25, 47, 0.95) 100%
  );
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Particle = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0.3;
  animation: float linear infinite;
  
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(-100vh) translateX(100px);
      opacity: 0;
    }
  }
`;

const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroH1 = styled.h1`
  color: var(--text);
  font-size: 4rem;
  text-align: center;
  margin-bottom: 12px;
  font-weight: 700;
  letter-spacing: 1px;

  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const HeroH2 = styled.h2`
  color: var(--text-secondary);
  font-size: 2rem;
  text-align: center;
  margin-bottom: 24px;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const HeroP = styled.p`
  margin-top: 24px;
  color: var(--text-secondary);
  font-size: 24px;
  text-align: center;
  max-width: 600px;
  min-height: 72px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

const Cursor = styled.span`
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const HeroBtnWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled(motion(ScrollLink))`
  border-radius: 50px;
  background: ${({ primary }) => (primary === "true" ? 'var(--accent)' : 'transparent')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
  color: ${({ primary }) => (primary === "true" ? 'var(--primary)' : 'var(--text)')};
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: ${({ primary }) => (primary === "true" ? 'none' : '1px solid var(--accent)')};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  font-weight: bold;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary === "true" ? 'var(--text)' : 'var(--accent)')};
    color: ${({ primary }) => (primary === "true" ? 'var(--primary)' : 'var(--primary)')};
  }
`;

const ScrollDown = styled(ScrollLink)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  .mouse {
    width: 30px;
    height: 50px;
    border: 2px solid var(--accent);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
  }
  
  .wheel {
    width: 4px;
    height: 8px;
    background: var(--accent);
    border-radius: 2px;
    margin-top: 10px;
    animation: scroll 1.5s infinite;
  }
  
  @keyframes scroll {
    0% { transform: translateY(0); opacity: 0; }
    30% { opacity: 1; }
    100% { transform: translateY(15px); opacity: 0; }
  }
  
  .arrow-down {
    display: block;
    width: 10px;
    height: 10px;
    border-right: 2px solid var(--accent);
    border-bottom: 2px solid var(--accent);
    transform: rotate(45deg);
    animation: arrow 1.5s infinite;
    animation-delay: 1s;
  }
  
  @keyframes arrow {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export default Hero;