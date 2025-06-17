import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaShieldAlt, FaTools, FaLaptopCode, FaRocket, FaArrowRight } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaCode />,
      title: 'Desenvolvimento de Software',
      description: 'Criação de sistemas, aplicativos web/mobile, sites responsivos e soluções de e-commerce personalizadas.',
      details: 'Utilizamos as mais modernas tecnologias como React, Node.js, Python e Flutter para criar soluções sob medida que atendem às necessidades específicas do seu negócio.'
    },
    {
      icon: <FaServer />,
      title: 'Consultoria em Infraestrutura',
      description: 'Análise e redesign de redes, data centers e cloud computing para otimização de performance.',
      details: 'Avaliamos sua infraestrutura atual e propomos melhorias que reduzem custos e aumentam a eficiência, com foco em soluções AWS, Azure e Google Cloud.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Segurança Cibernética',
      description: 'Proteção de dados, diagnóstico de vulnerabilidades e implementação de soluções de segurança.',
      details: 'Realizamos testes de penetração, análise de vulnerabilidades e implementamos políticas de segurança robustas para proteger seus dados e sistemas contra ameaças.'
    },
    {
      icon: <FaTools />,
      title: 'Suporte Técnico',
      description: 'Manutenção de hardware/software, resolução de problemas e suporte contínuo.',
      details: 'Oferecemos suporte técnico 24/7 para garantir que seus sistemas estejam sempre funcionando perfeitamente, com tempo de resposta rápido e soluções eficientes.'
    },
    {
      icon: <FaLaptopCode />,
      title: 'Soluções em Programação',
      description: 'Desenvolvimento de funcionalidades, correção de bugs e otimização de código.',
      details: 'Nossa equipe de desenvolvedores experientes pode resolver problemas complexos de código, otimizar performance e adicionar novas funcionalidades aos seus sistemas existentes.'
    },
    {
      icon: <FaRocket />,
      title: 'Transformação Digital',
      description: 'Modernização de processos e implementação de novas tecnologias.',
      details: 'Ajudamos sua empresa a se adaptar ao mundo digital, automatizando processos, implementando novas tecnologias e criando uma cultura de inovação.'
    }
  ];

  const [activeCard, setActiveCard] = useState(null);

  const handleCardHover = (index) => {
    setActiveCard(index);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  return (
    <ServicesContainer id="servicos">
      <BackgroundPattern />
      <ServicesWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ServicesHeading>
            <HeadingAccent>Nossos</HeadingAccent>
            <h2>Serviços</h2>
            <HeadingLine />
            <p>Soluções completas para impulsionar seu negócio</p>
          </ServicesHeading>
        </motion.div>

        <ServicesGrid>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard 
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
                isActive={activeCard === index}
              >
                <ServiceCardInner>
                  <ServiceIconWrapper isActive={activeCard === index}>
                    {service.icon}
                  </ServiceIconWrapper>
                  <ServiceContent>
                    <ServiceTitle>{service.title}</ServiceTitle>
                    <ServiceDescription>{service.description}</ServiceDescription>
                    <ServiceDetailsWrapper isActive={activeCard === index}>
                      <ServiceDetails>{service.details}</ServiceDetails>
                      <LearnMoreButton>
                        Saiba mais <FaArrowRight />
                      </LearnMoreButton>
                    </ServiceDetailsWrapper>
                  </ServiceContent>
                </ServiceCardInner>
              </ServiceCard>
            </motion.div>
          ))}
        </ServicesGrid>
        
        <ServicesFooter>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ContactButton>Solicite uma Consultoria</ContactButton>
          </motion.div>
        </ServicesFooter>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

const ServicesContainer = styled.section`
  color: var(--text);
  background: var(--secondary);
  padding: 120px 0;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(100, 255, 218, 0.1) 2px, transparent 2px);
  background-size: 30px 30px;
  opacity: 0.3;
  z-index: 1;
`;

const ServicesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2;
`;

const ServicesHeading = styled.div`
  margin-bottom: 80px;
  text-align: center;
  position: relative;
  
  h2 {
    font-size: 3rem;
    color: var(--text);
    margin-bottom: 24px;
    font-weight: 700;
    letter-spacing: 1px;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const HeadingAccent = styled.span`
  display: block;
  color: var(--accent);
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const HeadingLine = styled.div`
  width: 80px;
  height: 4px;
  background: var(--accent);
  margin: 0 auto 24px;
  border-radius: 2px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: ${({ isActive }) => isActive ? 'rgba(10, 25, 47, 0.9)' : 'var(--primary)'};
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--accent);
    transform: ${({ isActive }) => isActive ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

const ServiceCardInner = styled.div`
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ServiceIconWrapper = styled.div`
  font-size: 3.5rem;
  color: var(--accent);
  margin-bottom: 25px;
  transition: all 0.3s ease;
  transform: ${({ isActive }) => isActive ? 'scale(1.1)' : 'scale(1)'};
`;

const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: var(--text);
  font-weight: 600;
  position: relative;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
`;

const ServiceDetailsWrapper = styled.div`
  margin-top: auto;
  opacity: ${({ isActive }) => isActive ? '1' : '0'};
  max-height: ${({ isActive }) => isActive ? '200px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const ServiceDetails = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
  border-top: 1px solid rgba(100, 255, 218, 0.2);
  padding-top: 20px;
`;

const LearnMoreButton = styled.button`
  background: transparent;
  border: none;
  color: var(--accent);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #7cffdf;
    
    svg {
      transform: translateX(5px);
    }
  }
`;

const ServicesFooter = styled.div`
  margin-top: 60px;
  text-align: center;
`;

const ContactButton = styled.button`
  background: var(--accent);
  color: var(--primary);
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
  
  &:hover {
    background: #7cffdf;
    box-shadow: 0 8px 20px rgba(100, 255, 218, 0.4);
  }
`;

export default Services;