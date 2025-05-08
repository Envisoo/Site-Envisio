import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUsers, FaLaptopCode, FaCheckCircle, FaAward } from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('historia');
  
  const stats = [
    { icon: <FaUsers />, value: '150+', label: 'Clientes Satisfeitos' },
    { icon: <FaLaptopCode />, value: '200+', label: 'Projetos Entregues' },
    { icon: <FaCheckCircle />, value: '99%', label: 'Taxa de Satisfação' },
    { icon: <FaAward />, value: '15+', label: 'Anos de Experiência' }
  ];
  
  const team = [
    { name: 'Ana Silva', role: 'CEO & Fundadora', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Carlos Mendes', role: 'CTO', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Juliana Costa', role: 'Desenvolvedora Sênior', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'Rafael Santos', role: 'Especialista em Infraestrutura', image: 'https://randomuser.me/api/portraits/men/75.jpg' }
  ];

  return (
    <AboutContainer id="sobre">
      <AboutWrapper>
        <AboutHeading>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Sobre Nós
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Conheça nossa história, missão e equipe
          </motion.p>
        </AboutHeading>
        
        <TabsContainer>
          <TabButton 
            active={activeTab === 'historia'} 
            onClick={() => setActiveTab('historia')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nossa História
          </TabButton>
          <TabButton 
            active={activeTab === 'missao'} 
            onClick={() => setActiveTab('missao')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Missão & Visão
          </TabButton>
          <TabButton 
            active={activeTab === 'equipe'} 
            onClick={() => setActiveTab('equipe')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nossa Equipe
          </TabButton>
        </TabsContainer>
        
        <TabContent>
          {activeTab === 'historia' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AboutContent>
                <AboutTextColumn>
                  <AboutText>
                    <h3>Nossa Trajetória</h3>
                    <p>
                      Fundada em 2008, a DelfTech nasceu da visão de transformar o mercado de tecnologia no Brasil. Começamos como uma pequena consultoria e hoje somos referência em soluções tecnológicas completas.
                    </p>
                    <p>
                      Somos especialistas em tecnologia, focados em entregar soluções que vão desde o desenvolvimento de software até consultoria em infraestrutura. Nossa equipe combina experiência técnica com visão estratégica para transformar desafios em oportunidades de crescimento.
                    </p>
                  </AboutText>
                </AboutTextColumn>
                <AboutImageColumn>
                  <AboutImage 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Equipe DelfTech"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                </AboutImageColumn>
              </AboutContent>
              
              <StatsContainer>
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <StatBox>
                      <StatIcon>{stat.icon}</StatIcon>
                      <StatValue>{stat.value}</StatValue>
                      <StatLabel>{stat.label}</StatLabel>
                    </StatBox>
                  </motion.div>
                ))}
              </StatsContainer>
            </motion.div>
          )}
          
          {activeTab === 'missao' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MissionVisionContainer>
                <MissionBox>
                  <h3>Nossa Missão</h3>
                  <p>
                    Capacitar empresas através da tecnologia, oferecendo soluções personalizadas em desenvolvimento, infraestrutura e suporte técnico. Nosso compromisso é entregar resultados mensuráveis e duradouros.
                  </p>
                </MissionBox>
                
                <VisionBox>
                  <h3>Nossa Visão</h3>
                  <p>
                    Ser reconhecida como a principal parceira tecnológica para empresas que buscam inovação e excelência, criando um impacto positivo através de soluções que impulsionam o crescimento e a transformação digital.
                  </p>
                </VisionBox>
                
                <ValuesBox>
                  <h3>Nossos Valores</h3>
                  <ValuesList>
                    <ValuesItem>
                      <ValuesDot />
                      <span>Excelência técnica e inovação constante</span>
                    </ValuesItem>
                    <ValuesItem>
                      <ValuesDot />
                      <span>Compromisso com resultados</span>
                    </ValuesItem>
                    <ValuesItem>
                      <ValuesDot />
                      <span>Transparência e ética em todas as relações</span>
                    </ValuesItem>
                    <ValuesItem>
                      <ValuesDot />
                      <span>Foco no cliente e suas necessidades</span>
                    </ValuesItem>
                    <ValuesItem>
                      <ValuesDot />
                      <span>Desenvolvimento contínuo da nossa equipe</span>
                    </ValuesItem>
                  </ValuesList>
                </ValuesBox>
              </MissionVisionContainer>
            </motion.div>
          )}
          
          {activeTab === 'equipe' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TeamContainer>
                <TeamIntro>
                  <h3>Conheça Nossa Equipe</h3>
                  <p>Profissionais apaixonados por tecnologia e inovação, prontos para transformar sua empresa</p>
                </TeamIntro>
                
                <TeamGrid>
                  {team.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <TeamMember whileHover={{ y: -10 }}>
                        <TeamMemberImage src={member.image} alt={member.name} />
                        <TeamMemberInfo>
                          <h4>{member.name}</h4>
                          <p>{member.role}</p>
                        </TeamMemberInfo>
                      </TeamMember>
                    </motion.div>
                  ))}
                </TeamGrid>
              </TeamContainer>
            </motion.div>
          )}
        </TabContent>
      </AboutWrapper>
    </AboutContainer>
  );
};

const AboutContainer = styled.section`
  color: var(--text);
  background: var(--primary);
  padding: 100px 0;
`;

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const AboutHeading = styled.div`
  margin-bottom: 48px;
  text-align: center;
  
  h2 {
    font-size: 2.5rem;
    color: var(--text);
    position: relative;
    margin-bottom: 16px;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 3px;
      background: var(--accent);
    }
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1.2rem;
    margin-top: 20px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  gap: 20px;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const TabButton = styled(motion.button)`
  background: ${({ active }) => active ? 'var(--accent)' : 'transparent'};
  color: ${({ active }) => active ? 'var(--primary)' : 'var(--text)'};
  border: ${({ active }) => active ? 'none' : '1px solid var(--accent)'};
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ active }) => active ? 'var(--accent)' : 'rgba(100, 255, 218, 0.1)'};
  }
`;

const TabContent = styled.div`
  width: 100%;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AboutText = styled.div`
  h3 {
    color: var(--accent);
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 20px;
  }
`;

const AboutImageColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutImage = styled(motion.img)`
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const StatBox = styled.div`
  background: var(--secondary);
  padding: 30px 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: var(--accent);
  margin-bottom: 15px;
`;

const StatValue = styled.h4`
  font-size: 2rem;
  color: var(--text);
  margin-bottom: 5px;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const MissionVisionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MissionBox = styled.div`
  background: var(--secondary);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  grid-column: 1 / 2;
  
  h3 {
    color: var(--accent);
    margin-bottom: 16px;
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-secondary);
  }
  
  @media screen and (max-width: 768px) {
    grid-column: 1;
  }
`;

const VisionBox = styled(MissionBox)`
  grid-column: 2 / 3;
  
  @media screen and (max-width: 768px) {
    grid-column: 1;
  }
`;

const ValuesBox = styled(MissionBox)`
  grid-column: 1 / 3;
  margin-top: 30px;
  
  @media screen and (max-width: 768px) {
    grid-column: 1;
  }
`;

const ValuesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
`;

const ValuesItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: var(--text-secondary);
`;

const ValuesDot = styled.span`
  width: 12px;
  height: 12px;
  background: var(--accent);
  border-radius: 50%;
  margin-right: 15px;
`;

const TeamContainer = styled.div`
  width: 100%;
`;

const TeamIntro = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h3 {
    color: var(--accent);
    font-size: 1.8rem;
    margin-bottom: 15px;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
`;

const TeamMember = styled(motion.div)`
  background: var(--secondary);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
`;

const TeamMemberImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const TeamMemberInfo = styled.div`
  padding: 20px;
  text-align: center;
  
  h4 {
    color: var(--text);
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
  
  p {
    color: var(--accent);
    font-size: 0.9rem;
  }
`;

export default About;