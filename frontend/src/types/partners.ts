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
    imageUrl: '/images/partners/Logo 4 mentes.png',
    link: 'https://exemplo.com/abc'
  },
  {
    id: 'partner2', 
    name: 'Delf_tech',
    description: 'Centro de excelência em educação profissional',
    imageUrl: '/images/partners/Logo camarufi.png',
    link: 'https://exemplo.com/xyz'
  },
  {
    id: 'partner3',
    name: 'Consultoria Financeira 123', 
    description: 'Especialistas em consultoria financeira e contábil',
    imageUrl: '/images/partners/Logo encom.png',
    link: 'https://exemplo.com/123'
  },
   {
    id: 'partner4',
    name: 'Consultoria Financeira 123', 
    description: 'Especialistas em consultoria financeira e contábil',
    imageUrl: '/images/partners/Logo fourstar.png',
    link: 'https://exemplo.com/123'
  },
   {
    id: 'partner5',
    name: 'Consultoria Financeira 123', 
    description: 'Especialistas em consultoria financeira e contábil',
    imageUrl: '/images/partners/Logo manubito.png',
    link: 'https://exemplo.com/123'
  },
   {
    id: 'partner6',
    name: 'Consultoria Financeira 123', 
    description: 'Especialistas em consultoria financeira e contábil',
    imageUrl: '/images/partners/Logo Rei Boque.png',
    link: 'https://exemplo.com/123'
  },
   {
    id: 'partner7',
    name: 'Consultoria Financeira 123', 
    description: 'Especialistas em consultoria financeira e contábil',
    imageUrl: '/images/partners/Logo vnti.png',
    link: 'https://exemplo.com/123'
  },
  
];
