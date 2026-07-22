# CONTEXT.md — FOX LIBRAS | Acessibilidade Corporativa B2B

> **Documentação Viva & Consciência Situacional para IA (Np1.md compliance)**
> Subdomínio de Destino: `https://libras.foxstorebr.com`
> Razão Social / Homologação: CNPJ 66.550.293/0001-99 | Fox Store BR / Fox Libras
> Especialista Principal: Prof. Mestre Osvaldo Queta

---

## 📌 Visão Geral do Projeto

O **FOX LIBRAS** é uma plataforma B2B de alta performance e governança em acessibilidade, especializada na intermediação de tradução, interpretação e central de atendimento em Língua Brasileira de Sinais (LIBRAS). O sistema foi concebido para atender empresas privadas, instituições de ensino e órgãos governamentais em conformidade estrita com a **Lei Brasileira de Inclusão (LBI nº 13.146/2015)** e o **Decreto nº 5.626/2005**.

---

## 🚀 Histórico de Sprints

### 📅 Sprint 1.8 — Preenchimento Full-Width & Elementos Flutuantes Sem Colisão (22/07/2026)
- **Ajuste de Imagens de Fundo Full-Width**:
  - Aplicação de `relative w-full bg-cover bg-center bg-no-repeat overflow-hidden` nas seções com imagens decorativas e marcas d'água (`#inicio`, `#servicos`, `#calculadora`).
  - Posicionamento refinado do ativo `assets/images/libras-maos.png` com `absolute right-0 bottom-0 pointer-events-none opacity-[0.05] max-w-[320px] overflow-hidden`, eliminando extrapolações e cortes indevidos nos cards de serviço.
- **Hierarquia Visual Sem Colisão dos Elementos Flutuantes**:
  - **WhatsApp CTA Button**: Fixado em `fixed bottom-6 right-6 z-50` com círculo verde radiante e indicador de presença.
  - **Botão Voltar ao Topo (Scroll To Top)**: Posicionado em `fixed bottom-24 right-6 z-40` (exatamente acima do WhatsApp), exibido dinamicamente via JS ao rolar > 300px.
  - **Widget VLibras**: Posicionamento forçado na lateral direita em `top: 45% !important`, `right: 0px !important`, `z-index: 30 !important`, afastando o avatar de acessibilidade de qualquer botão de ação ou cartão de conteúdo.

---

### 📅 Sprint 1.7 — Reestruturação do Header / Navbar Single-Line (22/07/2026)
- Navegação enxuta com termos de palavra única (`whitespace-nowrap`), botão CTA pílula moderna (`from-sky-500 to-blue-600`) e banner superior LBI compacto.

---

### 📅 Sprint 1.6 — Widget Oficial VLibras, Imagem Hero & Marca D'água (22/07/2026)
- Widget oficial do VLibras (`vlibras-plugin.js`), fundo real da Hero Section com overlay WCAG AAA e marca d'água `libras-maos.png`.

---

### 📅 Sprint 1.5 — Redesign Visual "Navy Enterprise" (22/07/2026)
- Reformulação do Design System B2B para Azul Marinho Profundo (`#080E1E`), Grafite Corporativo (`#0F172A`) e Cinza Slate (`#1E293B`) com respiro amplo (`py-24`).

---

### 📅 Sprint 1.4 — Galeria de Vídeos Práticos & Autoridade (22/07/2026)
- Seção *Demonstração Prática & Autoridade* (`#galeria-servicos`) com cards de vídeo HTML5 reais.

---

### 📅 Sprint 1.3 — Ajuste de Hierarquia Tipográfica na Calculadora (22/07/2026)
- Container `#calcPrice` com "a partir de" discreto (`text-sm text-slate-400`) e número destacado (`text-3xl sm:text-4xl text-sky-400 font-mono`).

---

### 📅 Sprint 1.2 — Posicionamento Corporativo, Captura de Lead & Galeria de Bastidores (22/07/2026)
- Redesign do Header (`#0B132B`), foto de perfil com `object-top`, remoção de menção a MEI, modal de captura de lead para WhatsApp e modal LGPD.

---

### 📅 Sprint 1.1 — Atualização de Mídias Reais & Precificação Parametrizada (22/07/2026)
- Mídias reais em `assets/` e declaração do objeto global `PRICING_CONFIG`.

---

### 📅 Sprint 1.0 — Lançamento da Landing Page SPA B2B (22/07/2026)
- Construção da SPA autônoma (`index.html`) em conformidade com o Np1.md.

---

## 🛠️ Estrutura Atualizada de Arquivos do Projeto

```
.libras/
├── index.html                                 # SPA Completa (Hero Full-Width, Floating Elements Z-Stacking, Widget VLibras, Pill CTA, Navy Design)
├── CONTEXT.md                                 # Documentação viva do projeto e histórico das Sprints 1.0 a 1.8
├── Np1.md                                     # Diretrizes globais de governança, arquitetura e Np1 compliance
└── assets/
    ├── images/
    │   ├── osvaldo-queta-perfil.jpg           # Fotografia de perfil do Prof. Osvaldo Queta
    │   ├── video-poster.jpg                   # Poster dos vídeos de demonstração
    │   ├── libras_pessoas_se_comunicam.jpg   # Imagem de fundo da Hero Section (Acessibilidade Real)
    │   ├── libras-maos.png                    # Ilustração gráfica / marca d'água das mãos em Libras
    │   ├── IMG-20260519-WA0023.jpg            # Bastidores de Gravação e Interpretação ao Vivo
    │   ├── IMG-20260519-WA0025.jpg            # Atuação em Estúdio - Tradução Institucional
    │   └── IMG-20260519-WA0026.jpg            # Transmissão Oficial e Janela de Libras
    ├── pdf/
    │   └── Curriculo-Osvaldo-Queta-LIBRAS.pdf # Currículo profissional e acadêmico em PDF
    └── videos/
        ├── demonstracao-sac-libras.mp4        # Vídeo da demonstração SAC On-Demand
        ├── demonstracao-evento.mp4            # Vídeo de demonstração de interpretação em eventos
        ├── demonstracao-ead.mp4               # Vídeo de tradução para cursos EAD
        ├── 20250905_083324.mp4                # Vídeo real de atendimento SAC
        ├── 20260519_160642.mp4                # Vídeo real de treinamentos corporativos
        └── 65cf1137395f4bbca99ea87541ea65a1.mp4 # Vídeo de prova social / prática de alunas
```
