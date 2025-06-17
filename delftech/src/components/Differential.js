import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaUsers, FaLaptopCode, FaHeadset, FaChartLine } from 'react-icons/fa';

const Differential = () => {
  const differentials = [
    {
      icon: <FaUsers />,
      title: 'Equipe Especializada',
      description: 'Profissionais certificados em múltiplas tecnologias e metodologias ágeis.',
      color: '#64ffda'
    },
    {
      icon: <FaLaptopCode />,
      title: 'Soluções Personalizadas',
      description: 'Desenvolvimento sob medida para atender às necessidades específicas do seu negócio.',
      color: '#63e6be'
    },
    {
      icon: <FaHeadset />,
      title: 'Suporte 24/7',
      description: 'Equipe de suporte disponível 24 horas por dia, 7 dias por semana.',
      color: '#5bd3a8'
    },
    {
      icon: <FaChartLine />,
      title: 'Resultados Mensuráveis',
      description: 'Compromisso com métricas claras e resultados tangíveis para seu investimento.',
      color: '#4fc08d'
    }
  ];

  return (
    <DifferentialContainer id="diferencial">
      <BackgroundPattern />
      <DifferentialWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <DifferentialHeading>
            <HeadingAccent>Por que nos escolher</HeadingAccent>
            <h2>Nosso Diferencial</h2>
            <HeadingLine />
            <p>Combinamos expertise técnica com foco em resultados para seu negócio</p>
          </DifferentialHeading>
        </motion.div>

        <DifferentialIntro>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <IntroText>
              Oferecemos soluções completas em tecnologia, desde o desenvolvimento até o suporte contínuo. 
              Nossa abordagem é analisar seu cenário específico para oferecer o mínimo de tecnologia com o máximo de impacto.
            </IntroText>
          </motion.div>
        </DifferentialIntro>

        <DifferentialCardsGrid>
          {differentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
            >
              <DifferentialCard
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
                }}
              >
                <IconContainer color={item.color}>
                  {item.icon}
                  <IconRing />
                </IconContainer>
                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </DifferentialCard>
            </motion.div>
          ))}
        </DifferentialCardsGrid>

        <DifferentialFeatures>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <FeaturesHeading>
              <h3>Benefícios exclusivos</h3>
              <FeaturesDivider />
            </FeaturesHeading>

            <FeaturesGrid>
              <FeatureItem>
                <FeatureIcon>
                  <FaCheckCircle />
                </FeatureIcon>
                <FeatureText>Metodologia ágil de desenvolvimento</FeatureText>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>
                  <FaCheckCircle />
                </FeatureIcon>
                <FeatureText>Transparência em todas as etapas do projeto</FeatureText>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>
                  <FaCheckCircle />
                </FeatureIcon>
                <FeatureText>Tecnologias de ponta e código limpo</FeatureText>
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>
                  <FaCheckCircle />
                </FeatureIcon>
                <FeatureText>Escalabilidade e performance garantidas</FeatureText>
              </FeatureItem>
            </FeaturesGrid>
          </motion.div>
        </DifferentialFeatures>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <CTAContainer>
            <CTAText>Pronto para transformar seu negócio com tecnologia?</CTAText>
            <CTAButton 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contato"
            >
              Fale com um especialista
            </CTAButton>
          </CTAContainer>
        </motion.div>
      </DifferentialWrapper>
    </DifferentialContainer>
  );
};

const DifferentialContainer = styled.section`
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
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(100, 255, 218, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 80% 70%, rgba(100, 255, 218, 0.05) 0%, transparent 20%);
  z-index: 1;
`;

const DifferentialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2;
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

const DifferentialHeading = styled.div`
  margin-bottom: 48px;
  text-align: center;
  
  h2 {
    font-size: 3rem;
    color: var(--text);
    margin-bottom: 16px;
    position: relative;
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

const DifferentialIntro = styled.div`
  max-width: 800px;
  margin: 0 auto 60px;
  text-align: center;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-secondary);
`;

const DifferentialCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 100%;
  margin-bottom: 80px;
  
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DifferentialCard = styled(motion.div)`
  background: var(--primary);
  border-radius: 12px;
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const IconContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  
  svg {
    font-size: 2.5rem;
    color: ${props => props.color || 'var(--accent)'};
    z-index: 2;
  }
`;

const IconRing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px dashed var(--accent);
  opacity: 0.3;
  animation: spin 20s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 15px;
  font-weight: 600;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
`;

const DifferentialFeatures = styled.div`
  width: 100%;
  margin-bottom: 80px;
`;

const FeaturesHeading = styled.div`
  margin-bottom: 40px;
  text-align: center;
  
  h3 {
    font-size: 2rem;
    color: var(--text);
    margin-bottom: 15px;
  }
`;

const FeaturesDivider = styled.div`
  width: 60px;
  height: 3px;
  background: var(--accent);
  margin: 0 auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(10, 25, 47, 0.3);
  padding: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    background: rgba(10, 25, 47, 0.5);
  }
`;

const FeatureIcon = styled.div`
  margin-right: 15px;
  
  svg {
    font-size: 1.5rem;
    color: var(--accent);
  }
`;

const FeatureText = styled.p`
  font-size: 1.1rem;
  color: var(--text);
`;

const CTAContainer = styled.div`
  text-align: center;
  padding: 40px;
  background: rgba(10, 25, 47, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(100, 255, 218, 0.1);
`;

const CTAText = styled.p`
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 25px;
  font-weight: 600;
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  background: var(--accent);
  color: var(--primary);
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
  
  &:hover {
    background: #7cffdf;
  }
`;

export default Differential;