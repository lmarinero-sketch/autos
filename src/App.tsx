import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, LayoutTemplate, Share2, Video, Target, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Zap, XCircle, Camera, Play, Menu, X } from 'lucide-react';

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    agencia: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const messageContent = `🚀 *NUEVO LEAD - GROW LABS* 🚀\n\n*Nombre:* ${formData.nombre}\n*Agencia:* ${formData.agencia}\n*Email:* ${formData.email}\n*Teléfono:* ${formData.telefono}\n*Mensaje:* ${formData.mensaje}`;

    try {
      // 1. Enviar el webhook/API de builderbot (Notificación interna para ti)
      await fetch('https://app.builderbot.cloud/api/v2/c3fd918b-b736-40dc-a841-cbb73d3b2a8d/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-builderbot': 'bb-3c45fa69-2776-4275-82b6-2d6df9e08ec6'
        },
        body: JSON.stringify({
          messages: {
            content: messageContent,
            mediaUrl: "https://www.builderbot.app/assets/brand/logo-alone.png"
          },
          // Envía la notificación al número del administrador
          number: "5492645438114",
          checkIfExists: false
        })
      });

      setIsSuccess(true);
      setShowModal(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ nombre: '', agencia: '', email: '', telefono: '', mensaje: '' });
      }, 2000);

    } catch (error) {
      console.error(error);
      alert('Hubo un error al enviar tu solicitud. Inténtalo de nuevo.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans">
      <div className="glow-bg" />
      
      {/* Navbar Minimalista */}
      <nav className="fixed top-0 w-full z-50 surface-glass rounded-none border-t-0 border-x-0 !bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display font-black text-2xl tracking-tighter cursor-pointer flex items-center gap-1">
            <span className="text-white">Grow</span>
            <span className="text-primary">Labs</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#solucion" className="hover:text-white transition-colors">La Solución</a>
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#galeria" className="hover:text-white transition-colors">Galería</a>
            <a href="#planes" className="hover:text-white transition-colors">Planes</a>
          </div>
          <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary !px-6 !py-2 !text-sm hidden sm:flex">
            Contáctanos
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-black/95 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 gap-2">
                <a href="#solucion" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white font-medium py-3 text-lg border-b border-white/5">La Solución</a>
                <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white font-medium py-3 text-lg border-b border-white/5">Servicios</a>
                <a href="#galeria" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white font-medium py-3 text-lg border-b border-white/5">Galería</a>
                <a href="#planes" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white font-medium py-3 text-lg border-b border-white/5">Planes</a>
                <button onClick={() => { setIsMenuOpen(false); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary w-full mt-4 h-12">
                  Contáctanos
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          {/* Unsplash Showroom Placeholder con overlay oscuro */}
          <div className="absolute inset-0 bg-black/80 z-10" />
          <img 
            src="/DSC_0061.webp" 
            alt="Luxury Car Showroom" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full surface-glass text-primary text-xs font-mono mb-8 border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              SISTEMA DIGITAL PARA CONCESIONARIAS
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-black tracking-tight text-white mb-8 leading-[1.1]">
              Servicios Digitales <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">para Agencias de Autos.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Sistema integral web, contenido audiovisual y publicidad online diseñada exclusivamente para escalar tus ventas vehiculares.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary w-full sm:w-auto">
                Acelera tus Ventas <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="btn-secondary w-full sm:w-auto">
                Ver Video <Video className="ml-2 w-5 h-5" />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Servicios GRID */}
      <section id="servicios" className="py-24 px-6 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Armamento Digital Completo</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">No somos una agencia más, somos tu equipo interno de alto rendimiento digital.</p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeUp delay={0.1}>
              <div className="interactive-card p-8 h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <LayoutTemplate className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4">Desarrollo Web</h3>
                <p className="text-gray-400 leading-relaxed mb-6">Catálogo interactivo, fichas técnicas, captura de leads vía WhatsApp y CRM integrado.</p>
                <Link to="/servicio/desarrollo-web" className="font-mono flex items-center text-primary text-sm font-semibold hover:text-white transition-colors cursor-pointer mt-auto">
                  <ChevronRight className="w-4 h-4 mr-1"/> Ver detalles
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="interactive-card p-8 h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Share2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4">Redes Sociales</h3>
                <p className="text-gray-400 leading-relaxed mb-6">Manejo profesional, historias dinámicas e interacción activa para construir una comunidad leal.</p>
                <Link to="/servicio/redes-sociales" className="font-mono flex items-center text-primary text-sm font-semibold hover:text-white transition-colors cursor-pointer mt-auto">
                  <ChevronRight className="w-4 h-4 mr-1"/> Ver detalles
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="interactive-card p-8 h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Video className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4">Audiovisual Premium</h3>
                <p className="text-gray-400 leading-relaxed mb-6">Fotos de estudio, videos cinemáticos (Reels/TikTok) y Videos Review de alta retención.</p>
                <Link to="/servicio/audiovisual" className="font-mono flex items-center text-primary text-sm font-semibold hover:text-white transition-colors cursor-pointer mt-auto">
                  <ChevronRight className="w-4 h-4 mr-1"/> Ver detalles
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="interactive-card p-8 h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4">Publicidad (Ads)</h3>
                <p className="text-gray-400 leading-relaxed mb-6">Campañas de Meta Ads hiper-segmentadas para captar leads calificados y agendar visitas reales.</p>
                <Link to="/servicio/ads" className="font-mono flex items-center text-primary text-sm font-semibold hover:text-white transition-colors cursor-pointer mt-auto">
                  <ChevronRight className="w-4 h-4 mr-1"/> Ver detalles
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Video Review Signature Feature */}
      <section className="py-24 px-6 relative z-10 bg-black/80 border-y border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <FadeUp delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 group cursor-pointer shadow-[0_0_50px_rgba(0,163,255,0.1)]">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10" />
                <img src="/DSC_0061.webp" alt="Video Review Setup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,163,255,0.6)] group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 ml-1 fill-black" />
                  </div>
                </div>
                
                {/* Fake Timeline HUD */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-3">
                  <div className="text-white font-mono text-sm font-bold bg-black/50 px-2 py-1 rounded">01:24</div>
                  <div className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden">
                    <div className="h-full bg-primary w-1/3 shadow-[0_0_10px_rgba(0,163,255,0.8)]" />
                  </div>
                  <div className="text-white font-mono text-sm font-bold bg-black/50 px-2 py-1 rounded">04:15</div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20">
                  <Video className="w-4 h-4" />
                  NUESTRA OBRA MAESTRA
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                  La anatomía de un <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Video Review Premium</span>
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed font-light">
                  No es apretar el botón de grabar y listar repuestos. Tomamos la "joya" de tu inventario y construimos una <strong>superproducción audiovisual</strong> calculada para generar hiper-deseo de compra.
                </p>
                
                <ul className="space-y-5 mt-8">
                  <li className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="mt-1 bg-primary/10 text-primary p-2 rounded-lg shrink-0"><Camera className="w-5 h-5" /></div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">Sesión Fotográfica Exhaustiva</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">Capturamos minuciosamente cada detalle premium: llantas, acabados del tablero, costuras del cuero y líneas de diseño exterior con iluminación y óptica de cine.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="mt-1 bg-primary/10 text-primary p-2 rounded-lg shrink-0"><Target className="w-5 h-5" /></div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">Tomas Dinámicas de Acción</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">Secuencias en movimiento (dron/estabilizador) de la unidad transitando a máxima calidad, transmitiendo al cliente la adrenalina y el prestigio de estar de verdad frente al volante.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="mt-1 bg-primary/10 text-primary p-2 rounded-lg shrink-0"><MessageCircle className="w-5 h-5" /></div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">Guion = Sentencia de Venta</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">Explicamos al detalle cada característica tecnológica y de confort. Cada ángulo mostrado y cada palabra pronunciada están diseñados psicológicamente para erradicar objeciones y cerrar el trato.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </FadeUp>
            
          </div>
        </div>
      </section>

      {/* Galeria de Trabajo */}
      <section id="galeria" className="py-24 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Detrás de Escena</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">Un vistazo de cómo llevamos la presencia digital de las agencias al siguiente nivel.</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "/DSC_0284.webp", "/DSC_0486.webp", "/DSC_0588.webp",
                "/DSC_0659.webp", "/DSC_0743.webp", "/DSC_0821.webp",
                "/DSC_0992.webp", "/DSC_1027.webp", "/DSC_1218.webp"
              ].map((src, i) => (
                <div key={i} className="relative group overflow-hidden rounded-xl aspect-[4/3] surface-glass !p-1 border-white/5">
                  <img src={src} loading="lazy" className="w-full h-full object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110" alt={`Trabajo Audiovisual ${i + 1}`} />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay rounded-lg" />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Identificación (Pain vs Dream) - CRO Section */}
      <section className="py-24 px-6 relative z-10 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">¿Por qué algunas agencias venden más rápido?</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                El mercado automotriz cambió. Los compradores ya no pasean por las concesionarias; primero miran, comparan, confían y deciden <strong className="text-white">desde su celular</strong>.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* The Old Way */}
            <FadeUp delay={0.1}>
              <div className="surface-glass p-8 md:p-10 border-red-500/10 bg-gradient-to-br from-red-950/20 to-transparent h-full relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[60px] -z-10" />
                <h3 className="text-2xl font-display font-bold text-white mb-8 flex items-center">
                  <XCircle className="w-8 h-8 text-red-500 mr-4" />
                  La Agencia Tradicional
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start text-gray-400 text-lg leading-relaxed">
                    <span className="text-red-500 font-bold mr-4 mt-1">✕</span>
                    Sube fotos del inventario tomadas con el celular, mal iluminadas y poco atractivas.
                  </li>
                  <li className="flex items-start text-gray-400 text-lg leading-relaxed">
                    <span className="text-red-500 font-bold mr-4 mt-1">✕</span>
                    Gasta en anuncios, pero solo le llegan "curiosos" que preguntan el precio y desaparecen.
                  </li>
                  <li className="flex items-start text-gray-400 text-lg leading-relaxed">
                    <span className="text-red-500 font-bold mr-4 mt-1">✕</span>
                    Tarda horas en responder mensajes porque el equipo está ocupado en el local.
                  </li>
                  <li className="flex items-start text-gray-400 text-lg leading-relaxed">
                    <span className="text-red-500 font-bold mr-4 mt-1">✕</span>
                    Depende de los clientes que entran caminando y pelea constantemente por el precio final.
                  </li>
                </ul>
              </div>
            </FadeUp>

            {/* The Grow Labs Way */}
            <FadeUp delay={0.2}>
              <div className="surface-glass p-8 md:p-10 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent h-full relative group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[70px] -z-10 transition-all duration-500 group-hover:scale-110" />
                <h3 className="text-2xl font-display font-bold text-white mb-8 flex items-center">
                  <CheckCircle2 className="w-8 h-8 text-primary mr-4 drop-shadow-[0_0_10px_rgba(0,163,255,0.5)]" />
                  Con el Motor de Grow Labs
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start text-gray-300 text-lg leading-relaxed">
                    <CheckCircle2 className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                    <span><strong className="text-white">Audiovisual Premium:</strong> Contenido que resalta el lujo y diseño de cada vehículo, vendiendo por los ojos antes de que consulten.</span>
                  </li>
                  <li className="flex items-start text-gray-300 text-lg leading-relaxed">
                    <CheckCircle2 className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                    <span><strong className="text-white">Leads Hiper-calificados:</strong> Algoritmos de Meta Ads que impactan solo a usuarios con intención de compra real en tu zona.</span>
                  </li>
                  <li className="flex items-start text-gray-300 text-lg leading-relaxed">
                    <CheckCircle2 className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                    <span><strong className="text-white">Automatización 24/7:</strong> Respuestas instantáneas mediante IA. Clasifica al cliente y agenda sin intervención humana.</span>
                  </li>
                  <li className="flex items-start text-gray-300 text-lg leading-relaxed">
                    <CheckCircle2 className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
                    <span><strong className="text-white">Autoridad y Confianza:</strong> Transmiten prestigio digital total. El cliente ya está "vendido" cuando pisa la agencia.</span>
                  </li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-center text-white mb-16">Diseñado para líderes del mercado</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <img src="/DSC_0148.webp" className="w-full h-full object-cover" alt="Agencia" />
                  <Zap className="absolute bottom-4 right-4 text-primary z-20 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Agencias Independientes</h3>
                <p className="text-gray-400">Profesionaliza tu presencia digital y compite visualmente con los gigantes de la industria.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <img src="/DSC_0170.webp" className="w-full h-full object-cover" alt="Concesionaria" />
                  <ShieldCheck className="absolute bottom-4 right-4 text-primary z-20 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Concesionarias Oficiales</h3>
                <p className="text-gray-400">Genera contenido exclusivo local manteniendo las estrictas directrices premium de tu marca.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <img src="/DSC_0175.webp" className="w-full h-full object-cover" alt="Usados" />
                  <Target className="absolute bottom-4 right-4 text-primary z-20 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Especialistas en Usados</h3>
                <p className="text-gray-400">Demuestra transparencia y calidad con fotos de alta resolución e inspecciones en video 4K.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Estrategia de Crecimiento & Meta Ads */}
      <section className="py-24 px-6 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">El Motor de tu Crecimiento</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                No se trata solo de imágenes perfectas; combinamos contenido premium del inventario con distribución hiper-segmentada para vender los vehículos más rápido.
              </p>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* The Explanation / Meta Ads */}
            <FadeUp delay={0.1}>
              <div className="space-y-8">
                <div className="surface-glass p-8 lg:p-10 border-primary/20 relative">
                  <div className="absolute -top-6 -right-6 lg:-right-4 bg-primary text-black font-bold p-4 rounded-full shadow-[0_0_20px_rgba(0,163,255,0.4)]">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">El Algoritmo de Meta Ads</h3>
                  <p className="text-gray-400 leading-relaxed text-lg mb-6">
                    Plataformas como <strong className="text-white font-medium">Facebook, Instagram y WhatsApp</strong> tienen identificados con precisión a los usuarios que tienen intenciones claras de cambiar su vehículo o comprar uno nuevo.
                  </p>
                  <p className="text-gray-400 leading-relaxed text-lg mb-6">
                    Aprovechamos estos datos y creamos campañas hiper-segmentadas que muestran <strong className="text-primary font-medium">fotos y videos profesionales</strong> de tu agencia exactamente a esas personas interesadas.
                  </p>
                  <p className="text-white leading-relaxed text-lg font-medium bg-white/5 p-4 rounded-lg border-l-2 border-primary">
                    Finalmente, derivamos ese tráfico calificado a tu página interactiva. Así incrementamos masivamente la interacción y le damos al cliente la posibilidad de ver todo acerca del vehículo que le interesa antes de enviarte un mensaje.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* The Graphics (Growth) */}
            <FadeUp delay={0.3}>
              <div className="surface-glass p-8 lg:p-10 border-white/5 relative overflow-hidden">
                <h3 className="text-2xl font-display font-bold text-white mb-10">El Impacto del Contenido Premium</h3>
                
                <div className="space-y-10">
                  {/* Metric 1 */}
                  <div>
                    <div className="flex justify-between text-sm font-mono mb-3">
                      <span className="text-gray-300">Visibilidad en Redes</span>
                      <span className="text-primary font-bold text-lg">+350%</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }} 
                        className="h-full bg-gradient-to-r from-primary/40 to-primary rounded-full" 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-3 font-mono uppercase tracking-wider">Frente a usar fotos caseras u obsoletas</p>
                  </div>

                  {/* Metric 2 */}
                  <div>
                    <div className="flex justify-between text-sm font-mono mb-3">
                      <span className="text-gray-300">Confianza del Comprador</span>
                      <span className="text-primary font-bold text-lg">Máxima</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} whileInView={{ width: '95%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }} 
                        className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full" 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-3 font-mono uppercase tracking-wider">Al exhibir videos 4K y reportajes profesionales</p>
                  </div>

                  {/* Metric 3 */}
                  <div>
                    <div className="flex justify-between text-sm font-mono mb-3">
                      <span className="text-gray-300">Aumento de Cierres Reales</span>
                      <span className="text-white font-bold text-lg">+200%</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} whileInView={{ width: '70%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.9, ease: 'easeOut' }} 
                        className="h-full bg-gradient-to-r from-blue-300 to-white rounded-full" 
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-3 font-mono uppercase tracking-wider">Gracias a la derivación calificada por Meta Ads</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Pricing Sections */}
      <section id="planes" className="py-24 px-6 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Planes de Inversión</h2>
              <p className="text-xl text-gray-400">Escala tu agencia a tu ritmo con nuestro modelo SaaS.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
              {/* Basico */}
              <div className="surface-glass p-8 h-full flex flex-col">
                <h3 className="text-2xl font-display font-bold text-white mb-2">Básico</h3>
                <p className="text-gray-400 text-sm mb-6">El punto de partida ideal.</p>
                <div className="text-4xl font-bold text-white mb-8 border-b border-white/10 pb-8 flex items-center justify-center gap-1">
                  $200 <span className="text-xl text-gray-400 font-normal mt-2">usd/mes</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-gray-300">Diseño Web Profesional</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-gray-300">Publicaciones Básicas</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-gray-300">Setup de Meta Ads</span></li>
                </ul>
                <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary w-full">Empezar</button>
              </div>

              {/* Profesional - Featured */}
              <div className="surface-glass p-8 h-full flex flex-col border-primary/40 relative shadow-[0_0_30px_rgba(0,163,255,0.1)] md:-mt-8 md:-mb-8 z-10">
                <div className="absolute inline-flex top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-primary text-black font-bold text-xs">
                  MÁS ELEGIDO
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Profesional</h3>
                <p className="text-gray-400 text-sm mb-6">Para agencias en crecimiento.</p>
                <div className="text-4xl font-bold text-primary mb-8 border-b border-white/10 pb-8 flex items-center justify-center gap-1">
                  $350 <span className="text-xl text-primary/70 font-normal mt-2">usd/mes</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-white font-medium">Web + CRM Integrado</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-gray-300">Manejo Avanzado Redes</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-gray-300">Contenido Regular + Reels</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-gray-300">Gestión de Meta Ads</span></li>
                </ul>
                <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary w-full">Seleccionar Plan</button>
              </div>

               {/* Full */}
               <div className="surface-glass p-8 h-full flex flex-col">
                <h3 className="text-2xl font-display font-bold text-white mb-2">Premium</h3>
                <p className="text-gray-400 text-sm mb-6">Dominio absoluto del mercado.</p>
                <div className="text-4xl font-bold text-white mb-8 border-b border-white/10 pb-8 flex items-center justify-center gap-1">
                  $500 <span className="text-xl text-gray-400 font-normal mt-2">usd/mes</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-gray-300">Web Avanzada + CRM</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-gray-300">Fotos/Video de Alta Gama</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-white font-medium pl-1 bg-primary/20 rounded px-1">Videos Review</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-gray-300">Ads Estratégicos</span></li>
                </ul>
                <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary w-full">Empezar</button>
              </div>
            </div>

            <FadeUp delay={0.4}>
              <div className="mt-12 max-w-3xl mx-auto text-center surface-glass p-6 bg-white/5 border-t border-white/5">
                <p className="text-gray-400 text-sm leading-relaxed">
                  <strong className="text-primary font-bold">Importante - Sobre la Inversión en Anuncios:</strong> Los valores indicados corresponden a la gestión de plataforma, producción audiovisual y honorarios estratégicos. <strong className="text-white font-medium">Ningún plan incluye presupuesto para invertir directamente en pauta (Meta Ads, etc)</strong>. Dicho presupuesto lo define el cliente en sus cuentas publicitarias; nosotros diseñamos la estrategia y sugerimos el monto mensual necesario en base a sus metas de venta.
                </p>
              </div>
            </FadeUp>
          </FadeUp>
        </div>
      </section>

      {/* CTA Cierre */}
      <section id="contacto" className="py-24 px-6 relative z-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
            src="/DSC_0186.webp" 
            alt="Business planning" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 surface-glass p-8 md:p-14 border-primary/20">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                ¿Listos para acelerar sus ventas?
              </h2>
              <p className="text-xl text-gray-400">El mercado digital automotriz no espera por nadie.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required
                  placeholder="Nombre completo" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans" 
                />
                <input 
                  type="text" 
                  value={formData.agencia}
                  onChange={(e) => setFormData({...formData, agencia: e.target.value})}
                  required
                  placeholder="Nombre de Agencia" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans" 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="Email corporativo" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans" 
                />
                <input 
                  type="tel" 
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  required
                  placeholder="Teléfono" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans" 
                />
              </div>
              <textarea 
                value={formData.mensaje}
                onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                required
                placeholder="Cuéntanos un poco sobre tu agencia..." 
                rows={4} 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans resize-none"
              ></textarea>
              <button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className="btn-primary w-full text-lg mt-4 h-14 flex items-center justify-center transition-all disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Enviando solicitud...
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-black" />
                    ¡Contactado con éxito!
                  </span>
                ) : (
                  "Contactar a un Asesor"
                )}
              </button>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="font-display font-black text-2xl tracking-tighter mb-4 md:mb-0">
            <span className="text-white">Grow</span><span className="text-primary">Labs</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500 font-mono">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Términos</a>
            <a href="#" className="hover:text-primary transition-colors">Contacto</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 text-center md:text-left text-xs text-gray-700 font-mono">
          &copy; {new Date().getFullYear()} Grow Labs. Todos los derechos reservados.
        </div>
      </footer>

      {/* Floating WhatsApp BTN */}
      <button 
        onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,163,255,0.3)] hover:scale-110 hover:shadow-[0_0_30px_rgba(0,163,255,0.5)] transition-all duration-300"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0A0A0A] border border-primary/30 p-8 md:p-12 rounded-2xl max-w-lg w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,163,255,0.15)]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2" />
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-4">¡Paso 1 Completado!</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Nos pondremos en contacto contigo a la brevedad. Has dado el primer gran paso para potenciar tus ventas y dominar el alcance digital de tu agencia con <span className="text-white font-medium">Grow Labs</span>.
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="btn-primary w-full h-14"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
