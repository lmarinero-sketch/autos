import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const dataByService = {
  'desarrollo-web': {
    title: 'Desarrollo Web Premium',
    description: 'Transformamos tu agencia en un ecosistema de ventas 24/7. Un catálogo interactivo, rápido y optimizado para SEO, diseñado exclusivamente para retener prospectos.',
    metrics: [
      { name: 'Velocidad de Carga', old: 45, new: 98, label: 'Performance (Score)' },
      { name: 'Retención de Usuarios', old: 20, new: 85, label: 'Promedio (%)' },
      { name: 'Leads Capturados', old: 5, new: 45, label: 'Conversion Rate (%)' }
    ],
    chartData: [
      { name: 'Mes 1', tráfico: 4000, ventas: 24 },
      { name: 'Mes 2', tráfico: 6000, ventas: 38 },
      { name: 'Mes 3', tráfico: 9800, ventas: 65 },
      { name: 'Mes 4', tráfico: 14000, ventas: 95 }
    ]
  },
  'redes-sociales': {
    title: 'Gestión de Redes Sociales',
    description: 'Construimos una comunidad fiel de amantes de los autos en tu ecosistema. Historias que atrapan, comunidad interactiva y branding que destaca por sobre cualquier competidor.',
    metrics: [
      { name: 'Alcance Orgánico', old: 10, new: 75, label: 'Miles de Impresiones' },
      { name: 'Interacción (Engagement)', old: 2, new: 18, label: 'Tasa %' },
      { name: 'Consultas por DM', old: 15, new: 110, label: 'Mensajes Mensuales' }
    ],
    chartData: [
      { name: 'Mes 1', alcance: 10000, engagement: 8 },
      { name: 'Mes 2', alcance: 25000, engagement: 15 },
      { name: 'Mes 3', alcance: 65000, engagement: 22 },
      { name: 'Mes 4', alcance: 120000, engagement: 30 }
    ]
  },
  'audiovisual': {
    title: 'Audiovisual Premium',
    description: 'Fotografía en 4K, Reels cinemáticos y Video Reviews profundos. Generamos la máxima confianza mostrando el vehículo como una verdadera joya, provocando el deseo inmediato.',
    metrics: [
      { name: 'Tiempo en Publicación', old: 30, new: 180, label: 'Segundos' },
      { name: 'Tasa de Visualización', old: 15, new: 65, label: '% Visto' },
      { name: 'Percepción de Calidad', old: 40, new: 95, label: 'Score Premium' }
    ],
    chartData: [
      { name: 'Mes 1', vistas: 2000, leads: 5 },
      { name: 'Mes 2', vistas: 8000, leads: 18 },
      { name: 'Mes 3', vistas: 22000, leads: 45 },
      { name: 'Mes 4', vistas: 55000, leads: 90 }
    ]
  },
  'ads': {
    title: 'Campañas de Meta Ads',
    description: 'Aprovechamos la IA de Meta para colocar tus mejores autos frente a personas que tienen la intención y capacidad de comprar HOY. Impacto masivo con hiper-segmentación.',
    metrics: [
      { name: 'Costo por Clic (CPC)', old: 1.5, new: 0.3, label: 'USD$' },
      { name: 'Costo por Lead (CPA)', old: 45, new: 12, label: 'USD$' },
      { name: 'Retorno (ROAS)', old: 2, new: 15, label: 'Multiplier (x)' }
    ],
    chartData: [
      { name: 'Mes 1', inversión: 500, retorno: 1500 },
      { name: 'Mes 2', inversión: 800, retorno: 3200 },
      { name: 'Mes 3', inversión: 1200, retorno: 6800 },
      { name: 'Mes 4', inversión: 1500, retorno: 12500 }
    ]
  }
};

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  
  const service = React.useMemo(() => {
    return dataByService[id as keyof typeof dataByService] || dataByService['desarrollo-web'];
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-hidden">
      <div className="glow-bg" />
      
      {/* Navbar Minimalista */}
      <nav className="fixed top-0 w-full z-50 surface-glass rounded-none border-t-0 border-x-0 !bg-black/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm hidden sm:inline">Volver</span>
          </Link>
          <div className="font-display font-black text-xl tracking-tighter flex items-center gap-1">
            <span className="text-white">Grow</span>
            <span className="text-primary">Labs</span>
          </div>
          <div className="w-[84px]"></div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full surface-glass text-primary text-xs font-mono mb-6 border-primary/20">
            DIVE DEEP EN LA ESTRATEGIA
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {service.description}
          </p>
        </motion.div>

        {/* METRICS COMPARISON */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {service.metrics.map((m, i) => (
            <motion.div 
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
              className="interactive-card p-8 border-white/5"
            >
              <h3 className="text-gray-400 text-sm font-mono mb-6 uppercase tracking-wider h-10">{m.name}</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-red-400">Antes</span>
                    <span className="text-gray-500">{m.old} {m.label}</span>
                  </div>
                  <div className="h-2 w-full bg-red-950/30 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(m.old / Math.max(m.old, m.new)) * 100}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-red-500/50" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-primary font-bold">Con Grow Labs</span>
                    <span className="text-primary">{m.new} {m.label}</span>
                  </div>
                  <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(m.new / Math.max(m.old, m.new)) * 100}%` }} transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }} className="h-full bg-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CHARTS */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="surface-glass p-8 lg:p-12 border-primary/20 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">Proyección de Impacto Histórico</h2>
              <p className="text-gray-400">Resultados acumulados de nuestros clientes a los 4 meses.</p>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0 font-mono text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_10px_rgba(0,163,255,0.8)]" /> Impacto y Tráfico</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm" /> Retorno y Ventas</div>
            </div>
          </div>

          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={service.chartData as any[]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00A3FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#4B5563" tick={{ fill: '#9CA3AF' }} />
                <YAxis stroke="#4B5563" tick={{ fill: '#9CA3AF' }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', borderColor: '#1E3A8A', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey={Object.keys(service.chartData[0])[1]} 
                  stroke="#00A3FF" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPrimary)" 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey={Object.keys(service.chartData[0])[2]} 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSecondary)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
            <Link to="/">
              <button className="btn-primary !px-10">Acelerar mi Agencia</button>
            </Link>
        </motion.div>
      </main>
    </div>
  );
}
