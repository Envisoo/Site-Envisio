import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Differential from './components/Differential';
import Cases from './components/Cases';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <GlobalStyle />
      <AnimatePresence>
        {loading ? (
          <LoadingScreen
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LogoAnimation>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.2, 1],
                  opacity: 1
                }}
                transition={{ 
                  duration: 1.5,
                  times: [0, 0.5, 1]
                }}
              >
                <h1>Delf<span>Tech</span></h1>
              </motion.div>
            </LogoAnimation>
          </LoadingScreen>
        ) : (
          <>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Differential />
            <Cases />
            <Contact />
            <Footer />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LogoAnimation = styled.div`
  h1 {
    font-size: 3rem;
    color: var(--text);
    
    span {
      color: var(--accent);
    }
  }
`;

export default App;