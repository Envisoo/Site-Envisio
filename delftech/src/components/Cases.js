import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaQuoteRight, FaStar } from 'react-icons/fa';

const Cases = () => {
  const caseStudies = [
    {
      title: 'E-commerce',
      challenge: 'Necessidade de plataforma de vendas online',
      solution: 'Desenvolvimento de e-commerce personalizado',
      result: 'Aumento de 150% nas vendas online',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      client: 'Moda Express',
      testimonial: 'A plataforma superou todas as nossas expectativas. Nosso faturamento online cresceu exponencialmente.'
    },
    {
      title: 'Empresa de Logística',
      challenge: 'Sistema legado ineficiente',
      solution: 'Sistema de gestão integrado',
      result: 'Redução de 40% nos custos operacionais',
      image: 'https://images.unsplash.com/photo-1566232392379-b3af441fef9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      client: 'LogiTech Transportes',
      testimonial: 'O novo sistema transformou nossa operação. Conseguimos visualizar toda a cadeia logística em tempo real.'
    },
    {
      title: 'Clínica Médica',
      challenge: 'Problemas de infraestrutura',
      solution: 'Modernização completa do parque tecnológico',
      result: 'Zero downtime em 12 meses',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      client: 'Centro Médico Saúde Total',
      testimonial: 'Desde a implementação da nova infraestrutura, não tivemos mais problemas com sistemas fora do ar.'
    },
    {
      title: 'Startup de Tecnologia',
      challenge: 'Escalabilidade e segurança de dados',
      solution: 'Migração para arquitetura em nuvem',
      result: 'Capacidade de crescimento 10x maior',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      client: 'TechNova',
      testimonial: 'A migração para a nuvem nos permitiu escalar rapidamente sem preocupações com infraestrutura.'
    },
    {
      title: 'Rede de Varejo',
      challenge: 'Integração entre lojas físicas e online',
      solution: 'Sistema omnichannel personalizado',
      result: 'Aumento de 60% na retenção de clientes',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      client: 'MegaStore',
      testimonial: 'Agora nossos clientes têm uma experiência perfeita entre os canais online e offline.'
    }
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(3);
  const containerRef = useRef(null);

  // Determine how many cards to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setStartIndex((prevIndex) => 
      (prevIndex + 1) % (caseStudies.length - cardsToShow + 1)
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => 
      prevIndex === 0 ? caseStudies.length - cardsToShow : prevIndex - 1
    );
  };

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, cardsToShow]);

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const visibleCases = caseStudies.slice(startIndex, startIndex + cardsToShow);
  const showControls = caseStudies.length > cardsToShow;

  return (
    <CasesContainer id="cases">
      <CasesBackground />
      <CasesWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <CasesHeading>
            <HeadingAccent>Nossos</HeadingAccent>
            <h2>Cases de Sucesso</h2>
            <HeadingLine />
            <p>Resultados que transformaram o negócio de nossos clientes</p>
          </CasesHeading>
        </motion.div>

        <CarouselOuterContainer>
          <CarouselContainer 
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CardsWrapper 
              cardsToShow={cardsToShow}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {visibleCases.map((caseStudy, index) => (
                <motion.div
                  key={startIndex + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CaseCard>
                    <CaseImageContainer>
                      <CaseImage src={caseStudy.image} alt={caseStudy.title} />
                      <CaseOverlay />
                      <ClientBadge>{caseStudy.client}</ClientBadge>
                    </CaseImageContainer>
                    <CaseContent>
                      <CaseTitle>{caseStudy.title}</CaseTitle>
                      <CaseDetailGrid>
                        <CaseDetailItem>
                          <CaseDetailLabel>Desafio</CaseDetailLabel>
                          <CaseDetailText>{caseStudy.challenge}</CaseDetailText>
                        </CaseDetailItem>
                        <CaseDetailItem>
                          <CaseDetailLabel>Solução</CaseDetailLabel>
                          <CaseDetailText>{caseStudy.solution}</CaseDetailText>
                        </CaseDetailItem>
                        <CaseDetailItem>
                          <CaseDetailLabel>Resultado</CaseDetailLabel>
                          <CaseDetailText>{caseStudy.result}</CaseDetailText>
                        </CaseDetailItem>
                      </CaseDetailGrid>
                      <TestimonialContainer>
                        <QuoteIcon><FaQuoteRight /></QuoteIcon>
                        <TestimonialText>"{caseStudy.testimonial}"</TestimonialText>
                        <RatingContainer>
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </RatingContainer>
                      </TestimonialContainer>
                    </CaseContent>
                  </CaseCard>
                </motion.div>
              ))}
            </CardsWrapper>
          </CarouselContainer>

          {showControls && (
            <>
              <SlideButton 
                onClick={prevSlide} 
                position="left"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowLeft />
              </SlideButton>
              <SlideButton 
                onClick={nextSlide} 
                position="right"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowRight />
              </SlideButton>
            </>
          )}
        </CarouselOuterContainer>

        <Indicators>
          {caseStudies.length > cardsToShow && 
            [...Array(caseStudies.length - cardsToShow + 1)].map((_, index) => (
              <Indicator 
                key={index} 
                active={index === startIndex}
                onClick={() => setStartIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
        </Indicators>
      </CasesWrapper>
    </CasesContainer>
  );
};

const CasesContainer = styled.section`
  color: var(--text);
  background: var(--primary);
  padding: 120px 0;
  position: relative;
  overflow: hidden;
`;

const CasesBackground = styled.div`
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

const CasesWrapper = styled.div`
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

const CasesHeading = styled.div`
  margin-bottom: 64px;
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

const CarouselOuterContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 20px 0;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const CardsWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(${props => props.cardsToShow}, 1fr);
  gap: 30px;
  width: 100%;
`;

const CaseCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--secondary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }
`;

const CaseImageContainer = styled.div`
  position: relative;
  height: 200px;
  width: 100%;
`;

const CaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${CaseCard}:hover & {
    transform: scale(1.05);
  }
`;

const CaseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(10, 25, 47, 0.2),
    rgba(10, 25, 47, 0.8)
  );
`;

const ClientBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--accent);
  color: var(--primary);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const CaseContent = styled.div`
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CaseTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--accent);
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--accent);
  }
`;

const CaseDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 20px;
`;

const CaseDetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const CaseDetailLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 5px;
`;

const CaseDetailText = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
`;

const TestimonialContainer = styled.div`
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  position: relative;
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--secondary);
  color: var(--accent);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

const TestimonialText = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-style: italic;
  text-align: center;
  margin-bottom: 10px;
  line-height: 1.6;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  color: var(--accent);
  font-size: 0.8rem;
`;

const SlideButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => position}: -20px;
  background: var(--accent);
  color: var(--primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  
  @media screen and (max-width: 768px) {
    ${({ position }) => position}: 10px;
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
`;

const Indicator = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active }) => active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
`;

export default Cases;