import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaArrowRight, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaChevronUp 
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor, insira seu email');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
      setError('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterGlow />
      <FooterWrapper
        as={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
        <FooterTop>
          <motion.div variants={itemVariants} className="footer-column">
            <FooterLogo>
              <LogoText>Delf<LogoAccent>Tech</LogoAccent></LogoText>
              <LogoTagline>Soluções Completas em TI</LogoTagline>
              <CompanyDescription>
                Transformamos ideias em soluções digitais inovadoras, 
                ajudando empresas a alcançarem seu potencial máximo através da tecnologia.
              </CompanyDescription>
            </FooterLogo>
            <ContactInfo>
              <ContactItem>
                <ContactIcon>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <span>Bairro do Maculusso, Luanda - Angola</span>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <FaPhone />
                </ContactIcon>
                <span>(+244) XX XXX XXX</span>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <span>contato@delftech.com</span>
              </ContactItem>
            </ContactInfo>
          </motion.div>
          
          <motion.div variants={itemVariants} className="footer-column">
            <FooterLinks>
              <FooterHeading>Links Rápidos</FooterHeading>
              <FooterNav>
                <FooterNavItem 
                  to="inicio" 
                  smooth={true}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Início
                </FooterNavItem>
                <FooterNavItem 
                  to="sobre" 
                  smooth={true}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Sobre
                </FooterNavItem>
                <FooterNavItem 
                  to="servicos" 
                  smooth={true}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Serviços
                </FooterNavItem>
                <FooterNavItem 
                  to="diferencial" 
                  smooth={true}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Diferencial
                </FooterNavItem>
                <FooterNavItem 
                  to="cases" 
                  smooth={true}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Cases
                </FooterNavItem>
                <FooterNavItem 
                  to="contato" 
                  smooth={true}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Contato
                </FooterNavItem>
              </FooterNav>
            </FooterLinks>
          </motion.div>
          
          <motion.div variants={itemVariants} className="footer-column">
            <FooterServices>
              <FooterHeading>Nossos Serviços</FooterHeading>
              <ServicesList>
                <ServiceItem 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Desenvolvimento Web
                </ServiceItem>
                <ServiceItem 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Aplicativos Mobile
                </ServiceItem>
                <ServiceItem 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Consultoria em TI
                </ServiceItem>
                <ServiceItem 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  UX/UI Design
                </ServiceItem>
                <ServiceItem 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Cloud Computing
                </ServiceItem>
                <ServiceItem 
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Inteligência Artificial
                </ServiceItem>
              </ServicesList>
            </FooterServices>
          </motion.div>
          
          <motion.div variants={itemVariants} className="footer-column">
            <NewsletterContainer>
              <FooterHeading>Newsletter</FooterHeading>
              <NewsletterText>
                Receba novidades e atualizações sobre tecnologia diretamente no seu email
              </NewsletterText>
              
              <NewsletterForm onSubmit={handleSubscribe}>
                <InputWrapper>
                  <NewsletterInput
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={handleEmailChange}
                    hasError={!!error}
                    disabled={isSubmitting || subscribed}
                  />
                  <NewsletterButton
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting || subscribed}
                  >
                    {isSubmitting ? (
                      <LoadingSpinner />
                    ) : (
                      <FaArrowRight />
                    )}
                  </NewsletterButton>
                </InputWrapper>
                
                <AnimatePresence>
                  {error && (
                    <ErrorText
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {error}
                    </ErrorText>
                  )}
                  {subscribed && (
                    <SuccessText
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <FaEnvelope /> Inscrição realizada com sucesso!
                    </SuccessText>
                  )}
                </AnimatePresence>
              </NewsletterForm>
              
              <FooterSocial>
                <SocialHeading>Siga-nos</SocialHeading>
                <SocialIcons>
                  <SocialIcon 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1, backgroundColor: '#4267B2' }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </SocialIcon>
                  <SocialIcon 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1, backgroundColor: '#1DA1F2' }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </SocialIcon>
                  <SocialIcon 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1, backgroundColor: '#E1306C' }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </SocialIcon>
                  <SocialIcon 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1, backgroundColor: '#0077B5' }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </SocialIcon>
                  <SocialIcon 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1, backgroundColor: '#333' }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </SocialIcon>
                </SocialIcons>
              </FooterSocial>
            </NewsletterContainer>
          </motion.div>
        </FooterTop>
        
        <FooterDivider />
        
        <FooterBottom>
          <CopyrightText>
            &copy; {currentYear} <CopyrightHighlight>DelfTech</CopyrightHighlight>. Todos os direitos reservados.
          </CopyrightText>
          
          <FooterPolicy>
            <PolicyLink href="#">Política de Privacidade</PolicyLink>
            <PolicyDot>•</PolicyDot>
            <PolicyLink href="#">Termos de Uso</PolicyLink>
          </FooterPolicy>
          
          <BackToTopButton 
            to="inicio" 
            smooth={true} 
            duration={800} 
            spy={true} 
            exact="true" 
            offset={-80}
            whileHover={{ y: -3, boxShadow: '0 5px 15px rgba(100, 255, 218, 0.3)' }}
            whileTap={{ y: 0 }}
          >
            <FaChevronUp />
          </BackToTopButton>
        </FooterBottom>
      </FooterWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: var(--secondary);
  color: var(--text);
  padding: 80px 0 30px;
  position: relative;
  overflow: hidden;
`;

const FooterGlow = styled.div`
  position: absolute;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 200px;
  background: radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, rgba(100, 255, 218, 0) 70%);
  pointer-events: none;
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2;
  
  .footer-column {
    display: flex;
    flex-direction: column;
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 50px;
  
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterLogo = styled.div`
  margin-bottom: 25px;
`;

const LogoText = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: 1px;
`;

const LogoAccent = styled.span`
  color: var(--accent);
`;

const LogoTagline = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 20px;
`;

const CompanyDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 0.95rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.95rem;
`;

const ContactIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  margin-right: 15px;
  color: var(--accent);
`;

const FooterHeading = styled.h4`
  color: var(--text);
  font-size: 1.2rem;
  margin-bottom: 25px;
  position: relative;
  font-weight: 600;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--accent);
    border-radius: 2px;
  }
`;

const FooterLinks = styled.div``;

const FooterNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FooterNavItem = styled(motion(ScrollLink))`
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  
  &:hover {
    color: var(--accent);
  }
  
  &:before {
    content: '›';
    margin-right: 8px;
    color: var(--accent);
    font-size: 1.2rem;
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
    transform: translateX(0);
  }
`;

const FooterServices = styled.div``;

const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ServiceItem = styled(motion.div)`
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  
  &:hover {
    color: var(--accent);
  }
  
  &:before {
    content: '›';
    margin-right: 8px;
    color: var(--accent);
    font-size: 1.2rem;
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
    transform: translateX(0);
  }
`;

const NewsletterContainer = styled.div``;

const NewsletterText = styled.p`
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.7;
  font-size: 0.95rem;
`;

const NewsletterForm = styled.form`
  margin-bottom: 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const NewsletterInput = styled.input`
  flex-grow: 1;
  padding: 15px;
  border: 1px solid ${({ hasError }) => hasError ? '#ff6b6b' : 'rgba(100, 255, 218, 0.2)'};
  border-right: none;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const NewsletterButton = styled(motion.button)`
  background: var(--accent);
  color: var(--primary);
  border: none;
  padding: 0 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background: #7cffdf;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(10, 25, 47, 0.3);
  border-top: 2px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorText = styled(motion.p)`
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const SuccessText = styled(motion.p)`
  color: var(--accent);
  font-size: 0.9rem;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FooterSocial = styled.div`
  margin-top: 10px;
`;

const SocialHeading = styled.h5`
  font-size: 1rem;
  color: var(--text);
  margin-bottom: 15px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    rgba(100, 255, 218, 0),
    rgba(100, 255, 218, 0.2),
    rgba(100, 255, 218, 0)
  );
  margin-bottom: 30px;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const CopyrightText = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const CopyrightHighlight = styled.span`
  color: var(--accent);
  font-weight: 600;
`;

const FooterPolicy = styled.div`
  display: flex;
  align-items: center;
  
  @media screen and (max-width: 768px) {
    margin: 10px 0;
  }
`;

const PolicyLink = styled.a`
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--accent);
  }
`;

const PolicyDot = styled.span`
  margin: 0 10px;
  color: var(--text-secondary);
`;

const BackToTopButton = styled(motion(ScrollLink))`
  width: 40px;
  height: 40px;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent);
    color: var(--primary);
  }
`;

export default Footer;