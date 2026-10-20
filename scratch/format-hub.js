const fs = require('fs');

const templatesList = [
    { id: '01', name: 'Dica de Libras: Palavra ou Expressão', file: 'template-01-dica-libras', cat: 'Dica' },
    { id: '02', name: 'Mito ou Verdade sobre Acessibilidade', file: 'template-02-mito-verdade', cat: 'Mito' },
    { id: '03', name: 'Bastidores de Interpretação', file: 'template-03-bastidores', cat: 'Bastidores' },
    { id: '04', name: 'Apresentação de Serviços Corporativos', file: 'template-04-servicos', cat: 'Serviços' },
    { id: '05', name: 'Perguntas Frequentes (FAQ)', file: 'template-05-faq', cat: 'FAQ' },
    { id: '06', name: 'Erros Comuns de Acessibilidade', file: 'template-06-erros-comuns', cat: 'Compliance' },
    { id: '07', name: 'Educação Inclusiva & Academia', file: 'template-07-educacao-inclusiva', cat: 'Educação' },
    { id: '08', name: 'Treinamento Corporativo & RH', file: 'template-08-treinamento-corp', cat: 'RH' },
    { id: '09', name: 'Acessibilidade em Eventos & Lives', file: 'template-09-eventos', cat: 'Eventos' },
    { id: '10', name: 'Atendimento ao Cliente Surdo', file: 'template-10-atendimento-surdo', cat: 'CX' },
    { id: '11', name: 'Apresentação de Profissional', file: 'template-11-apresentacao-prof', cat: 'Autoridade' },
    { id: '12', name: 'Reflexão sobre Inclusão', file: 'template-12-reflexao-comunicacao', cat: 'Propósito' }
];

const cardsHtml = templatesList.map(t => `
                <div class="bg-[#0F172A] rounded-2xl border border-slate-800 p-4 space-y-3 hover:border-sky-500/40 transition-all flex flex-col justify-between">
                    <div>
                        <div class="relative bg-slate-950 p-2 rounded-xl border border-slate-800/80 mb-3 flex items-center justify-center">
                            <span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[9px] font-mono font-bold">${t.id} • ${t.cat}</span>
                            <img src="public/marketing/templates/posts/${t.file}-quadrado-1080x1080.svg" alt="${t.name}" class="w-full h-44 object-contain rounded">
                        </div>
                        <h4 class="text-xs font-bold text-white leading-snug">${t.name}</h4>
                    </div>
                    <div class="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
                        <a href="public/marketing/templates/posts/${t.file}-quadrado-1080x1080.svg" download class="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-center text-[10px] font-mono font-bold rounded-lg border border-slate-700">1:1 SVG</a>
                        <a href="public/marketing/templates/posts/${t.file}-vertical-1080x1350.svg" download class="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-center text-[10px] font-mono font-bold rounded-lg border border-slate-700">4:5 Feed</a>
                    </div>
                </div>`).join('\n');

let hub = fs.readFileSync('marketing-hub.html', 'utf8');
const searchSection = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- 12 Templates Cards -->
                <script>
                    const templatesList = [
                        { id: '01', name: 'Dica de Libras: Palavra ou Expressão', file: 'template-01-dica-libras', cat: 'Dica' },
                        { id: '02', name: 'Mito ou Verdade sobre Acessibilidade', file: 'template-02-mito-verdade', cat: 'Mito' },
                        { id: '03', name: 'Bastidores de Interpretação', file: 'template-03-bastidores', cat: 'Bastidores' },
                        { id: '04', name: 'Apresentação de Serviços Corporativos', file: 'template-04-servicos', cat: 'Serviços' },
                        { id: '05', name: 'Perguntas Frequentes (FAQ)', file: 'template-05-faq', cat: 'FAQ' },
                        { id: '06', name: 'Erros Comuns de Acessibilidade', file: 'template-06-erros-comuns', cat: 'Compliance' },
                        { id: '07', name: 'Educação Inclusiva & Academia', file: 'template-07-educacao-inclusiva', cat: 'Educação' },
                        { id: '08', name: 'Treinamento Corporativo & RH', file: 'template-08-treinamento-corp', cat: 'RH' },
                        { id: '09', name: 'Acessibilidade em Eventos & Lives', file: 'template-09-eventos', cat: 'Eventos' },
                        { id: '10', name: 'Atendimento ao Cliente Surdo', file: 'template-10-atendimento-surdo', cat: 'CX' },
                        { id: '11', name: 'Apresentação de Profissional', file: 'template-11-apresentacao-prof', cat: 'Autoridade' },
                        { id: '12', name: 'Reflexão sobre Inclusão', file: 'template-12-reflexao-comunicacao', cat: 'Propósito' }
                    ];

                    document.write(templatesList.map(t => \`
                        <div class="bg-[#0F172A] rounded-2xl border border-slate-800 p-4 space-y-3 hover:border-sky-500/40 transition-all flex flex-col justify-between">
                            <div>
                                <div class="relative bg-slate-950 p-2 rounded-xl border border-slate-800/80 mb-3 flex items-center justify-center">
                                    <span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[9px] font-mono font-bold">\${t.id} • \${t.cat}</span>
                                    <img src="public/marketing/templates/posts/\${t.file}-quadrado-1080x1080.svg" alt="\${t.name}" class="w-full h-44 object-contain rounded">
                                </div>
                                <h4 class="text-xs font-bold text-white leading-snug">\${t.name}</h4>
                            </div>
                            <div class="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2">
                                <a href="public/marketing/templates/posts/\${t.file}-quadrado-1080x1080.svg" download class="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-center text-[10px] font-mono font-bold rounded-lg border border-slate-700">1:1 SVG</a>
                                <a href="public/marketing/templates/posts/\${t.file}-vertical-1080x1350.svg" download class="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-center text-[10px] font-mono font-bold rounded-lg border border-slate-700">4:5 Feed</a>
                            </div>
                        </div>
                    \`).join(''));
                </script>
            </div>`;

const replaceWith = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
${cardsHtml}
            </div>`;

if (hub.includes(searchSection)) {
  hub = hub.replace(searchSection, replaceWith);
  fs.writeFileSync('marketing-hub.html', hub, 'utf8');
  console.log('marketing-hub.html updated successfully with static template cards!');
} else {
  console.warn('Search block not found in marketing-hub.html');
}
