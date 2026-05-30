import React from 'react';
import { Shield, Clock, ThumbsUp, Sparkles, Droplets, Wind, Shirt } from 'lucide-react';

export const NAV_ITEMS = [
  { href: '#home', label: 'Início' },
  { href: '#structure', label: 'Estrutura' },
  { href: '#premium', label: 'Premium' },
  { href: '#plans', label: 'Planos' },
  { href: '#about', label: 'Sobre' },
  { href: '#faq', label: 'FAQ' },
];

export const DIFFERENTIALS = [
  {
    icon: <Shield size={32} />,
    title: 'Cuidado Especial',
    description: 'Tratamento adequado para cada tipo de tecido, garantindo maior durabilidade.',
  },
  {
    icon: <Clock size={32} />,
    title: 'Agilidade',
    description: 'Roupas limpas e secas em até 60 minutos com nossos equipamentos de ponta.',
  },
  {
    icon: <ThumbsUp size={32} />,
    title: 'Qualidade Garantida',
    description: 'Utilizamos apenas produtos profissionais de alta performance.',
  },
  {
    icon: <Sparkles size={32} />,
    title: 'Ambiente Limpo',
    description: 'Nossa loja é higienizada constantemente para seu conforto e segurança.',
  }
];

export const FABRIC_CARE_DATA = [
  {
    icon: <Shirt size={32} />,
    type: 'Algodão',
    title: 'Cuidado com Algodão',
    description: 'O algodão é resistente, mas pode encolher em altas temperaturas. Lavamos com água fria ou morna e secamos em temperatura média para preservar as fibras.',
  },
  {
    icon: <Wind size={32} />,
    type: 'Sintéticos',
    title: 'Cuidado com Sintéticos',
    description: 'Tecidos como poliéster e nylon secam rápido e amassam pouco. Utilizamos ciclos suaves e evitamos calor excessivo para não danificar o material.',
  },
  {
    icon: <Droplets size={32} />,
    type: 'Lã & Frios',
    title: 'Cuidado com Lã',
    description: 'A lã exige lavagem delicada. Usamos produtos específicos e secagem natural ou em temperatura muito baixa para evitar o encolhimento.',
  },
  {
    icon: <Sparkles size={32} />,
    type: 'Seda & Finos',
    title: 'Cuidado com Seda',
    description: 'Tecidos finos recebem tratamento VIP. Lavagem à mão ou em ciclo ultra delicado, com produtos neutros para manter o brilho e a maciez.',
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    comment: 'Melhor lavanderia da região! Roupas super cheirosas e atendimento impecável.',
    avatar: 'M',
    name: 'Maria Silva',
  },
  {
    id: 2,
    comment: 'Praticidade incrível. Deixo minhas roupas e busco tudo dobradinho. Recomendo muito!',
    avatar: 'J',
    name: 'João Pedro',
  },
  {
    id: 3,
    comment: 'O serviço premium salvou minha vida. Não preciso mais me preocupar em dobrar roupas.',
    avatar: 'A',
    name: 'Ana Costa',
  },
  {
    id: 4,
    comment: 'Ambiente super agradável e máquinas muito eficientes. Preço justo.',
    avatar: 'C',
    name: 'Carlos Eduardo',
  },
  {
    id: 5,
    comment: 'Atendimento nota 10! As meninas são super atenciosas e cuidadosas com as roupas.',
    avatar: 'F',
    name: 'Fernanda Lima',
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Como funciona o serviço self-service?',
    answer: 'Você mesmo pode operar as máquinas. Basta comprar o ciclo no totem de autoatendimento, colocar suas roupas e os produtos já são dosados automaticamente.',
  },
  {
    question: 'Quais produtos são utilizados?',
    answer: 'Utilizamos produtos profissionais da linha OMO e Comfort, garantindo limpeza profunda e um perfume duradouro.',
  },
  {
    question: 'Quanto tempo demora para lavar e secar?',
    answer: 'O ciclo de lavagem dura cerca de 35 minutos e o de secagem 45 minutos. Em pouco mais de 1 hora suas roupas estão prontas.',
  },
  {
    question: 'Vocês lavam edredons e cobertores?',
    answer: 'Sim! Nossas máquinas têm capacidade para lavar edredons de todos os tamanhos, incluindo King Size.',
  }
];

export const STRUCTURE_IMAGES = [
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/05_gj9x0h.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/03_gzxee2.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/02_y9vhxw.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/06_jc2lsl.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/01_uhhi5t.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171329/09_hgqdcj.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/04_cxgo7g.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171329/08_m38dea.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171329/11_d7lpoy.jpg',
];

export const INSTAGRAM_IMAGES = [
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171335/WhatsApp_Image_2026-02-08_at_2.27.47_PM_mpbpnb.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171331/Captura_de_tela_2026-02-08_102503_jxlbde.png',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171332/Captura_de_tela_2026-02-08_102428_rf64xc.png',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171332/Captura_de_tela_2026-02-08_102531_u4nddk.png',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171331/Captura_de_tela_2026-02-08_102552_i2opcq.png',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171330/Captura_de_tela_2026-02-08_102323_psdh93.png',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171329/11_d7lpoy.jpg',
];

export const WHATSAPP_LINK = 'https://wa.me/5521951118800';
export const GOOGLE_REVIEWS_LINK = 'https://g.page/r/CZm98FRTjnpKEBM/review';
export const INSTAGRAM_LINK = 'https://www.instagram.com/lavanderiamardecheiroofc?igsh=MTAzN3hrdzQyaXVncg==';
