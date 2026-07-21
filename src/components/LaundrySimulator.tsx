import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const tabelaPrecos = {
  lavagem: {
    normal: { preco: 'R$ 18,90', info: 'Ciclo de 60 min • Até 10kg • OMO', valor: 18.90 },
    terca: { preco: 'R$ 15,90', info: 'Promocional de Terça-feira (60 min)', valor: 15.90 },
    corujao: { preco: 'R$ 16,90', info: 'Madrugada (00h às 05h)', valor: 16.90 },
  },
  secagem: {
    normal: { preco: 'R$ 18,90', info: 'Ciclo de 45 min • Secagem rápida', valor: 18.90 },
    terca: { preco: 'R$ 15,90', info: 'Promocional de Terça-feira (45 min)', valor: 15.90 },
    corujao: { preco: 'R$ 16,90', info: 'Madrugada (00h às 05h)', valor: 16.90 },
  },
  combos: {
    combo10: { preco: 'R$ 169,00', info: '10 Ciclos (R$ 16,90/cada)', valor: 169.00, valorUnitario: 16.90 },
    diamante: { preco: 'R$ 289,00', info: '20 Ciclos • R$ 14,45 por ciclo!', valor: 289.00, valorUnitario: 14.45 }
  }
};

const LaundrySimulator = () => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    mode: '',
    time: 'normal',
    services: { lavar: false, secar: false },
    comboType: ''
  });
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Iniciando ciclo...');

  const startSimulation = () => {
    setStep(3);
    setProgress(0);
    setStatus('Dosando Produtos OMO Premium...');
  };

  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setStep(4);
            return 100;
          }
          if (p === 25) setStatus('Lavando peças profundamente...');
          if (p === 50) setStatus('Enxaguando com Mar de Cheiro...');
          if (p === 75) setStatus('Centrifugação & Secagem Termorregulada...');
          return p + 2;
        });
      }, 70);
      return () => clearInterval(interval);
    }
  }, [step]);

  const resetGame = () => {
    setStep(1);
    setConfig({ mode: '', time: 'normal', services: { lavar: false, secar: false }, comboType: '' });
  };

  return (
    <section className="py-16 bg-[#0f172a] flex justify-center">
      <div className="game-container bg-gradient-to-br from-[#020617] to-[#0f172a] text-white max-w-[600px] w-full mx-4 p-8 rounded-3xl border-2 border-[#0284c7] shadow-[0_0_30px_rgba(56,189,248,0.25)] text-center relative overflow-hidden">
        <h2 className="text-2xl font-black uppercase mb-6 text-white tracking-widest drop-shadow-[0_0_12px_#38bdf8]">🌊 Simulador Mar de Cheiro 🌊</h2>

        {step === 1 && (
          <div className="space-y-4">
            <p className="mb-4">Como você deseja simular sua lavagem ou secagem hoje?</p>
            <button className="game-btn border-2 border-[#38bdf8] text-white px-6 py-3 rounded-full uppercase font-bold transition hover:bg-[#38bdf8] hover:text-[#020617]" onClick={() => setConfig({...config, mode: 'avulso'}) || setStep(2)}>Uso Avulso (Por Ciclo)</button>
            <button className="game-btn border-2 border-[#22c55e] text-white px-6 py-3 rounded-full uppercase font-bold transition hover:bg-[#22c55e] hover:text-black" onClick={() => setConfig({...config, mode: 'combo'}) || setStep(2)}>Combos & Planos de Desconto</button>
          </div>
        )}

        {step === 2 && config.mode === 'avulso' && (
          <div className="space-y-4">
            <p>1. Selecione a opção ou horário:</p>
            {['normal', 'terca', 'corujao'].map(t => (
              <button key={t} className={`game-btn ${config.time === t ? 'bg-[#38bdf8] text-[#020617]' : 'border border-[#38bdf8]'}`} onClick={() => setConfig({...config, time: t})}>
                {t === 'normal' ? '☀️ Padrão' : t === 'terca' ? '🏷️ Terça-Feira' : '🌙 Corujão'}
              </button>
            ))}
            <p className="mt-4">2. Selecione os serviços:</p>
            <button className={`game-btn ${config.services.lavar ? 'bg-[#38bdf8] text-[#020617]' : 'border border-[#38bdf8]'}`} onClick={() => setConfig({...config, services: {...config.services, lavar: !config.services.lavar}})}>🫧 Lavagem</button>
            <button className={`game-btn ${config.services.secar ? 'bg-[#38bdf8] text-[#020617]' : 'border border-[#38bdf8]'}`} onClick={() => setConfig({...config, services: {...config.services, secar: !config.services.secar}})}>💨 Secagem</button>
            <div className="mt-6">
              <button className="game-btn border-2 border-[#22c55e] w-full" onClick={startSimulation}>Iniciar Simulação</button>
            </div>
          </div>
        )}

        {step === 2 && config.mode === 'combo' && (
          <div className="space-y-4">
            <p>Escolha o pacote com mais economia:</p>
            <button className="game-btn border-2 border-[#38bdf8] w-full" onClick={() => setConfig({...config, comboType: 'combo10'}) || startSimulation()}>📦 Combo 10 Ciclos (R$ 169,00)</button>
            <button className="game-btn border-2 border-[#22c55e] w-full" onClick={() => setConfig({...config, comboType: 'diamante'}) || startSimulation()}>💎 Plano Diamante (R$ 289,00)</button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center">
            <div className="washing-machine-box w-40 h-56 border-4 border-slate-700 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 relative my-4">
              <div className="machine-panel h-10 w-full bg-slate-950 rounded-t-2xl border-b-2 border-slate-700 flex items-center justify-around px-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-slate-500 font-bold">MAR DE CHEIRO</span>
              </div>
              <div className="w-28 h-28 rounded-full border-8 border-slate-600 absolute top-20 left-1/2 -translate-x-1/2 bg-slate-900 overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-blue-400 opacity-50 animate-spin" style={{borderRadius: '40%'}}></div>
              </div>
            </div>
            <p className="text-[#38bdf8] font-bold mt-4">{status}</p>
            <div className="w-4/5 h-3 bg-slate-800 rounded-full mt-4 overflow-hidden border border-slate-600">
              <div className="h-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8]" style={{width: `${progress}%`}}></div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3>📊 Resumo da Simulação</h3>
            <div className="result-card bg-white/5 border-2 border-dashed border-[#f59e0b] rounded-2xl p-6">
              <p className="text-xl font-black text-[#38bdf8]">{config.mode === 'avulso' ? `R$ ${( (config.services.lavar ? tabelaPrecos.lavagem[config.time as keyof typeof tabelaPrecos.lavagem].valor : 0) + (config.services.secar ? tabelaPrecos.secagem[config.time as keyof typeof tabelaPrecos.secagem].valor : 0)).toFixed(2).replace('.', ',')}` : tabelaPrecos.combos[config.comboType as keyof typeof tabelaPrecos.combos].preco}</p>
              <p className="text-xs text-green-400 font-bold mt-2">{config.mode === 'combo' ? tabelaPrecos.combos[config.comboType as keyof typeof tabelaPrecos.combos].info : 'Ciclo de lavanderia profissional.'}</p>
            </div>
            <button className="game-btn border-2 border-[#22c55e] w-full" onClick={() => window.open('https://wa.me/5521951118800', '_blank')}>💬 Agendar no WhatsApp</button>
            <button className="game-btn border-2 border-slate-600 w-full" onClick={resetGame}>Simular Novamente</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LaundrySimulator;
