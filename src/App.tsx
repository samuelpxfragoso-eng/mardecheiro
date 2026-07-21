import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Menu, 
  X, 
  Instagram as InstagramIcon, 
  Facebook, 
  Phone, 
  MapPin, 
  Clock as ClockIcon, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown, 
  Star,
  MessageCircle,
  Play,
  CheckCircle2,
  PartyPopper,
  Droplets,
  Wind,
  Medal,
  Gem,
  HelpCircle,
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  Wifi
} from 'lucide-react';

const AutoScrollContainer = ({ children, speed = 1 }: { children: React.ReactNode, speed?: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let lastTime = 0;

    const scroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isInteracting) {
        el.scrollLeft += speed * (deltaTime / 16);
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // Mouse drag to scroll
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      setIsInteracting(true);
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      setIsInteracting(false);
    };

    const onMouseUp = () => {
      isDown = false;
      setIsInteracting(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, [isInteracting, speed]);

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      {children}
    </div>
  );
};
import { 
  NAV_ITEMS, 
  DIFFERENTIALS, 
  FABRIC_CARE_DATA, 
  TESTIMONIALS, 
  FAQ_ITEMS, 
  STRUCTURE_IMAGES,
  INSTAGRAM_IMAGES,
  WHATSAPP_LINK,
  GOOGLE_REVIEWS_LINK,
  INSTAGRAM_LINK
} from './constants';
import LaundrySimulator from './components/LaundrySimulator';

// --- Utility Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  href 
}: { 
  children?: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'success' | 'navy'; 
  className?: string;
  onClick?: () => void;
  href?: string;
}) => {
  const base = "px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 shadow-md",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50",
    ghost: "text-slate-600 hover:text-blue-500 hover:bg-blue-50",
    accent: "bg-yellow-500 text-slate-900 hover:bg-yellow-600 shadow-md",
    success: "bg-[#22c55e] text-white hover:bg-[#1eb054] shadow-md",
    navy: "bg-[#2d3a82] text-white hover:bg-[#232d66] shadow-md"
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component 
      href={href}
      onClick={onClick} 
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

const VideoPlayer = ({ src, className = "", overlayClassName = "", autoPlay = true, loop = true, playsInline = true }: { src: string, className?: string, overlayClassName?: string, autoPlay?: boolean, loop?: boolean, playsInline?: boolean }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        playsInline={playsInline}
        className={className}
      />
      <button
        onClick={toggleMute}
        className={`absolute bottom-4 right-4 z-30 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all shadow-lg ${overlayClassName}`}
        aria-label={isMuted ? "Ativar som" : "Desativar som"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </>
  );
};

// --- Section Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}`}>
      {/* Marquee Top Bar */}
      <div className="bg-blue-600 text-white text-sm py-2 overflow-hidden flex items-center">
        <div className="animate-infinite-scroll flex whitespace-nowrap items-center">
          {[...Array(2)].map((_, copyIdx) => (
            <div key={copyIdx} className="flex items-center gap-8 px-4">
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="flex items-center gap-2"><ClockIcon size={14} /> Atendimento 24h via Totem</span>
                  <span className="flex items-center gap-2"><MapPin size={14} /> Coleta e Entrega na Praia do Francês</span>
                  <span className="flex items-center gap-2"><Wind size={14} /> Lave e Seque em 1h</span>
                  <span className="flex items-center gap-2"><Wifi size={14} /> Wi-Fi Grátis</span>
                  <span className="flex items-center gap-2"><Droplets size={14} /> Ambiente Climatizado</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-logo-float animate-logo-glow bg-white shrink-0">
            <img 
              src="https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171336/WhatsApp_Image_2026-02-08_at_3.57.44_PM_ltkmqn.jpg" 
              alt="Logo Mar de Cheiro" 
              className="w-full h-full object-cover"
            />
            {/* Reflection glossy glass layer */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-full pointer-events-none" />
            
            {/* Brilho Shimmer Line Animation */}
            <div className="absolute inset-y-0 left-0 w-2.5 bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-logo-shine pointer-events-none" />
          </div>
          <span className="text-3xl font-brand text-blue-600 transition-colors group-hover:text-blue-500">Mar de Cheiro</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="font-medium text-slate-700 transition-colors hover:text-blue-600"
            >
              {item.label}
            </a>
          ))}
          <Button variant="primary" href={WHATSAPP_LINK} className="rounded-full">
            <MessageCircle size={18} /> Agendar
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 rounded-lg text-slate-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="text-lg font-medium text-slate-700 border-b border-slate-50 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button variant="primary" className="w-full rounded-full" href={WHATSAPP_LINK}>
            Fale Conosco
          </Button>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#f8fafc]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="max-w-xl z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-600 text-sm font-bold mb-6 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Referência em Cuidado Premium
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Lavanderia Premium – <span className="text-blue-600">Praticidade,</span> <span className="text-blue-600">Cuidado e</span> Qualidade Exclusiva
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Na Mar de Cheiro você tem cuidado premium para suas roupas com a praticidade que você merece. Lave, seque e sinta a diferença com produtos <span className="font-bold text-blue-600">profissionais</span> inclusos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" className="text-lg px-8 py-4 rounded-xl shadow-lg shadow-blue-500/30" href={WHATSAPP_LINK}>
                Agende Sua Coleta <ChevronRight size={20} />
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300" href="#structure">
                Conheça Nosso Espaço
              </Button>
            </div>
          </div>

          {/* Right Media Content */}
          <div className="relative z-20">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-square md:aspect-[4/3] lg:aspect-square bg-slate-100">
              <VideoPlayer
                src="https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171333/grok-video-6519da2c-cc0c-4315-89f6-1093d69f7cb9_l5jtby.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                overlayClassName="bottom-32 right-6"
              />
              
              {/* Gradient Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-brand text-xl shrink-0">
                  MC
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Mar de Cheiro</h3>
                  <p className="text-sm text-slate-600">Cuidado premium para suas roupas</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PremiumService = () => {
  return (
    <section id="premium" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Image Side */}
          <div className="relative group animate-levitate">
            <div className="absolute -inset-4 bg-blue-100 rounded-[40px] transform -rotate-3 transition-transform group-hover:rotate-0 duration-500 animate-flash-glow"></div>
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] reflection-effect">
              <img 
                src="https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171330/Captura_de_tela_2026-04-09_001013_ep79t9.png" 
                alt="Serviço de organização premium Mar de Cheiro" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#2d3a82] text-white p-6 rounded-2xl shadow-xl max-w-[200px] hidden md:block animate-bounce-custom">
              <Sparkles className="text-yellow-400 mb-2" size={24} />
              <p className="font-bold text-sm leading-tight">Organização impecável feita por especialistas.</p>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <h3 className="text-blue-500 font-brand text-2xl mb-4">Exclusividade Mar de Cheiro</h3>
            <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82] mb-8 leading-tight">
              Lave, Seque e Receba <span className="text-blue-500">Tudo Dobrado</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10">
              Cansado de ter que dobrar montanhas de roupas após a secagem? Na Mar de Cheiro, oferecemos o serviço <strong>Premium Assistido</strong>. Nossos colaboradores cuidam de cada peça com carinho, organizando tudo em cestos para que você só precise guardar no armário.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 p-1 rounded-full"><CheckCircle2 size={18} className="text-green-600" /></div>
                <div>
                  <h4 className="font-bold text-[#2d3a82]">Produtos OMO e Comfort</h4>
                  <p className="text-sm text-slate-500">Fragrância premium inclusa em cada ciclo.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 p-1 rounded-full"><CheckCircle2 size={18} className="text-green-600" /></div>
                <div>
                  <h4 className="font-bold text-[#2d3a82]">Pronto em 60 minutos</h4>
                  <p className="text-sm text-slate-500">Agilidade sem abrir mão da qualidade.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 p-1 rounded-full"><CheckCircle2 size={18} className="text-green-600" /></div>
                <div>
                  <h4 className="font-bold text-[#2d3a82]">Toque Humano</h4>
                  <p className="text-sm text-slate-500">Colaboradores treinados para cuidar das suas peças.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 p-1 rounded-full"><CheckCircle2 size={18} className="text-green-600" /></div>
                <div>
                  <h4 className="font-bold text-[#2d3a82]">Organização VIP</h4>
                  <p className="text-sm text-slate-500">Suas roupas separadas e dobradas com perfeição.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <Button variant="navy" className="rounded-xl px-12 py-5 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1" href={WHATSAPP_LINK}>
                Quero o Serviço Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Structure = () => {
  return (
    <section id="structure" className="py-20 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h3 className="text-blue-500 font-brand text-2xl mb-2">Conforto & Qualidade</h3>
        <h2 className="text-4xl md:text-5xl font-heading text-slate-800">Nossa Estrutura</h2>
      </div>
      <div className="relative mb-20">
        <AutoScrollContainer>
          {[...STRUCTURE_IMAGES, ...STRUCTURE_IMAGES].map((img, idx) => (
            <div key={idx} className="w-[320px] md:w-[420px] lg:w-[500px] shrink-0 aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-slate-100 mr-8">
              <img src={img} alt={`Estrutura ${idx}`} className="w-full h-full object-cover pointer-events-none" />
            </div>
          ))}
        </AutoScrollContainer>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-slate-100">
          <VideoPlayer
            src="https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171342/SnapInsta.to_AQOWmFlbfp7qMWRdssRlVHD39pOrk6ILVwNA-UnAPo-IROkhVUAjNki3UwTNPqTStuFT5z3WeKeasoVX6qxtUklz59JANb_xFSLffGI_w5e5w8.mp4"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

const WhatsAppNotice = () => {
  return (
    <section className="py-20 bg-[#e9eff5]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-[#25D366]">
              <MessageCircle size={38} fill="#25D366" className="text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82]">
              Notificamos no WhatsApp
            </h2>
          </div>
          <div className="bg-[#22c55e] text-white px-6 py-3 rounded-xl flex items-center gap-3 w-fit shadow-lg shadow-green-500/20">
            <CheckCircle2 size={28} className="text-white" />
            <span className="font-bold text-xl md:text-2xl">Quando suas roupas estão prontas!</span>
          </div>
          <div className="mt-4 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-lg">
            <div className="flex items-start gap-5">
              <div className="text-blue-400 mt-1">
                <PartyPopper size={40} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#2d3a82] mb-3">Mais liberdade para você</h4>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Aproveite seu tempo para fazer outras coisas enquanto cuidamos da sua roupa com todo carinho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Plans = () => {
  const plans = [
    {
      title: "Lavagem Avulsa",
      description: "Ciclo de 60 minutos para cesto de até 10kg. Limpeza profunda with produtos OMO.",
      price: "18",
      cents: "90",
      unit: "cesto",
      icon: <Droplets size={44} className="text-[#2d3a82]" />,
      buttonText: "Agendar Lavagem",
      variant: "success" as const,
      promo: "Terça: R$ 15,90 | Madrugada: R$ 16,90"
    },
    {
      title: "Secagem Avulsa",
      description: "Ciclo de 45 minutos. Suas roupas secas e prontas para usar.",
      price: "18",
      cents: "90",
      unit: "ciclo",
      icon: <Wind size={44} className="text-[#2d3a82]" />,
      buttonText: "Agendar Secagem",
      variant: "success" as const,
      promo: "Terça: R$ 15,90 | Madrugada: R$ 16,90"
    },
    {
      title: "Plano Ouro - 10 ciclos",
      description: "Ideal para Airbnb e Salões. Economia e praticidade para seu negócio.",
      price: "169",
      cents: "00",
      unit: "pacote",
      icon: <Medal size={44} className="text-[#2d3a82]" />,
      buttonText: "Saber Mais",
      variant: "navy" as const,
      popular: true
    },
    {
      title: "Plano Diamante - 20 ciclos",
      description: "Máximo custo-benefício para alto volume de lavagens.",
      price: "289",
      cents: "00",
      unit: "pacote",
      icon: <Gem size={44} className="text-[#2d3a82]" />,
      buttonText: "Saber Mais",
      variant: "navy" as const
    }
  ];

  return (
    <section id="plans" className="py-24 bg-[#e9eff5]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-brand text-[#2d3a82] mb-4">Nossos Planos</h2>
          <p className="text-slate-500 text-xl">Planos que cabem no seu bolso. Pague por lavagem ou assine e economize!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {plans.map((plan, idx) => (
            <div key={idx} className="relative bg-white rounded-[40px] p-10 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#70b9f1] text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 border-2 border-white shadow-md">
                  <Star size={14} className="fill-white" /> Mais popular
                </div>
              )}
              {plan.promo && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-[#2d3a82] px-3 py-1 rounded-lg text-xs font-bold shadow-sm animate-pulse">
                  {plan.promo}
                </div>
              )}
              
              <div className="mb-6">
                {plan.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-[#2d3a82] mb-4">{plan.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-[280px]">
                {plan.description}
              </p>

              <div className="flex items-start text-[#2d3a82] mb-10">
                <span className="text-lg font-bold mt-2 mr-1">R$</span>
                <span className="text-6xl font-bold leading-none">{plan.price}</span>
                <div className="flex flex-col items-start ml-1">
                  <span className="text-2xl font-bold border-b-2 border-[#2d3a82] leading-none mb-1">,{plan.cents}</span>
                  <span className="text-xs font-medium text-slate-400">/ {plan.unit}</span>
                </div>
              </div>

              <Button 
                variant={plan.variant} 
                className="w-full py-4 text-base"
                href={WHATSAPP_LINK}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScheduleCollection = () => {
  return (
    <section className="relative py-28 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171332/Captura_de_tela_2026-02-08_102428_rf64xc.png"
          className="w-full h-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-blue-600/40 backdrop-blur-[2px] animate-flash-glow pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex justify-center">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full text-left transition-all hover:shadow-3xl">
          <h2 className="text-4xl md:text-5xl font-brand text-[#2d3a82] mb-4">Agende sua Coleta</h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            Clique no botão abaixo para agendar sua coleta diretamente pelo WhatsApp.
          </p>
          <Button 
            variant="success" 
            className="w-full py-5 text-lg rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-green-200"
            href={WHATSAPP_LINK}
          >
            <MessageCircle size={26} className="fill-white" /> Agendar via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="bg-[#f8fafc]">
      <div className="py-24 px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82] mb-6">Uma História de Cuidado e Frescor</h2>
        <p className="text-slate-500 text-xl">Descubra os pilares que tornam a Mar de Cheiro única.</p>
      </div>

      <div className="py-24 px-4 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-brand text-[#2d3a82] mb-8">Nossa Essência</h3>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            Nascemos da paixão por tecidos finos e do desejo de oferecer um cuidado que vai além da simples limpeza. Cada peça é tratada como única, com a delicadeza que ela merece.
          </p>
        </div>
      </div>

      <div className="py-24 px-4 text-center bg-[#e9eff5]">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-brand text-[#2d3a82] mb-8">Compromisso com a Natureza</h3>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            Utilizamos produtos biodegradáveis e processos de baixo impacto ambiental. A água que usamos passa por um rigoroso processo de filtragem e é reutilizada, porque acreditamos que cuidar das suas roupas é também cuidar do nosso planeta.
          </p>
        </div>
      </div>

      <div className="py-24 px-4 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-brand text-[#2d3a82] mb-8">Tecnologia e Tradição</h3>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            Combinamos a sabedoria do cuidado artesanal com a mais alta tecnologia em lavanderia. Nossos equipamentos de ponta garantem uma limpeza profunda, enquanto o acabamento manual assegura um toque de perfeição.
          </p>
        </div>
      </div>
    </section>
  );
};

const Influencers = () => {
  const videoUrls = [
    "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171334/SnapInsta.to_AQMw0evuZYb8K26sTIjhVd9YCQtieS3s5u1tnOcI9fJN0g7t2noR-_zpyVj3ZfkXbBcB6pOjEEzYFio2gdxV-4xT_dmpkxx.mp4",
    "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171355/SnapInsta.to_AQOylbhWFc6pmiUnnznfHzlpc5JYyrCk2Tk2rR1w7qNHphU4zuTT2CYtYnsnm7oR_ktyetpOgA8A1unHnHvi4ecyMU8tprIdWevz5BE_ayr8kl.mp4",
    "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171334/SnapInsta.to_AQNP3AH3cjJaUGtu9KrV8VK1NV0OEQzjE7dqNXFEevk4qAKZnvDG0W5Xs0lSPOj2vbu0kSux6fnOoWjuRrAjxV75_cra5zz.mp4",
    "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171364/SnapInsta.to_AQPsgNWgoW9Li88_6u1qAKddAvCZiiwHIOOUoo6Q5QK-LhP-tGi92uraeolfVp0OBKEInXFbPUsjshjyUct2NYLX_fbtcxc.mp4",
    "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171333/SnapInsta.to_AQMd9Zh_O3uiVFtRTqOKwbYTSVmpHaba3xzCAXsbrrBhpZ0-MqxHYP_Di01IOHj-NZCxeiBOeMwxY4CmW8rZSISg5rKhAyIa3EabLnY_b9zca3.mp4"
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Marquee Faixa Rolante */}
      <div className="w-full bg-blue-600 text-white py-4 mb-16 transform -rotate-2 scale-105 shadow-xl">
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="animate-infinite-scroll flex gap-8 items-center text-xl md:text-2xl font-bold uppercase tracking-wider">
            <span>Lavanderia Mar de Cheiro a lavanderia mais top da Praia do Francês</span>
            <span className="text-yellow-400">✦</span>
            <span>Lavanderia Mar de Cheiro a lavanderia mais top da Praia do Francês</span>
            <span className="text-yellow-400">✦</span>
            <span>Lavanderia Mar de Cheiro a lavanderia mais top da Praia do Francês</span>
            <span className="text-yellow-400">✦</span>
            <span>Lavanderia Mar de Cheiro a lavanderia mais top da Praia do Francês</span>
            <span className="text-yellow-400">✦</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center mb-16">
        <h3 className="text-blue-500 font-brand text-2xl mb-2">Conheça Mais</h3>
        <h2 className="text-4xl md:text-6xl font-heading text-slate-800 tracking-tight">Vídeos da Lavanderia</h2>
      </div>
      <div className="relative">
        <AutoScrollContainer speed={1.5}>
          {[...videoUrls, ...videoUrls].map((url, idx) => (
            <div key={idx} className="relative w-[280px] md:w-[320px] shrink-0 aspect-[9/16] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-slate-100 mr-8">
              <VideoPlayer
                src={url}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </AutoScrollContainer>
      </div>
    </section>
  );
};

const FabricCare = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentData = FABRIC_CARE_DATA[activeTab];

  return (
    <section className="py-24 bg-[#e9eff5]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82] mb-4">Cuidado para cada Tecido</h2>
        <p className="text-slate-500 text-lg mb-16">Selecione o tipo de tecido para ver nossas recomendações de tratamento.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          {FABRIC_CARE_DATA.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`p-8 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 border-2 ${
                activeTab === idx 
                ? 'bg-[#f0f7ff] border-[#3b82f6] shadow-lg shadow-blue-100 scale-105' 
                : 'bg-white border-transparent hover:bg-slate-50 text-slate-400'
              }`}
            >
              <div className={`${activeTab === idx ? 'text-[#2d3a82]' : 'text-slate-400'}`}>
                {item.icon}
              </div>
              <span className={`font-medium ${activeTab === idx ? 'text-[#2d3a82]' : 'text-slate-500'}`}>
                {item.type}
              </span>
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto animate-fadeIn">
          <h3 className="text-2xl md:text-3xl font-bold text-[#2d3a82] mb-6">
            {currentData.title}
          </h3>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            {currentData.description}
          </p>
        </div>
      </div>
    </section>
  );
};

const Instagram = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82] mb-4">Siga nosso Instagram</h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Também nos acompanhe nas redes sociais para ficar por dentro de novas atualizações, promoções, eventos e muito mais, tudo para tornar a sua experiência cada vez melhor!
        </p>
        <Button 
          variant="navy" 
          className="rounded-xl px-10 py-4 mb-20 bg-[#2d3a82] hover:bg-[#1e2a63]"
          href={INSTAGRAM_LINK}
        >
          <InstagramIcon size={20} className="mr-2" /> Nos siga no Instagram
        </Button>
      </div>

      <div className="relative">
        <AutoScrollContainer speed={2}>
          {[...INSTAGRAM_IMAGES, ...INSTAGRAM_IMAGES].map((url, idx) => {
            const isVideo = url.includes('/video/upload/');
            return (
              <a 
                key={idx} 
                href={INSTAGRAM_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-[280px] shrink-0 aspect-[9/16] rounded-2xl overflow-hidden shadow-lg group mr-4"
              >
                {isVideo ? (
                  <video 
                    src={url}
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                  />
                ) : (
                  <img 
                    src={url} 
                    alt={`Instagram Post ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <InstagramIcon size={32} className="text-white" />
                </div>
              </a>
            );
          })}
        </AutoScrollContainer>
      </div>
    </section>
  );
};

const Differentials = () => {
  return (
    <section id="differentials" className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82] mb-4 tracking-tight">Desfrute dos nossos maiores diferenciais</h2>
        <p className="text-slate-500 text-xl">Conheça os benefícios que só a Mar de Cheiro oferece.</p>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
        {DIFFERENTIALS.map((item, idx) => (
          <div 
            key={idx} 
            className="p-10 rounded-[20px] bg-[#2d3a82] text-white flex flex-col items-center text-center shadow-2xl transition-transform hover:-translate-y-2 duration-300"
          >
            <div className="mb-6">
              {item.icon}
            </div>
            <h4 className="text-xl font-bold mb-4 leading-snug">{item.title}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(TESTIMONIALS.length / (window.innerWidth < 768 ? 1 : 3)));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.ceil(TESTIMONIALS.length / (window.innerWidth < 768 ? 1 : 3)) - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-[#e9eff5]">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82] mb-4">O que nossos clientes dizem</h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mb-10">
          Gostou do nosso atendimento? Deixe seu comentário de 5 estrelas, conte um pouco sobre a sua experiência e compartilhe uma foto das suas roupas dobradas, limpas e cheirosas!
        </p>
        <Button 
          variant="navy" 
          className="rounded-xl px-10 py-4 mb-20"
          href={GOOGLE_REVIEWS_LINK}
        >
          Deixe sua Avaliação
        </Button>
      </div>

      <div className="container mx-auto px-4 relative max-w-7xl">
        <button 
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-10 z-10 p-3 bg-white rounded-full shadow-lg text-slate-400 hover:text-blue-500 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-10 z-10 p-3 bg-white rounded-full shadow-lg text-slate-400 hover:text-blue-500 transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        <div className="overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-w-full px-4">
              {TESTIMONIALS.slice(0, 3).map((item) => (
                <div key={item.id} className="bg-white p-10 rounded-[20px] shadow-xl border border-slate-100 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex-grow border-l-2 border-blue-200 pl-6 mb-10">
                    <p className="text-slate-600 italic text-lg leading-relaxed">
                      "{item.comment}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-[#2d3a82] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.avatar}
                    </div>
                    <span className="font-bold text-[#2d3a82]">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
            {TESTIMONIALS.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-w-full px-4">
                {TESTIMONIALS.slice(3, 6).map((item) => (
                  <div key={item.id} className="bg-white p-10 rounded-[20px] shadow-xl border border-slate-100 flex flex-col h-full">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex-grow border-l-2 border-blue-200 pl-6 mb-10">
                      <p className="text-slate-600 italic text-lg leading-relaxed">
                        "{item.comment}"
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 bg-[#2d3a82] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {item.avatar}
                      </div>
                      <span className="font-bold text-[#2d3a82]">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-500 mb-4">
            <HelpCircle size={30} />
          </div>
          <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82] mb-4">Perguntas Frequentes</h2>
          <p className="text-slate-500 text-xl font-medium">Tire suas dúvidas sobre nossos serviços de lavanderia.</p>
        </div>
        <div className="divide-y divide-slate-100 border-t border-slate-100">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="overflow-hidden">
              <button 
                className="w-full py-6 flex items-center justify-between text-left group transition-all" 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === idx ? 'text-blue-500' : 'text-slate-800'}`}>
                  {item.question}
                </span>
                <ChevronDown className={`text-slate-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-blue-500' : ''}`} size={20} />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <p className="text-slate-500 text-lg leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-50">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-blue-500 font-brand text-2xl mb-2">Visite-nos</h3>
          <h2 className="text-4xl md:text-5xl font-heading text-slate-800 mb-8">Localização & Contato</h2>
          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-600"><MapPin size={24} /></div>
              <div><h4 className="font-bold text-slate-800">Endereço</h4><p className="text-slate-600">Av. Caravelas, 39 – Praia do Francês, Marechal Deodoro – AL</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-xl text-blue-600"><ClockIcon size={24} /></div>
              <div><h4 className="font-bold text-slate-800">Horário</h4><p className="text-slate-600">Segunda a Sábado: 07h às 22h (Atendimento 24h via Totem)</p></div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="primary" className="rounded-full" href={WHATSAPP_LINK}>WhatsApp</Button>
          </div>
        </div>
        <div className="h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.33418512215!2d-35.8458909!3d-9.7801833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7067d983448f415%3A0x86094727188293d2!2sAv.%20Caravelas%2C%2039%20-%20Praia%20do%20Franc%C3%AAs%2C%20Marechal%20Deodoro%20-%20AL%2C%2057160-000!5e0!3m2!1spt-BR!2sbr!4v1707000000000!5m2!1spt-BR!2sbr" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-start">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-6 group">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-400/40 shadow-[0_0_12px_rgba(59,130,246,0.6)] animate-logo-float animate-logo-glow bg-white shrink-0">
              <img 
                src="https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171336/WhatsApp_Image_2026-02-08_at_3.57.44_PM_ltkmqn.jpg" 
                alt="Logo Mar de Cheiro" 
                className="w-full h-full object-cover"
              />
              {/* Reflection gloss layer */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-full pointer-events-none" />
              
              {/* Brilho Shimmer Line */}
              <div className="absolute inset-y-0 left-0 w-2.5 bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-logo-shine pointer-events-none" />
            </div>
            <h2 className="text-4xl font-brand text-blue-400 transition-colors group-hover:text-blue-300">Mar de Cheiro</h2>
          </div>
          <p className="text-slate-400">Especialistas em lavanderia premium e self-service.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold">Navegação</h4>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}><a href={item.href} className="text-slate-400 hover:text-blue-400 transition-colors">{item.label}</a></li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold">Redes Sociais</h4>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-blue-500 transition-colors"><InstagramIcon size={20} /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-10 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Mar de Cheiro Lavanderia Ltda.</p>
      </div>
    </footer>
  );
};

const WhatsAppWidget = () => {
  return (
    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl animate-bounce-custom">
      <MessageCircle size={32} />
    </a>
  );
};

const GoogleReviewsSection = () => {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Video Side */}
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-8 border-white aspect-video bg-slate-100">
            <VideoPlayer
              src="https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171333/grok-video-6519da2c-cc0c-4315-89f6-1093d69f7cb9_1_ydqkjj.mp4"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Side */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-600 text-sm font-bold w-fit uppercase tracking-wider">
              Sua opinião importa
            </div>
            <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82]">Avalie Mar de Cheiro no Google</h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
              Sua avaliação é fundamental para continuarmos oferecendo o melhor serviço da Praia do Francês. Compartilhe sua experiência e ajude outros clientes a nos encontrar!
            </p>
            <Button 
              variant="navy" 
              className="rounded-xl px-12 py-5 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 w-fit" 
              href={GOOGLE_REVIEWS_LINK}
            >
              <Star size={20} className="fill-yellow-400 text-yellow-400" /> Avaliar Mar de Cheiro no Google
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="antialiased overflow-x-hidden">
      <Header />
      <Hero />
      <LaundrySimulator />
      <Structure />
      <PremiumService />
      <GoogleReviewsSection />
      <WhatsAppNotice />
      <Plans />
      <ScheduleCollection />
      <AboutUs />
      <Influencers />
      <FabricCare />
      <Differentials />
      <Instagram />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
