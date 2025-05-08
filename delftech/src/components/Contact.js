import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaWhatsapp, FaCheck, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email inválido";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Mensagem é obrigatória";
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <ContactContainer id="contato">
      <ContactBackground />
      <ContactWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ContactHeading>
            <HeadingAccent>Contato</HeadingAccent>
            <h2>Vamos Conversar?</h2>
            <HeadingLine />
            <p>Pronto para transformar sua empresa com tecnologia? Entre em contato!</p>
          </ContactHeading>
        </motion.div>

        <ContactContent>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactInfoCard>
              <ContactInfoHeader>
                <h3>Informações de Contato</h3>
                <p>Estamos prontos para atender você</p>
              </ContactInfoHeader>
              
              <ContactInfoList>
                <ContactInfoItem
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <IconWrapper>
                    <FaEnvelope />
                  </IconWrapper>
                  <div>
                    <h3>Email</h3>
                    <p>contato@delftech.com</p>
                  </div>
                </ContactInfoItem>
                
                <ContactInfoItem
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <IconWrapper>
                    <FaPhone />
                  </IconWrapper>
                  <div>
                    <h3>Telefone</h3>
                    <p>(XX) XXXX-XXXX</p>
                  </div>
                </ContactInfoItem>
                
                <ContactInfoItem
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <IconWrapper>
                    <FaWhatsapp />
                  </IconWrapper>
                  <div>
                    <h3>WhatsApp</h3>
                    <p>(XX) XXXXX-XXXX</p>
                  </div>
                </ContactInfoItem>
                
                <ContactInfoItem
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <IconWrapper>
                    <FaMapMarkerAlt />
                  </IconWrapper>
                  <div>
                    <h3>Endereço</h3>
                    <p>Bairro do Maculusso, Luanda - Angola</p>
                  </div>
                </ContactInfoItem>
              </ContactInfoList>
              
              <SocialMediaContainer>
                <SocialMediaTitle>Siga-nos</SocialMediaTitle>
                <SocialMediaIcons>
                  <SocialMediaIcon 
                    href="https://linkedin.com" 
                    target="_blank"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaLinkedin />
                  </SocialMediaIcon>
                  <SocialMediaIcon 
                    href="https://facebook.com" 
                    target="_blank"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaFacebook />
                  </SocialMediaIcon>
                  <SocialMediaIcon 
                    href="https://instagram.com" 
                    target="_blank"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaInstagram />
                  </SocialMediaIcon>
                </SocialMediaIcons>
              </SocialMediaContainer>
              
              <ContactMap>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15766.016064046406!2d13.2308863!3d-8.8176697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc8d2c7d%3A0x850c1c5c5ecc5a92!2sMaculusso%2C%20Luanda%2C%20Angola!5e0!3m2!1spt-PT!2sao!4v1625097142546!5m2!1spt-PT!2sao" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Localização em Luanda"
                ></iframe>
              </ContactMap>
            </ContactInfoCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ContactFormCard>
              <ContactFormHeader>
                <h3>Envie uma Mensagem</h3>
                <p>Preencha o formulário abaixo</p>
              </ContactFormHeader>
              
              <ContactForm onSubmit={handleSubmit}>
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <SuccessMessage
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <SuccessIcon>
                        <FaCheck />
                      </SuccessIcon>
                      <SuccessContent>
                        <h4>Mensagem Enviada!</h4>
                        <p>Entraremos em contato em breve.</p>
                      </SuccessContent>
                    </SuccessMessage>
                  )}
                </AnimatePresence>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel isFocused={focusedField === 'name'}>Nome</FormLabel>
                    <FormInput
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      hasError={!!formErrors.name}
                      isFocused={focusedField === 'name'}
                    />
                    <AnimatePresence>
                      {formErrors.name && (
                        <ErrorMessage
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {formErrors.name}
                        </ErrorMessage>
                      )}
                    </AnimatePresence>
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel isFocused={focusedField === 'email'}>Email</FormLabel>
                    <FormInput
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      hasError={!!formErrors.email}
                      isFocused={focusedField === 'email'}
                    />
                    <AnimatePresence>
                      {formErrors.email && (
                        <ErrorMessage
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {formErrors.email}
                        </ErrorMessage>
                      )}
                    </AnimatePresence>
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel isFocused={focusedField === 'phone'}>Telefone</FormLabel>
                    <FormInput
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      isFocused={focusedField === 'phone'}
                    />
                  </FormGroup>
                </FormRow>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel isFocused={focusedField === 'message'}>Mensagem</FormLabel>
                    <FormTextarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      hasError={!!formErrors.message}
                      isFocused={focusedField === 'message'}
                    />
                    <AnimatePresence>
                      {formErrors.message && (
                        <ErrorMessage
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {formErrors.message}
                        </ErrorMessage>
                      )}
                    </AnimatePresence>
                  </FormGroup>
                </FormRow>
                
                <FormButtonContainer>
                  <FormButton 
                    type="submit" 
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  >
                    {isSubmitting ? (
                      <ButtonContent>
                        <LoadingSpinner />
                        <span>Enviando...</span>
                      </ButtonContent>
                    ) : (
                      <span>Enviar Mensagem</span>
                    )}
                  </FormButton>
                </FormButtonContainer>
              </ContactForm>
            </ContactFormCard>
          </motion.div>
        </ContactContent>
      </ContactWrapper>
    </ContactContainer>
  );
};

const ContactContainer = styled.section`
  color: var(--text);
  background: var(--primary);
  padding: 120px 0;
  position: relative;
  overflow: hidden;
`;

const ContactBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(100, 255, 218, 0.03) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(100, 255, 218, 0.03) 0%, transparent 20%);
  z-index: 1;
`;

const ContactWrapper = styled.div`
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

const ContactHeading = styled.div`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 100%;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfoCard = styled.div`
  background: var(--secondary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContactInfoHeader = styled.div`
  padding: 30px;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
  
  h3 {
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 10px;
  }
  
  p {
    color: var(--text-secondary);
  }
`;

const ContactInfoList = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ContactInfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  
  svg {
    font-size: 1.5rem;
    color: var(--accent);
  }
`;

const SocialMediaContainer = styled.div`
  padding: 0 30px 30px;
  margin-top: auto;
`;

const SocialMediaTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 15px;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialMediaIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent);
    color: var(--primary);
  }
`;

const ContactMap = styled.div`
  margin-top: 20px;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
`;

const ContactFormCard = styled.div`
  background: var(--secondary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  height: 100%;
`;

const ContactFormHeader = styled.div`
  padding: 30px;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
  
  h3 {
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 10px;
  }
  
  p {
    color: var(--text-secondary);
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  position: relative;
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid var(--accent);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const SuccessIcon = styled.div`
  width: 40px;
  height: 40px;
  background: var(--accent);
  color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 15px;
`;

const SuccessContent = styled.div`
  h4 {
    font-size: 1.2rem;
    color: var(--accent);
    margin-bottom: 5px;
  }
  
  p {
    color: var(--text-secondary);
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
`;

const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 1rem;
  color: ${({ isFocused }) => isFocused ? 'var(--accent)' : 'var(--text)'};
  transition: color 0.3s ease;
`;

const FormInput = styled.input`
  padding: 15px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${({ hasError, isFocused }) => 
    hasError ? '#ff6b6b' : 
    isFocused ? 'var(--accent)' : 
    'rgba(255, 255, 255, 0.1)'};
  color: var(--text);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  padding: 15px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${({ hasError, isFocused }) => 
    hasError ? '#ff6b6b' : 
    isFocused ? 'var(--accent)' : 
    'rgba(255, 255, 255, 0.1)'};
  color: var(--text);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1);
  }
`;

const ErrorMessage = styled(motion.p)`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const FormButtonContainer = styled.div`
  margin-top: 10px;
`;

const FormButton = styled(motion.button)`
  background: var(--accent);
  color: var(--primary);
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background: #7cffdf;
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(10, 25, 47, 0.3);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Contact;