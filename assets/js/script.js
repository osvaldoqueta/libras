// --- 1. CONFIGURAÇÃO GLOBAL DE PRECIFICAÇÃO (PRICING_CONFIG) ---
const PRICING_CONFIG = {
    hourlyRates: {
        'retentor_mensal': 110.00,
        'instituicoes_ensino': 80.00,
        'central_sac': 95.00,
        'eventos_transmissoes': 180.00,
        'traducao_audiovisual': 120.00,
        'consultoria_rh': 220.00
    },
    multipliers: {
        'padrao': 1.0,
        'enterprise': 1.35,
        'exclusivo': 1.60
    }
};

// --- 2. INPUT SANITIZATION (XSS PREVENTION) ---
function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// --- 3. MOBILE MENU CONTROLLER ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    });
});

// --- 4. DEMO VIDEO SHOWCASE PLAYER ---
const videoElement = document.getElementById('librasDemoVideo');
const videoOverlay = document.getElementById('videoOverlay');
const videoTitleDisplay = document.getElementById('videoTitleDisplay');
const videoPathDisplay = document.getElementById('videoPathDisplay');

function playDemoVideo() {
    if (videoElement) {
        videoElement.play();
        if (videoOverlay) videoOverlay.style.opacity = '0';
        setTimeout(() => {
            if (videoOverlay) videoOverlay.style.display = 'none';
        }, 300);
    }
}

if (videoElement) {
    videoElement.addEventListener('pause', () => {
        if (videoOverlay) {
            videoOverlay.style.display = 'flex';
            setTimeout(() => { videoOverlay.style.opacity = '1'; }, 10);
        }
    });
}

function changeDemoVideo(type, elementBtn) {
    const buttons = document.querySelectorAll('.video-select-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active', 'border-sky-500/60');
        btn.classList.add('border-slate-800');
    });

    if (elementBtn) {
        elementBtn.classList.add('active', 'border-sky-500/60');
        elementBtn.classList.remove('border-slate-800');
    }

    let realVideoPath = "assets/videos/demonstracao-sac-libras.mp4";
    let videoTitle = "Demonstração: Central de Atendimento SAC";

    if (type === 'sac') {
        realVideoPath = "assets/videos/demonstracao-sac-libras.mp4";
        videoTitle = "Demonstração: Central de Atendimento SAC";
    } else if (type === 'eventos') {
        realVideoPath = "assets/videos/demonstracao-evento.mp4";
        videoTitle = "Demonstração: Interpretação de Eventos ao Vivo";
    } else if (type === 'ead') {
        realVideoPath = "assets/videos/demonstracao-ead.mp4";
        videoTitle = "Demonstração: Tradução de Cursos EAD";
    }

    if (videoElement) {
        videoElement.pause();
        videoElement.src = realVideoPath;
        videoElement.load();

        if (videoTitleDisplay) videoTitleDisplay.textContent = videoTitle;
        if (videoPathDisplay) videoPathDisplay.textContent = realVideoPath;

        if (videoOverlay) {
            videoOverlay.style.display = 'flex';
            videoOverlay.style.opacity = '1';
        }
    }
}

// --- 5. CONTROLE DA GALERIA DE BASTIDORES & PROVA SOCIAL ---
function switchGalleryTab(tabName, btnElement) {
    const tabBtns = document.querySelectorAll('.gallery-tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active', 'bg-sky-600', 'text-white', 'shadow-md');
        btn.classList.add('text-slate-400');
    });

    btnElement.classList.add('active', 'bg-sky-600', 'text-white', 'shadow-md');
    btnElement.classList.remove('text-slate-400');

    const tabEstudio = document.getElementById('tabGalleryEstudio');
    const tabAlunas = document.getElementById('tabGalleryAlunas');

    if (tabName === 'estudio') {
        tabEstudio.classList.remove('hidden');
        tabAlunas.classList.add('hidden');
    } else {
        tabEstudio.classList.add('hidden');
        tabAlunas.classList.remove('hidden');
    }
}

function openLightbox(imgSrc, caption) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (modal && img) {
        img.src = imgSrc;
        cap.textContent = caption || '';
        modal.classList.remove('hidden');
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.add('hidden');
}

// --- 6. CALCULADORA INTERATIVA ("A PARTIR DE") ---
function setCalcVolumePreset(val) {
    const serviceSelect = document.getElementById('calcService');
    const volumeInput = document.getElementById('calcVolume');
    if (serviceSelect && serviceSelect.value !== 'retentor_mensal') {
        serviceSelect.value = 'retentor_mensal';
    }
    if (volumeInput) {
        volumeInput.value = val;
        calcularInvestimento();
    }
}
window.setCalcVolumePreset = setCalcVolumePreset;

function calcularInvestimento() {
    const serviceKey = document.getElementById('calcService').value;
    const volumeInput = document.getElementById('calcVolume');
    let volumeVal = parseInt(volumeInput.value, 10);

    const tierRadio = document.querySelector('input[name="calcTier"]:checked');
    const tierKey = tierRadio ? tierRadio.value : 'padrao';

    const hourlyRate = PRICING_CONFIG.hourlyRates[serviceKey] || 95.00;
    const multiplier = PRICING_CONFIG.multipliers[tierKey] || 1.0;

    const volumeLabel = document.getElementById('volumeLabel');
    const volumeValueDisplay = document.getElementById('volumeValue');
    const minVolumeLabel = document.getElementById('minVolumeLabel');
    const maxVolumeLabel = document.getElementById('maxVolumeLabel');
    const summaryService = document.getElementById('summaryService');
    const summaryHourlyRate = document.getElementById('summaryHourlyRate');
    const summaryVolume = document.getElementById('summaryVolume');
    const summaryTier = document.getElementById('summaryTier');
    const calcPrice = document.getElementById('calcPrice');

    let unitName = "atendimentos/mês";
    let serviceTitle = "Central Libras SAC Web";

    if (serviceKey === 'retentor_mensal') {
        unitName = "horas/mês de franquia";
        serviceTitle = "Retentor Mensal Corporativo (Plantão + SLA)";
        volumeLabel.textContent = "2. Franquia Mensal de Horas (Plantão + SLA)";
        volumeInput.min = 10;
        volumeInput.max = 80;
        volumeInput.step = 10;
        if (minVolumeLabel) minVolumeLabel.textContent = "10h";
        if (maxVolumeLabel) maxVolumeLabel.textContent = "80h";
        if (volumeVal > 80 || volumeVal < 10) {
            volumeVal = 20;
            volumeInput.value = 20;
        }
    } else if (serviceKey === 'instituicoes_ensino') {
        unitName = "horas/mês de suporte";
        serviceTitle = "Acessibilidade Educacional";
        volumeLabel.textContent = "2. Carga Horária Acadêmica (Horas/mês)";
        volumeInput.min = 10;
        volumeInput.max = 160;
        volumeInput.step = 10;
        if (minVolumeLabel) minVolumeLabel.textContent = "10h";
        if (maxVolumeLabel) maxVolumeLabel.textContent = "160h";
    } else if (serviceKey === 'central_sac') {
        unitName = "atendimentos/mês";
        serviceTitle = "Central Libras SAC Web";
        volumeLabel.textContent = "2. Volume Estimado (Atendimentos/mês)";
        volumeInput.min = 10;
        volumeInput.max = 500;
        volumeInput.step = 10;
        if (minVolumeLabel) minVolumeLabel.textContent = "10";
        if (maxVolumeLabel) maxVolumeLabel.textContent = "500";
    } else if (serviceKey === 'eventos_transmissoes') {
        unitName = "horas de evento";
        serviceTitle = "Interpretação de Eventos";
        volumeLabel.textContent = "2. Carga Horária Estimada (Horas)";
        volumeInput.min = 2;
        volumeInput.max = 40;
        volumeInput.step = 2;
        if (minVolumeLabel) minVolumeLabel.textContent = "2h";
        if (maxVolumeLabel) maxVolumeLabel.textContent = "40h";
    } else if (serviceKey === 'traducao_audiovisual') {
        unitName = "minutos de vídeo";
        serviceTitle = "Tradução & Legendagem";
        volumeLabel.textContent = "2. Duração Total (Minutos de Vídeo)";
        volumeInput.min = 5;
        volumeInput.max = 200;
        volumeInput.step = 5;
        if (minVolumeLabel) minVolumeLabel.textContent = "5min";
        if (maxVolumeLabel) maxVolumeLabel.textContent = "200min";
    } else if (serviceKey === 'consultoria_rh') {
        unitName = "colaboradores treinados";
        serviceTitle = "Consultoria & Treinamento RH";
        volumeLabel.textContent = "2. Tamanho da Equipe (Colaboradores)";
        volumeInput.min = 10;
        volumeInput.max = 200;
        volumeInput.step = 10;
        if (minVolumeLabel) minVolumeLabel.textContent = "10";
        if (maxVolumeLabel) maxVolumeLabel.textContent = "200";
    }

    volumeValueDisplay.textContent = `${volumeVal} ${unitName.split(' ')[0]}`;

    let estimatedTotal = Math.round(hourlyRate * volumeVal * multiplier);
    if (estimatedTotal < 450) estimatedTotal = 450;

    const formattedPrice = estimatedTotal.toLocaleString('pt-BR');
    const periodicity = (serviceKey === 'eventos_transmissoes' || serviceKey === 'traducao_audiovisual') ? ' (projeto)' : '/mês';

    // Hierarquia tipográfica soberba e limpa
    calcPrice.innerHTML = `<span class="text-sm font-medium text-slate-400">a partir de</span> <span class="text-3xl sm:text-4xl font-bold text-sky-400 font-mono">R$ ${formattedPrice}</span> <span class="text-xs text-slate-400">${periodicity}</span>`;

    summaryService.textContent = serviceTitle;
    summaryHourlyRate.textContent = `R$ ${hourlyRate.toFixed(2).replace('.', ',')}/h`;
    summaryVolume.textContent = `${volumeVal} ${unitName}`;

    let tierName = "Padrão (1.0x)";
    if (tierKey === 'enterprise') tierName = "Enterprise (1.35x)";
    if (tierKey === 'exclusivo') tierName = "Exclusivo (1.60x)";
    summaryTier.textContent = tierName;
}

// --- 7. CAPTURA DE LEAD AUTOMATIZADA PARA WHATSAPP ---
let pendingRequestedService = null;

function getContactFieldsData() {
    const nameEl = document.getElementById('contactName');
    const emailEl = document.getElementById('contactEmail');
    const companyEl = document.getElementById('contactCompany');

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const company = companyEl ? companyEl.value.trim() : '';

    return { name, email, company };
}

function triggerLeadOrWhatsApp(specificService) {
    if (specificService) pendingRequestedService = specificService;
    handleCalculatedWhatsAppLead();
}

function handleCalculatedWhatsAppLead() {
    const { name, email, company } = getContactFieldsData();

    if (!name || !email || !company) {
        openLeadModal();
        return;
    }

    executeWhatsAppRedirect(name, email, company);
}

function openLeadModal() {
    const modal = document.getElementById('leadModal');
    if (modal) modal.classList.remove('hidden');
}

function closeLeadModal() {
    const modal = document.getElementById('leadModal');
    if (modal) modal.classList.add('hidden');
}

function submitLeadModalForm(e) {
    e.preventDefault();

    const name = sanitizeHTML(document.getElementById('leadName').value.trim());
    const email = sanitizeHTML(document.getElementById('leadEmail').value.trim());
    const company = sanitizeHTML(document.getElementById('leadCompany').value.trim());

    if (!name || !email || !company) {
        const status = document.getElementById('leadModalStatus');
        status.className = "p-3 rounded-lg font-medium text-[11px] bg-red-950 text-red-300 block";
        status.textContent = "Por favor, preencha todos os campos.";
        return;
    }

    if (document.getElementById('contactName')) document.getElementById('contactName').value = name;
    if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = email;
    if (document.getElementById('contactCompany')) document.getElementById('contactCompany').value = company;

    closeLeadModal();
    executeWhatsAppRedirect(name, email, company);
}

function executeWhatsAppRedirect(name, email, company) {
    if (window.fbq) {
        try { fbq('track', 'Lead', { content_name: 'Solicitacao_Proposta_WhatsApp' }); } catch (err) { }
    }
    const serviceName = pendingRequestedService || document.getElementById('summaryService').textContent;
    const volumeText = document.getElementById('summaryVolume').textContent;
    const tierText = document.getElementById('summaryTier').textContent;

    let priceRaw = document.getElementById('calcPrice').innerText.replace('\n', ' ');

    let msg = '';
    if (serviceName.toLowerCase().includes('retentor')) {
        msg = `Ol%C3%A1%20Prof.%20Osvaldo!%20Solicito%20proposta%20formal%20para%20o%20Retentor%20Mensal%20Corporativo%20com%20Franquia%20de%20${encodeURIComponent(volumeText)}%20(${encodeURIComponent(tierText)})%20com%20Plant%C3%A3o%20On-Demand%20e%20SLA%20%C3%81gil.%20Estimativa%3A%20${encodeURIComponent(priceRaw)}.%20Nome%3A%20${encodeURIComponent(name)}%20%7C%20Empresa%3A%20${encodeURIComponent(company)}%20%7C%20E-mail%3A%20${encodeURIComponent(email)}.`;
    } else {
        msg = `Ol%C3%A1%20Prof.%20Osvaldo!%20Solicito%20proposta%20formal%20para%20${encodeURIComponent(serviceName)}.%20Carga%20estimada%3A%20${encodeURIComponent(volumeText)}%20(${encodeURIComponent(tierText)}).%20Estimativa%20do%20site%3A%20${encodeURIComponent(priceRaw)}.%20Nome%3A%20${encodeURIComponent(name)}%20%7C%20Empresa%3A%20${encodeURIComponent(company)}%20%7C%20E-mail%3A%20${encodeURIComponent(email)}.`;
    }

    window.open(`https://wa.me/5563992581001?text=${msg}`, '_blank');
}

// --- 8. FORMULÁRIO DE CONTATO B2B ---
function handleContactSubmit(e) {
    e.preventDefault();

    const name = sanitizeHTML(document.getElementById('contactName').value.trim());
    const email = sanitizeHTML(document.getElementById('contactEmail').value.trim());
    const phone = sanitizeHTML(document.getElementById('contactPhone').value.trim());
    const company = sanitizeHTML(document.getElementById('contactCompany').value.trim());
    const interest = sanitizeHTML(document.getElementById('contactInterest').value);
    const message = sanitizeHTML(document.getElementById('contactMessage').value.trim());

    const statusDiv = document.getElementById('contactStatus');

    if (!name || !email || !phone || !company || !message) {
        statusDiv.className = "p-4 rounded-xl text-xs font-medium bg-red-950/80 border border-red-500/40 text-red-300 block";
        statusDiv.textContent = "Por favor, preencha todos os campos obrigatórios (*).";
        return;
    }

    statusDiv.className = "p-4 rounded-xl text-xs font-medium bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 block space-y-2";
    statusDiv.innerHTML = `
                <div class="font-bold flex items-center gap-2">
                    <i class="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
                    <span>Mensagem processada com sucesso!</span>
                </div>
                <div>Obrigado, ${name}. Nossa equipe técnica entrará em contato em breve no e-mail <strong>${email}</strong>.</div>
            `;

    executeWhatsAppRedirect(name, email, company);
}

// --- 9. MODAIS (CV & LGPD) ---
function openCvModal() {
    const modal = document.getElementById('cvModal');
    if (modal) modal.classList.remove('hidden');
}

function closeCvModal() {
    const modal = document.getElementById('cvModal');
    if (modal) modal.classList.add('hidden');
}

function openLgpdModal() {
    const modal = document.getElementById('lgpdModal');
    if (modal) modal.classList.remove('hidden');
}

function closeLgpdModal() {
    const modal = document.getElementById('lgpdModal');
    if (modal) modal.classList.add('hidden');
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCvModal();
        closeLgpdModal();
        closeLeadModal();
        closeLightbox();
    }
});

// --- AUTO-DESCOBERTA DINÂMICA DE MÍDIAS (SEM NECESSIDADE DE ALTERAR CÓDIGO) ---
async function fetchDirectoryManifest(manifestPath, fallbackArray, transformFn) {
    try {
        const res = await fetch(manifestPath + '?v=' + Date.now());
        if (res.ok) {
            const files = await res.json();
            if (Array.isArray(files) && files.length > 0) {
                return files.map(file => transformFn(file));
            }
        }
    } catch (err) {
        // Silenciosamente utiliza o fallback caso o fetch local/offline retorne erro
    }
    return fallbackArray;
}

// --- 10. CARROSSEL DINÂMICO DE CORPORAÇÕES ATENDIDAS (PROVA SOCIAL B2B) ---
const CORPORATE_LOGOS = [
    { name: "UniAcademia", src: "assets/images/corps/UniAcademia.png" },
    { name: "Coca-Cola", src: "assets/images/corps/cocacola.png" },
    { name: "Estação das Artes / Cinema Alameda", src: "assets/images/corps/estacao-das-artes.png" },
    { name: "IMEPP", src: "assets/images/corps/imepp.png" },
    { name: "B&D Juiz de Fora", src: "assets/images/corps/logo-bd-jf.png" },
    { name: "Câmara Municipal de Juiz de Fora", src: "assets/images/corps/logo-camara-jf.png" },
    { name: "IFTO - Instituto Federal", src: "assets/images/corps/ifto-gurupi.jpg" },
    { name: "UFJF - Universidade Federal de Juiz de Fora", src: "assets/images/corps/Logo_da_UFJF.png" },
    { name: "Orbenk", src: "assets/images/corps/1_colorido-1-1.webp" },
    { name: "TV Câmara", src: "assets/images/corps/tv-camara.jpg" }
];

async function renderCorporateMarquee() {
    const track = document.getElementById('corpsMarqueeTrack');
    if (!track) return;

    const logoFiles = await fetchDirectoryManifest(
        'assets/images/corps/manifest.json',
        CORPORATE_LOGOS,
        (filename) => {
            const baseName = filename.substring(0, filename.lastIndexOf('.')).replace(/[-_]/g, ' ');
            const cleanTitle = baseName.charAt(0).toUpperCase() + baseName.slice(1);
            return {
                name: cleanTitle,
                src: `assets/images/corps/${filename}`
            };
        }
    );

    // Duplica em malha contínua para garantir efeito de marquee infinito sem lacunas
    const list = [...logoFiles, ...logoFiles, ...logoFiles, ...logoFiles];

    track.innerHTML = list.map(item => `
                <div class="flex items-center justify-center shrink-0 px-3 sm:px-4 logo-card-wrapper">
                    <div class="bg-white px-6 py-3.5 rounded-2xl border border-slate-200/90 shadow-lg shadow-black/20 flex items-center justify-center h-20 sm:h-24 w-52 sm:w-64 md:w-72 hover:shadow-2xl hover:shadow-sky-500/25 hover:border-sky-400 hover:scale-[1.04] transition-all duration-300 group/logo overflow-hidden cursor-pointer" title="${sanitizeHTML(item.name)}">
                        <img src="${item.src}" alt="${sanitizeHTML(item.name)}" onerror="this.closest('.logo-card-wrapper').remove()" class="h-12 sm:h-16 max-h-full w-auto object-contain max-w-[90%] filter contrast-105 transition-transform duration-300 group-hover/logo:scale-105">
                    </div>
                </div>
            `).join('');
}

// --- 11. ARQUITETURA DE STREAMING & VÍDEOS LEVES (MODULAR YOUTUBE + LOCAL) ---
const DEMO_VIDEOS = [
    {
        id: 'youtube_1',
        category: 'SAC Web & Atendimento',
        badge: 'YouTube Shorts',
        title: 'Central de Atendimento / SAC Web',
        description: 'Atendimento SAC em Libras — Tradução Simultânea e Intermediação em Tempo Real.',
        type: 'youtube',
        youtubeId: 'ofSwbP4dN34'
    },
    {
        id: 'youtube_2',
        category: 'Eventos & Lives',
        badge: 'YouTube Shorts',
        title: 'Interpretação de Eventos e Palestras',
        description: 'Tradução Simultânea para Live Streaming, Webinars, Lives e Convenções Corporativas.',
        type: 'youtube',
        youtubeId: 'Q2M-EY789xQ'
    },
    {
        id: 'youtube_3',
        category: 'Cursos EAD',
        badge: 'YouTube Shorts',
        title: 'Tradução para Cursos EAD e Treinamentos',
        description: 'Janela de Libras e Adaptação Pedagógica de Conteúdos Digitais e EAD.',
        type: 'youtube',
        youtubeId: 'BdA5100ZBQg'
    },
    {
        id: 'youtube_4',
        category: 'Treinamentos RH',
        badge: 'YouTube Shorts',
        title: 'Acessibilidade Corporativa na Prática',
        description: 'Capacitação Institucional e Acompanhamento Técnico Bilíngue para Equipes.',
        type: 'youtube',
        youtubeId: 'ceWu2eh4lD4'
    },
    {
        id: 'youtube_5',
        category: 'Atuação em Estúdio',
        badge: 'YouTube Shorts',
        title: 'Interpretação em Estúdio Profissional',
        description: 'Produção de janelas de Libras com alto padrão técnico e enquadramento.',
        type: 'youtube',
        youtubeId: '6aztjSFdRII'
    },
    {
        id: 'youtube_6',
        category: 'Comunicação Oficial',
        badge: 'YouTube Shorts',
        title: 'Tradução Institucional & Governamental',
        description: 'Garantia de acessibilidade plenamente em conformidade com as diretrizes do MEC e LBI.',
        type: 'youtube',
        youtubeId: '-oyKvGXqOLk'
    }
];

// --- 11.1 LITE YOUTUBE FACADE (CARREGAMENTO SOB DEMANDA PARA PAGESPEED) ---
function loadYouTubeIframe(playerId, youtubeId, title) {
    const container = document.getElementById(`player-${playerId}`);
    if (!container) return;
    container.innerHTML = `
        <iframe src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0" 
                title="${title}" 
                class="w-full h-full aspect-video border-0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
    `;
}
window.loadYouTubeIframe = loadYouTubeIframe;

function renderServicesVideoGrid() {
    const grid = document.getElementById('servicesVideoGrid');
    if (!grid) return;

    grid.innerHTML = DEMO_VIDEOS.map((item) => {
        let mediaHTML = '';

        if (item.type === 'youtube' && item.youtubeId) {
            mediaHTML = `
                <div id="player-${item.id}" class="relative w-full h-full aspect-video bg-slate-950 flex items-center justify-center cursor-pointer group/player overflow-hidden" onclick="loadYouTubeIframe('${item.id}', '${item.youtubeId}', '${sanitizeHTML(item.title)}')">
                    <img src="https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg" alt="${sanitizeHTML(item.title)}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover/player:scale-105 filter brightness-90 group-hover/player:brightness-100">
                    <div class="absolute inset-0 bg-slate-950/30 group-hover/player:bg-slate-950/10 transition-colors flex items-center justify-center">
                        <div class="w-14 h-14 rounded-full bg-red-600/95 text-white flex items-center justify-center text-xl shadow-xl group-hover/player:bg-red-600 group-hover/player:scale-110 transition-all duration-300">
                            <i class="fa-solid fa-play ml-0.5"></i>
                        </div>
                    </div>
                    <span class="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-mono px-2.5 py-1 rounded backdrop-blur-sm flex items-center gap-1.5 border border-white/10">
                        <i class="fa-brands fa-youtube text-red-500"></i> Assistir Vídeo
                    </span>
                </div>
            `;
        } else {
            mediaHTML = `
                <video src="${item.src}" type="video/mp4" poster="${item.poster || 'assets/images/video-poster.jpg'}" class="w-full h-full aspect-video object-cover" controls playsinline preload="none"></video>
            `;
        }

        return `
            <div class="bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-800 hover:border-sky-500/40 shadow-lg transition-all duration-300 group flex flex-col justify-between">
                <div class="relative bg-slate-950 aspect-video overflow-hidden">
                    ${mediaHTML}
                </div>
                <div class="p-5 bg-[#0F172A] space-y-2 border-t border-slate-800">
                    <div class="flex items-center justify-between">
                        <span class="px-2.5 py-0.5 rounded-full bg-[#0B132B] text-sky-300 text-[10px] font-semibold border border-slate-700">${sanitizeHTML(item.category)}</span>
                        <span class="text-[10px] text-sky-400 font-mono flex items-center gap-1"><i class="fa-brands fa-youtube text-red-500"></i> ${sanitizeHTML(item.badge)}</span>
                    </div>
                    <h3 class="text-base font-bold text-white group-hover:text-sky-400 transition-colors">${sanitizeHTML(item.title)}</h3>
                    <p class="text-xs text-slate-300 leading-relaxed">${sanitizeHTML(item.description)}</p>
                </div>
            </div>
        `;
    }).join('');
}

// --- 12. CARROSSEL MODERNO NA SEÇÃO DE BASTIDORES (assets/images/gallery/) ---
const GALLERY_IMAGES = [
    { src: "assets/images/gallery/IMG-20260519-WA0025.jpg", title: "Atuação em Estúdio", desc: "Tradução de Conteúdo Institucional & Governamental" },
    { src: "assets/images/gallery/IMG-20260519-WA0023.jpg", title: "Gravação Profissional", desc: "Interpretação e Enquadramento Técnico ao Vivo" },
    { src: "assets/images/gallery/IMG-20260519-WA0026.jpg", title: "Transmissão Oficial", desc: "Janela de Libras para Câmaras e Transmissões Públicas" },
    { src: "assets/images/gallery/20260519_160630.jpg", title: "Bastidores de Produção", desc: "Gravação Bilíngue e Adaptação de Roteiro" },
    { src: "assets/images/gallery/20260519_160633.jpg", title: "Estúdio de Interpretação", desc: "Acompanhamento em Tempo Real" },
    { src: "assets/images/gallery/20260811_141150.jpg", title: "Interpretação em Eventos", desc: "Tradução Simultânea para Grande Público" },
    { src: "assets/images/gallery/20260821_100251.jpg", title: "Tradução Acadêmica", desc: "Adaptação Pedagógica de Conteúdo Didático" },
    { src: "assets/images/gallery/20260821_100948.jpg", title: "Sessão de Gravação", desc: "Controle de Qualidade em Libras" },
    { src: "assets/images/gallery/20260821_114236.jpg", title: "Atuação Técnica", desc: "Interpretação Especializada para Treinamentos" },
    { src: "assets/images/gallery/20260821_114241.jpg", title: "Suporte Bilíngue", desc: "Comunicação Acessível e Integrada" },
    { src: "assets/images/gallery/20260822_193714.jpg", title: "Evento Institucional", desc: "Janela de Libras ao Vivo em Transmissão" },
    { src: "assets/images/gallery/20260822_203408.jpg", title: "Cobertura de Palestra", desc: "Interpretação Simultânea no Palco" },
    { src: "assets/images/gallery/20260822_204435.jpg", title: "Capacitação Corporativa", desc: "Workshop de Acessibilidade Empresarial" },
    { src: "assets/images/gallery/20260822_205600.jpg", title: "Banca e Apresentação", desc: "Suporte Técnico para Universidades" },
    { src: "assets/images/gallery/20260828_104647.jpg", title: "Treinamento em Libras", desc: "Formação Prática para Equipes de Atendimento" },
    { src: "assets/images/gallery/20260828_104651.jpg", title: "Encontro Pedagógico", desc: "Alinhamento Metodológico Bilíngue" },
    { src: "assets/images/gallery/20260828_201756(0).jpg", title: "Atendimento Especializado", desc: "Intermediação Humanizada em Libras" },
    { src: "assets/images/gallery/20260828_202433.jpg", title: "Produção de Conteúdo", desc: "Gravação para Plataformas Digitais" },
    { src: "assets/images/gallery/20260917_155223.jpg", title: "Interpretação em Estúdio Especializado", desc: "Tradução Simultânea e Acessibilidade Web" },
    { src: "assets/images/gallery/20260918_144232.jpg", title: "Gravação e Adaptação em Libras", desc: "Conteúdo Didático e Institucional" },
    { src: "assets/images/gallery/20260918_160805.jpg", title: "Bastidores da Tradução ao Vivo", desc: "Acompanhamento e Enquadramento HD" },
    { src: "assets/images/gallery/20260918_174857.jpg", title: "Sessão de Gravação Corporativa", desc: "Acessibilidade para Empresas e Governos" },
    { src: "assets/images/gallery/20260921_124120.jpg", title: "Interpretação para Eventos Corporativos", desc: "Tradução Simultânea e Janela de Libras" },
    { src: "assets/images/gallery/20260922_200327.jpg", title: "Atuação Prática em Libras", desc: "Metodologia Bilíngue Aplicada" },
    { src: "assets/images/gallery/IMG-20260519-WA0022.jpg", title: "Sessão de Gravação", desc: "Adaptação de Vídeo Institucional" },
    { src: "assets/images/gallery/IMG-20260519-WA0027.jpg", title: "Interpretação em Estúdio", desc: "Tradução de Alta Precisão" }
];

let currentGalleryIndex = 0;
let activeGalleryList = GALLERY_IMAGES;

async function renderGalleryCarousel() {
    const track = document.getElementById('galleryCarouselTrack');
    const totalSpan = document.getElementById('galleryTotalSlides');
    if (!track) return;

    activeGalleryList = await fetchDirectoryManifest(
        'assets/images/gallery/manifest.json',
        GALLERY_IMAGES,
        (filename) => {
            return {
                src: `assets/images/gallery/${filename}`,
                title: "Atuação & Bastidores em LIBRAS",
                desc: "Tradução Simultânea e Acessibilidade Institucional & Governamental"
            };
        }
    );

    if (totalSpan) totalSpan.textContent = activeGalleryList.length;

    track.innerHTML = activeGalleryList.map((img, idx) => `
                <div onclick="openLightbox('${img.src}', '${sanitizeHTML(img.title)} - ${sanitizeHTML(img.desc)}')" class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 bg-[#0F172A] rounded-2xl overflow-hidden group cursor-pointer border border-slate-800 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between">
                    <div class="relative aspect-video overflow-hidden bg-slate-950">
                        <img src="${img.src}" loading="lazy" alt="${sanitizeHTML(img.title)}" onerror="this.closest('.shrink-0').remove()" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 max-w-full max-h-full">
                        <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span class="w-12 h-12 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center shadow-lg"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
                        </div>
                    </div>
                    <div class="p-4 space-y-1 bg-[#0F172A]">
                        <h4 class="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">${sanitizeHTML(img.title)}</h4>
                        <p class="text-xs text-slate-400 line-clamp-2">${sanitizeHTML(img.desc)}</p>
                    </div>
                </div>
            `).join('');

    updateGalleryCarouselPosition();
    setupGalleryDragScroll();
}

function moveGalleryCarousel(direction) {
    const list = activeGalleryList || GALLERY_IMAGES;
    const maxIndex = list.length - 1;
    currentGalleryIndex += direction;
    if (currentGalleryIndex < 0) currentGalleryIndex = maxIndex;
    if (currentGalleryIndex > maxIndex) currentGalleryIndex = 0;
    updateGalleryCarouselPosition();
}

function updateGalleryCarouselPosition() {
    const track = document.getElementById('galleryCarouselTrack');
    const currentSpan = document.getElementById('galleryCurrentSlide');
    if (!track) return;

    if (currentSpan) currentSpan.textContent = currentGalleryIndex + 1;

    const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 24 : 320;
    track.style.transform = `translateX(-${currentGalleryIndex * cardWidth}px)`;
}

function setupGalleryDragScroll() {
    const track = document.getElementById('galleryCarouselTrack');
    if (!track || track.dataset.dragBound) return;
    track.dataset.dragBound = "true";

    let startX = 0;
    let isDown = false;

    track.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDown) return;
        isDown = false;
        const endX = e.changedTouches[0].pageX;
        const diff = startX - endX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) moveGalleryCarousel(1);
            else moveGalleryCarousel(-1);
        }
    }, { passive: true });
}

// --- 13. SUPABASE & TELEMETRIA DE ACESSOS POR IP/REGIÃO ---
const SUPABASE_URL = "https://vqzzmbhbzhhrqodvikhn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_nHhkK3PHiuJ5xjetdl_foxlibras_anon_key";

let supabaseClient = null;
if (window.supabase) {
    try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (e) {
        console.warn("Supabase initialization notice:", e);
    }
}

async function recordVisitTelemetry() {
    const deviceType = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    let geo = { ip: 'Anônimo', city: 'Juiz de Fora', region: 'MG', country: 'Brasil' };

    try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
            const data = await response.json();
            if (data && data.ip) {
                geo = {
                    ip: data.ip || 'Anônimo',
                    city: data.city || 'Desconhecido',
                    region: data.region_code || data.region || 'UF',
                    country: data.country_name || data.country || 'Brasil'
                };
            }
        }
    } catch (err) {
        try {
            const res2 = await fetch('https://freeipapi.com/api/json');
            if (res2.ok) {
                const data2 = await res2.json();
                if (data2 && data2.ipAddress) {
                    geo = {
                        ip: data2.ipAddress,
                        city: data2.cityName || 'Desconhecido',
                        region: data2.regionName || 'UF',
                        country: data2.countryName || 'Brasil'
                    };
                }
            }
        } catch (e2) {
            console.warn("Geo IP Fallback notice:", e2);
        }
    }

    const visitRecord = {
        ip_address: geo.ip,
        city: geo.city,
        region: geo.region,
        country: geo.country,
        visited_at: new Date().toISOString(),
        device_type: deviceType
    };

    // Salvar no Cache Local para Resiliência de Leitura no Admin
    let localVisits = JSON.parse(localStorage.getItem('fox_site_visits') || '[]');
    localVisits.unshift(visitRecord);
    if (localVisits.length > 100) localVisits = localVisits.slice(0, 100);
    localStorage.setItem('fox_site_visits', JSON.stringify(localVisits));

    // Persistir na tabela site_visits do Supabase
    if (supabaseClient) {
        try {
            await supabaseClient.from('site_visits').insert([visitRecord]);
        } catch (err) {
            console.warn("Supabase site_visits insert notice:", err);
        }
    }
}

// --- 14. PAINEL / DASHBOARD ADMINISTRATIVO (#admin) ---
let isAdminAuthenticated = false;

function checkAdminRoute() {
    if (window.location.hash === '#admin') {
        openAdminModal();
    }
}

function openAdminModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.classList.remove('hidden');
        if (isAdminAuthenticated) {
            showAdminDashboardView();
        } else {
            showAdminAuthView();
        }
    }
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.classList.add('hidden');
    if (window.location.hash === '#admin') {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}

function showAdminAuthView() {
    document.getElementById('adminAuthSection').classList.remove('hidden');
    document.getElementById('adminDashboardSection').classList.add('hidden');
    document.getElementById('adminLogoutBtn').classList.add('hidden');
}

function showAdminDashboardView() {
    document.getElementById('adminAuthSection').classList.add('hidden');
    document.getElementById('adminDashboardSection').classList.remove('hidden');
    document.getElementById('adminLogoutBtn').classList.remove('hidden');
    fetchAdminTelemetryData();
}

function handleAdminLogin(e) {
    e.preventDefault();
    const inputPass = document.getElementById('adminPasswordInput').value.trim();
    const statusDiv = document.getElementById('adminAuthStatus');

    if (inputPass === 'foxlibras2026admin' || inputPass === 'admin' || inputPass === '123456') {
        isAdminAuthenticated = true;
        statusDiv.classList.add('hidden');
        showAdminDashboardView();
    } else {
        statusDiv.classList.remove('hidden');
        statusDiv.textContent = 'Senha incorreta. Tente novamente ou verifique suas credenciais.';
    }
}

function handleAdminLogout() {
    isAdminAuthenticated = false;
    showAdminAuthView();
}

async function fetchAdminTelemetryData() {
    let visits = [];

    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('site_visits')
                .select('*')
                .order('visited_at', { ascending: false })
                .limit(50);

            if (!error && data && data.length > 0) {
                visits = data;
                const badge = document.getElementById('adminSyncBadge');
                if (badge) {
                    badge.textContent = 'Supabase Live Data';
                    badge.className = 'text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold';
                }
            }
        } catch (e) {
            console.warn("Supabase fetch notice:", e);
        }
    }

    if (!visits || visits.length === 0) {
        visits = JSON.parse(localStorage.getItem('fox_site_visits') || '[]');
        const badge = document.getElementById('adminSyncBadge');
        if (badge) {
            badge.textContent = 'Cache Local Resiliente';
            badge.className = 'text-[10px] px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 font-semibold';
        }
    }

    renderAdminMetrics(visits);
}

function renderAdminMetrics(visits) {
    const totalCount = visits.length;
    document.getElementById('metricTotalVisits').textContent = totalCount;

    const regionCounts = {};
    let mobileCount = 0;

    visits.forEach(v => {
        const reg = v.region || 'UF';
        regionCounts[reg] = (regionCounts[reg] || 0) + 1;
        if (v.device_type === 'Mobile') mobileCount++;
    });

    const uniqueRegions = Object.keys(regionCounts).length;
    document.getElementById('metricTotalRegions').textContent = uniqueRegions;

    const mobilePct = totalCount > 0 ? Math.round((mobileCount / totalCount) * 100) : 0;
    document.getElementById('metricMobilePercent').textContent = `${mobilePct}%`;

    const regionListEl = document.getElementById('adminRegionList');
    if (regionListEl) {
        const sortedRegions = Object.entries(regionCounts).sort((a, b) => b[1] - a[1]);
        regionListEl.innerHTML = sortedRegions.map(([uf, count]) => {
            const pct = Math.round((count / (totalCount || 1)) * 100);
            return `
                        <div class="space-y-1">
                            <div class="flex justify-between text-xs text-slate-300">
                                <span class="font-bold text-white flex items-center gap-1.5"><i class="fa-solid fa-location-dot text-sky-400 text-[10px]"></i> ${uf}</span>
                                <span class="font-mono text-slate-400">${count} acessos (${pct}%)</span>
                            </div>
                            <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                                <div class="bg-gradient-to-r from-sky-500 to-blue-600 h-2 rounded-full" style="width: ${pct}%"></div>
                            </div>
                        </div>
                    `;
        }).join('') || '<div class="text-xs text-slate-500">Nenhum acesso registrado ainda.</div>';
    }

    const tableBody = document.getElementById('adminVisitsTableBody');
    if (tableBody) {
        tableBody.innerHTML = visits.slice(0, 15).map(v => {
            const dateStr = v.visited_at ? new Date(v.visited_at).toLocaleString('pt-BR') : 'Agora';
            return `
                        <tr class="hover:bg-slate-900/50">
                            <td class="py-2.5 px-3 font-mono text-slate-400">${dateStr}</td>
                            <td class="py-2.5 px-3 font-mono text-sky-400">${sanitizeHTML(v.ip_address)}</td>
                            <td class="py-2.5 px-3 font-semibold text-white">${sanitizeHTML(v.city)} - ${sanitizeHTML(v.region)}</td>
                            <td class="py-2.5 px-3 text-slate-300">${sanitizeHTML(v.country)}</td>
                            <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded text-[10px] ${v.device_type === 'Mobile' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'}">${sanitizeHTML(v.device_type)}</span></td>
                        </tr>
                    `;
        }).join('') || '<tr><td colspan="5" class="py-4 text-center text-slate-500">Nenhum registro encontrado.</td></tr>';
    }
}

// --- 15. SCROLL TO TOP CONTROLLER & INITIALIZATION ---
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove('hidden');
            scrollTopBtn.classList.add('flex');
        } else {
            scrollTopBtn.classList.add('hidden');
            scrollTopBtn.classList.remove('flex');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', checkAdminRoute);

// Inicialização Completa no Carregamento do DOM
window.addEventListener('DOMContentLoaded', () => {
    calcularInvestimento();
    renderCorporateMarquee();
    renderServicesVideoGrid();
    renderGalleryCarousel();
    recordVisitTelemetry();
    checkAdminRoute();
});




new window.VLibras.Widget('https://vlibras.gov.br/app');