export interface Partner {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  link?: string;
}

export const partners: Partner[] = [
  {
    id: 'partner1',
    name: 'Empresa Tecnológica ABC',
    description: 'Líder em soluções de software empresarial',
    imageUrl: '/images/partners/partner.jpeg',
    link: 'https://exemplo.com/abc'
  },
  {
    id: 'partner2', 
    name: 'Delf_tech',
    description: 'Centro de excelência em educação profissional',
    imageUrl: '/images/partners/hero-bg.jpg',
    link: 'https://exemplo.com/xyz'
  },
  {
    id: 'partner3',
    name: 'Consultoria Financeira 123', 
    description: 'Especialistas em consultoria financeira e contábil',
    imageUrl: '/images/partners/images.png',
    link: 'https://exemplo.com/123'
  },
  
];
