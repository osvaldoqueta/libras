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

// --- 4. DEMO VIDEO SHOWCASE PLAYER (SEAMLESS YOUTUBE & LOCAL SUPPORT) ---
const videoElement = document.getElementById('librasDemoVideo');
const videoOverlay = document.getElementById('videoOverlay');
const videoTitleDisplay = document.getElementById('videoTitleDisplay');
const videoCategoryBadge = document.getElementById('videoCategoryBadge');

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

    const container = document.getElementById('videoContainer');
    if (!container) return;

    let youtubeId = 'ofSwbP4dN34';
    let videoTitle = "Demonstração: Central de Atendimento SAC";
    let categoryText = "SAC & Atendimento On-Demand";

    if (type === 'sac') {
        youtubeId = 'ofSwbP4dN34';
        videoTitle = "Demonstração: Central de Atendimento SAC";
        categoryText = "SAC & Atendimento On-Demand";
    } else if (type === 'eventos') {
        youtubeId = 'Q2M-EY789xQ';
        videoTitle = "Demonstração: Interpretação de Eventos ao Vivo";
        categoryText = "Eventos, Lives e Conferências";
    } else if (type === 'ead') {
        youtubeId = 'BdA5100ZBQg';
        videoTitle = "Demonstração: Tradução de Cursos EAD e Treinamentos";
        categoryText = "Educação & Materiais Digitais";
    } else if (type === 'metodologia') {
        // Local video
        container.innerHTML = `
            <video id="librasDemoVideo" controls autoplay playsinline class="w-full h-full aspect-video object-cover">
                <source src="assets/videos/65cf1137395f4bbca99ea87541ea65a1.mp4" type="video/mp4">
                Seu navegador não suporta reprodução de vídeo.
            </video>
        `;
        if (videoTitleDisplay) videoTitleDisplay.textContent = "Prática de Metodologia Bilíngue";
        if (videoCategoryBadge) videoCategoryBadge.textContent = "Ensino & Capacitação Prática";
        return;
    }

    // Embed YouTube Nocookie Player
    container.innerHTML = `
        <iframe src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0" 
                title="${videoTitle}" 
                class="w-full h-full aspect-video border-0 rounded-2xl" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
    `;

    if (videoTitleDisplay) videoTitleDisplay.textContent = videoTitle;
    if (videoCategoryBadge) videoCategoryBadge.textContent = categoryText;
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

function trackConversion(eventName, eventData = {}) {
    if (window.fbq) {
        try { fbq('trackCustom', eventName, eventData); } catch (e) {}
    }
    try {
        let events = JSON.parse(localStorage.getItem('fox_lead_events') || '[]');
        events.unshift({ event: eventName, data: eventData, at: new Date().toISOString() });
        if (events.length > 50) events = events.slice(0, 50);
        localStorage.setItem('fox_lead_events', JSON.stringify(events));
    } catch (e) {}
}
window.trackConversion = trackConversion;

function submitLeadModalForm(e) {
    e.preventDefault();

    // Honeypot anti-spam check
    const hp = document.getElementById('lead_hp');
    if (hp && hp.value.trim() !== '') {
        console.warn('Spam submission detected and blocked.');
        closeLeadModal();
        return;
    }

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

    trackConversion('LeadModalIdentified', { name, company, email });

    closeLeadModal();
    executeWhatsAppRedirect(name, email, company);
}

function executeWhatsAppRedirect(name, email, company) {
    if (window.fbq) {
        try { fbq('track', 'Lead', { content_name: 'Solicitacao_Proposta_WhatsApp' }); } catch (err) { }
    }
    trackConversion('WhatsAppClick', { service: pendingRequestedService || 'Calculadora' });

    const serviceName = pendingRequestedService || document.getElementById('summaryService').textContent;
    const volumeText = document.getElementById('summaryVolume').textContent;
    const tierText = document.getElementById('summaryTier').textContent;

    let priceRaw = document.getElementById('calcPrice').innerText.replace('\n', ' ');

    let msg = '';
    if (serviceName.toLowerCase().includes('retentor')) {
        msg = `Ol%C3%A1%20Prof.%20Osvaldo!%20Solicito%20proposta%20formal%20para%20o%20Retentor%20Mensal%20Corporativo%20com%20Franquia%20de%20${encodeURIComponent(volumeText)}%20(${encodeURIComponent(tierText)})%20com%20Plant%C3%A3o%20On-Demand%20e%20SLA%20%C3%81gil.%20Estimativa%3A%20${encodeURIComponent(priceRaw)}%20(sujeita%20%C3%A0%20valida%C3%A7%C3%A3o%20t%C3%A9cnica).%20Nome%3A%20${encodeURIComponent(name)}%20%7C%20Empresa%3A%20${encodeURIComponent(company)}%20%7C%20E-mail%3A%20${encodeURIComponent(email)}.`;
    } else {
        msg = `Ol%C3%A1%20Prof.%20Osvaldo!%20Solicito%20proposta%20formal%20para%20${encodeURIComponent(serviceName)}.%20Carga%20estimada%3A%20${encodeURIComponent(volumeText)}%20(${encodeURIComponent(tierText)}).%20Estimativa%20do%20site%3A%20${encodeURIComponent(priceRaw)}%20(sujeita%20%C3%A0%20valida%C3%A7%C3%A3o%20t%C3%A9cnica).%20Nome%3A%20${encodeURIComponent(name)}%20%7C%20Empresa%3A%20${encodeURIComponent(company)}%20%7C%20E-mail%3A%20${encodeURIComponent(email)}.`;
    }

    window.open(`https://wa.me/5563992581001?text=${msg}`, '_blank');
}

// --- 8. FORMULÁRIO DE CONTATO B2B ---
function handleContactSubmit(e) {
    e.preventDefault();

    // Honeypot anti-spam check
    const hp = document.getElementById('contact_hp');
    if (hp && hp.value.trim() !== '') {
        console.warn('Spam submission detected and blocked.');
        return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    }

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
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
        return;
    }

    trackConversion('ContactFormSubmitted', { name, company, email, interest });

    statusDiv.className = "p-4 rounded-xl text-xs font-medium bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 block space-y-2";
    statusDiv.innerHTML = `
                <div class="font-bold flex items-center gap-2">
                    <i class="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
                    <span>Mensagem processada com sucesso!</span>
                </div>
                <div>Obrigado, ${name}. Nossa equipe técnica entrará em contato em breve no e-mail <strong>${email}</strong>. Conectando agora ao WhatsApp corporativo...</div>
            `;

    setTimeout(() => {
        executeWhatsAppRedirect(name, email, company);
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    }, 1200);
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

// --- 16. COMPLIANCE & LBI DIAGNOSTIC SCANNER CONTROLLER ---
const LBI_DIAGNOSTIC_DATA = {
    sectors: {
        'saude': {
            name: 'Saúde, Hospitais & Clínicas',
            icon: 'fa-hospital',
            baseRisk: 92,
            lawRef: 'Lei nº 13.146/2015 (Art. 18) & Resolução CFM nº 2.217/2018 (Consentimento Livre e Esclarecido)',
            risks: [
                'Nulidade de termos de consentimento informado para procedimentos anestésicos e cirúrgicos.',
                'Erros na coleta de anamnese, dosagens farmacológicas e prescrições por ausência de comunicação bidirecional.',
                'Processos judiciais por danos morais e materiais por negativa de atendimento acessível comprovado.'
            ],
            solutionTitle: 'Central On-Demand Hospitalar 24/7',
            solutionDesc: 'Conexão via tablet da equipe médica com Intérpretes Mestres em menos de 45 segundos, com gravação de prontuário e ata assinada.',
            sla: '< 45 segundos',
            activation: '24 a 48 horas'
        },
        'banco': {
            name: 'Bancos, Fintechs & E-commerce',
            icon: 'fa-building-columns',
            baseRisk: 86,
            lawRef: 'Código de Defesa do Consumidor, Resolução BACEN nº 4.949/2021 & LBI Art. 67',
            risks: [
                'Ações do PROCON e do Ministério Público por falta de canal SAC efetivo para clientes surdos.',
                'Nulidade de contratos de crédito, seguros e renegociações por vício de consentimento.',
                'Perda direta de faturamento no e-commerce devido ao abandono de carrinho por falta de suporte em Libras.'
            ],
            solutionTitle: 'Widget SAC Web & App On-Demand',
            solutionDesc: 'Botão flutuante integrado ao seu site ou app sem atrito, fornecendo atendimento humano ao vivo com protocolo auditável para o BACEN.',
            sla: '< 60 segundos',
            activation: '24 a 72 horas'
        },
        'educacao': {
            name: 'Educação Superior, Faculdades & EAD',
            icon: 'fa-graduation-cap',
            baseRisk: 89,
            lawRef: 'Decreto Federal nº 5.626/2005 & Instrumentos de Avaliação Institucional do MEC',
            risks: [
                'Perda de pontuação e notas baixas nas comissões de recredenciamento do MEC.',
                'Mandados de segurança e ações civis públicas exigindo intérpretes em aulas e bancas acadêmicas.',
                'Evasão de alunos surdos por falta de repertório técnico especializado em disciplinas complexas.'
            ],
            solutionTitle: 'Retentor Mensal Universitário & EAD',
            solutionDesc: 'Equipe de intérpretes mestres com repertório científico avançado para aulas ao vivo, bancas e tradução de videoaulas com janela ABNT.',
            sla: 'Plantão Programado',
            activation: 'Imediata'
        },
        'eventos': {
            name: 'Eventos, Congressos & Lives',
            icon: 'fa-microphone',
            baseRisk: 78,
            lawRef: 'Norma ABNT NBR 15290 & Art. 42 da Lei Brasileira de Inclusão nº 13.146/2015',
            risks: [
                'Janela de Libras em desacordo com a NBR 15290 (tamanho inferior a 1/5 da tela ou sem contraste).',
                'Exaustão e perda de precisão por contratação de apenas 1 profissional sem o revezamento obrigatório de 20 min.',
                'Constrangimento e cancelamento de transmissão por queixas públicas da comunidade nas redes sociais.'
            ],
            solutionTitle: 'Equipe de Transmissão & Janela HD',
            solutionDesc: 'Duplas de intérpretes mestres em revezamento contínuo, estudo terminológico prévio das palestras e feed de vídeo em alta definição.',
            sla: 'SLA 100% no Ar',
            activation: '7 dias antes'
        },
        'publico': {
            name: 'Órgão Público, Judiciário & Câmaras',
            icon: 'fa-scale-balanced',
            baseRisk: 95,
            lawRef: 'Constituição Federal (Art. 5º), LBI nº 13.146/2015 & Resoluções do CNJ',
            risks: [
                'Nulidade de audiências judiciais e sessões legislativas por cerceamento de defesa de partes surdas.',
                'Notificações e relatórios de auditoria do Tribunal de Contas e Ministérios Públicos.',
                'Vício de publicidade em pronunciamentos oficiais e audiências públicas sem acessibilidade plena.'
            ],
            solutionTitle: 'Plantão Forense & Governamental',
            solutionDesc: 'Intérpretes de excelência com domínio de jargão jurídico, segredo de justiça e emissão de laudo técnico de fé pública.',
            sla: 'Plantão Dedicado',
            activation: 'Contrato Administrativo'
        }
    },
    solutions: {
        'nenhuma': {
            name: 'Nenhuma Solução em Libras',
            riskMult: 1.0,
            comprehension: 4,
            statusBadge: 'RISCO EXTREMO • NÃO CONFORMIDADE TOTAL',
            statusClass: 'bg-red-500/20 text-red-400 border-red-500/40',
            barColor: 'from-red-600 to-rose-600',
            textColor: 'text-red-400',
            description: 'Sua empresa está em situação de total vulnerabilidade jurídica e descumprimento expresso da Lei nº 13.146/2015. O cliente surdo é completamente excluído da jornada.'
        },
        'avatar': {
            name: 'Avatar 3D / Plugin Automatizado',
            riskMult: 0.88,
            comprehension: 18,
            statusBadge: 'RISCO CRÍTICO • ACESSIBILIDADE DE FACHADA',
            statusClass: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
            barColor: 'from-rose-600 to-amber-600',
            textColor: 'text-rose-400',
            description: 'Avatares realizam glosa palavra-por-palavra sem expressões faciais (parâmetro obrigatório da Libras). Mais de 82% da mensagem se perde, gerando riscos de notificação por acessibilidade ilusória.'
        },
        'legenda': {
            name: 'Legenda Automática de IA',
            riskMult: 0.72,
            comprehension: 32,
            statusBadge: 'ALTO RISCO • BARREIRA LINGUÍSTICA',
            statusClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
            barColor: 'from-amber-600 to-yellow-500',
            textColor: 'text-amber-400',
            description: 'Libras não é português. Para mais de 70% da comunidade surda brasileira, a Libras é a primeira língua (L1) e o português escrito é segunda língua (L2). Legendas não garantem equidade.'
        },
        'avulso': {
            name: 'Intérprete Avulso Sem Contrato',
            riskMult: 0.42,
            comprehension: 72,
            statusBadge: 'VULNERABILIDADE MODERADA • RISCO OPERACIONAL',
            statusClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
            barColor: 'from-yellow-500 to-emerald-500',
            textColor: 'text-yellow-400',
            description: 'Intérpretes avulsos têm boa intenção, mas faltam SLAs rígidos, equipe de substituição em caso de imprevistos e relatórios formais para auditorias de compliance e ESG.'
        },
        'fox': {
            name: 'Intérprete Mestre FOX LIBRAS',
            riskMult: 0.0,
            comprehension: 99.6,
            statusBadge: '100% LBI COMPLIANT • BLINDAGEM TOTAL',
            statusClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
            barColor: 'from-emerald-500 to-teal-400',
            textColor: 'text-emerald-400',
            description: 'Acessibilidade de alto nível validada por Mestres em Educação. Comunicação bidirecional humanizada, relatórios auditáveis e conformidade jurídica plena perante o Ministério Público.'
        }
    },
    channels: {
        'sac': 'SAC / Central de Atendimento Web',
        'eventos': 'Eventos e Congressos ao Vivo',
        'ead': 'Cursos EAD e Treinamentos Internos',
        'presencial': 'Atendimento Presencial e Recepção'
    },
    scenarios: {
        'hospital': {
            title: 'Caso 1: Consentimento Cirúrgico & Anamnese Médica',
            context: 'Paciente surdo com abdômen agudo dá entrada no pronto-socorro precisando de cirurgia de emergência e instruções de jejum e medicação.',
            avatarSummary: 'Traduz ao pé da letra "você está em jejum de 8 horas?" como "você comer relógio 8 nada vezes". Sem expressões faciais de gravidade. O paciente balança a cabeça concordando sem entender.',
            avatarCons: 'Risco gravíssimo de broncoaspiração, óbito anestésico e processo civil e criminal contra o hospital.',
            avatarComp: '14%',
            avatarRisk: 'Crítico (10/10)',
            avatarNps: '-82',
            foxSummary: 'Intérprete mestre conecta em menos de 45s via tablet hospitalar, utiliza riqueza de detalhes visuais e confirma o horário exato da última ingestão de água. O paciente informa ter bebido café.',
            foxCons: 'Cirurgia reprogramada com segurança, ata técnica assinada anexada ao prontuário médico, conformidade plena com o CFM.',
            foxComp: '99.8%',
            foxRisk: 'Zero (0/10)',
            foxNps: '+99'
        },
        'banco': {
            title: 'Caso 2: Renegociação de Dívidas & Contrato de Crédito',
            context: 'Cliente surdo busca o banco para renegociar débito do cartão de crédito com parcelamento em 36 vezes e juros de mora.',
            avatarSummary: 'Soletra rapidamente siglas como "C-D-I" e "I-O-F". Inverte o vetor de orientação do sinal de pagamento, parecendo que o banco pagará o cliente. O cliente assina sem compreender a dívida real.',
            avatarCons: 'Ação civil no PROCON, nulidade das cláusulas de juros por vício de consentimento e dano moral coletivo.',
            avatarComp: '22%',
            avatarRisk: 'Alto (9/10)',
            avatarNps: '-68',
            foxSummary: 'Intérprete alinha os valores de entrada e encargos, contextualiza o Custo Efetivo Total (CET) e dialoga tirando todas as dúvidas com acolhimento.',
            foxCons: 'Recuperação de crédito bem-sucedida, retenção do cliente e ata auditável de conformidade para o BACEN.',
            foxComp: '99.2%',
            foxRisk: 'Zero (0/10)',
            foxNps: '+97'
        },
        'academico': {
            title: 'Caso 3: Aula Magna Universitária & Banca Acadêmica',
            context: 'Estudante surda em curso de pós-graduação assiste a seminário denso de Direito Constitucional e Hermenêutica Jurídica.',
            avatarSummary: 'O avatar não reconhece termos abstratos ou expressões técnicas e simplesmente trava ou sinaliza palavras genéricas desconexas ("lei grande livro").',
            avatarCons: 'Evasão universitária, processo por exclusão pedagógica perante o MPF e perda de nota no MEC.',
            avatarComp: '10%',
            avatarRisk: 'Crítico (10/10)',
            avatarNps: '-90',
            foxSummary: 'Intérprete (ele próprio Mestre em Educação) recebeu o glossário técnico previamente e sinaliza com rigor epistemológico, concordância e profundidade.',
            foxCons: 'Equidade educacional real, nota máxima da universidade na avaliação do MEC e aluna aprovada na banca.',
            foxComp: '99.6%',
            foxRisk: 'Zero (0/10)',
            foxNps: '+100'
        }
    }
};

let currentDiagnosticState = {
    sector: 'saude',
    solution: 'avatar',
    channel: 'sac'
};

function switchComplianceTab(tabId, btn) {
    document.querySelectorAll('.compliance-tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.compliance-tab-btn').forEach(b => {
        b.classList.remove('active', 'bg-sky-600', 'text-white', 'shadow-lg');
        b.classList.add('text-slate-300');
    });

    if (tabId === 'scanner') {
        const el = document.getElementById('tabContentScanner');
        if (el) el.classList.remove('hidden');
        if (btn) btn.classList.add('active', 'bg-sky-600', 'text-white', 'shadow-lg');
    } else if (tabId === 'laboratorio') {
        const el = document.getElementById('tabContentLaboratorio');
        if (el) el.classList.remove('hidden');
        if (btn) btn.classList.add('active', 'bg-sky-600', 'text-white', 'shadow-lg');
    } else if (tabId === 'parametros') {
        const el = document.getElementById('tabContentParametros');
        if (el) el.classList.remove('hidden');
        if (btn) btn.classList.add('active', 'bg-sky-600', 'text-white', 'shadow-lg');
    }
}

function setDiagnosticSector(sectorKey, el) {
    currentDiagnosticState.sector = sectorKey;
    document.querySelectorAll('.diag-sector-btn').forEach(b => {
        b.classList.remove('active', 'border-sky-500', 'bg-sky-500/10', 'text-white');
        b.classList.add('border-slate-800', 'text-slate-300');
    });
    if (el) {
        el.classList.add('active', 'border-sky-500', 'bg-sky-500/10', 'text-white');
        el.classList.remove('border-slate-800', 'text-slate-300');
    }
    updateLbiDiagnostic();
}

function setDiagnosticSolution(solutionKey, el) {
    currentDiagnosticState.solution = solutionKey;
    document.querySelectorAll('.diag-solution-btn').forEach(b => {
        b.classList.remove('active', 'border-sky-500', 'bg-sky-500/10', 'text-white');
        b.classList.add('border-slate-800', 'text-slate-300');
    });
    if (el) {
        el.classList.add('active', 'border-sky-500', 'bg-sky-500/10', 'text-white');
        el.classList.remove('border-slate-800', 'text-slate-300');
    }
    updateLbiDiagnostic();
}

function setDiagnosticChannel(channelKey, el) {
    currentDiagnosticState.channel = channelKey;
    document.querySelectorAll('.diag-channel-btn').forEach(b => {
        b.classList.remove('active', 'border-sky-500', 'bg-sky-500/10', 'text-white');
        b.classList.add('border-slate-800', 'text-slate-300');
    });
    if (el) {
        el.classList.add('active', 'border-sky-500', 'bg-sky-500/10', 'text-white');
        el.classList.remove('border-slate-800', 'text-slate-300');
    }
    updateLbiDiagnostic();
}

function updateLbiDiagnostic() {
    const s = LBI_DIAGNOSTIC_DATA.sectors[currentDiagnosticState.sector] || LBI_DIAGNOSTIC_DATA.sectors['saude'];
    const sol = LBI_DIAGNOSTIC_DATA.solutions[currentDiagnosticState.solution] || LBI_DIAGNOSTIC_DATA.solutions['avatar'];
    const ch = LBI_DIAGNOSTIC_DATA.channels[currentDiagnosticState.channel] || 'SAC';

    const riskScore = Math.round(s.baseRisk * sol.riskMult);
    const compScore = sol.comprehension;

    // Update gauges & numbers
    const scoreRiskEl = document.getElementById('diagRiskNumber');
    if (scoreRiskEl) scoreRiskEl.textContent = `${riskScore}%`;

    const scoreCompEl = document.getElementById('diagCompNumber');
    if (scoreCompEl) scoreCompEl.textContent = `${compScore}%`;

    const badgeEl = document.getElementById('diagStatusBadge');
    if (badgeEl) {
        badgeEl.className = `px-3.5 py-1.5 rounded-full text-xs font-bold border tracking-wide inline-flex items-center gap-1.5 ${sol.statusClass}`;
        badgeEl.innerHTML = `<span class="w-2 h-2 rounded-full animate-ping ${sol.textColor === 'text-emerald-400' ? 'bg-emerald-400' : 'bg-red-400'}"></span> ${sol.statusBadge}`;
    }

    const barRiskEl = document.getElementById('diagRiskBar');
    if (barRiskEl) {
        barRiskEl.style.width = `${Math.max(5, riskScore)}%`;
        barRiskEl.className = `h-3 rounded-full bg-gradient-to-r ${sol.barColor} transition-all duration-500`;
    }

    const barCompEl = document.getElementById('diagCompBar');
    if (barCompEl) {
        barCompEl.style.width = `${Math.max(5, compScore)}%`;
    }

    // Texts
    const lawRefEl = document.getElementById('diagLawRef');
    if (lawRefEl) lawRefEl.textContent = s.lawRef;

    const solDescEl = document.getElementById('diagSolutionDesc');
    if (solDescEl) solDescEl.textContent = sol.description;

    const risksListEl = document.getElementById('diagRisksList');
    if (risksListEl) {
        risksListEl.innerHTML = s.risks.map(r => `
            <li class="flex items-start gap-2.5 text-xs text-slate-300">
                <i class="fa-solid fa-triangle-exclamation text-amber-400 mt-0.5 shrink-0"></i>
                <span>${r}</span>
            </li>
        `).join('');
    }

    const recTitleEl = document.getElementById('diagRecTitle');
    if (recTitleEl) recTitleEl.textContent = s.solutionTitle;

    const recDescEl = document.getElementById('diagRecDesc');
    if (recDescEl) recDescEl.textContent = s.solutionDesc;

    const recSlaEl = document.getElementById('diagRecSla');
    if (recSlaEl) recSlaEl.textContent = s.sla;

    const recActEl = document.getElementById('diagRecActivation');
    if (recActEl) recActEl.textContent = s.activation;
}

function switchScenario(scenarioKey, el) {
    const sc = LBI_DIAGNOSTIC_DATA.scenarios[scenarioKey];
    if (!sc) return;

    document.querySelectorAll('.scenario-select-btn').forEach(b => {
        b.classList.remove('active', 'border-sky-500', 'bg-sky-500/20', 'text-white');
        b.classList.add('border-slate-800', 'text-slate-400');
    });
    if (el) {
        el.classList.add('active', 'border-sky-500', 'bg-sky-500/20', 'text-white');
        el.classList.remove('border-slate-800', 'text-slate-400');
    }

    // Update scenario view
    const titleEl = document.getElementById('scenTitleDisplay');
    if (titleEl) titleEl.textContent = sc.title;

    const ctxEl = document.getElementById('scenContextDisplay');
    if (ctxEl) ctxEl.textContent = sc.context;

    const aSumEl = document.getElementById('scenAvatarSummary');
    if (aSumEl) aSumEl.textContent = sc.avatarSummary;

    const aConsEl = document.getElementById('scenAvatarCons');
    if (aConsEl) aConsEl.textContent = sc.avatarCons;

    const aCompEl = document.getElementById('scenAvatarComp');
    if (aCompEl) aCompEl.textContent = sc.avatarComp;

    const aRiskEl = document.getElementById('scenAvatarRisk');
    if (aRiskEl) aRiskEl.textContent = sc.avatarRisk;

    const aNpsEl = document.getElementById('scenAvatarNps');
    if (aNpsEl) aNpsEl.textContent = sc.avatarNps;

    const fSumEl = document.getElementById('scenFoxSummary');
    if (fSumEl) fSumEl.textContent = sc.foxSummary;

    const fConsEl = document.getElementById('scenFoxCons');
    if (fConsEl) fConsEl.textContent = sc.foxCons;

    const fCompEl = document.getElementById('scenFoxComp');
    if (fCompEl) fCompEl.textContent = sc.foxComp;

    const fRiskEl = document.getElementById('scenFoxRisk');
    if (fRiskEl) fRiskEl.textContent = sc.foxRisk;

    const fNpsEl = document.getElementById('scenFoxNps');
    if (fNpsEl) fNpsEl.textContent = sc.foxNps;
}

function requestLbiAuditReport() {
    const s = LBI_DIAGNOSTIC_DATA.sectors[currentDiagnosticState.sector] || LBI_DIAGNOSTIC_DATA.sectors['saude'];
    const sol = LBI_DIAGNOSTIC_DATA.solutions[currentDiagnosticState.solution] || LBI_DIAGNOSTIC_DATA.solutions['avatar'];
    const ch = LBI_DIAGNOSTIC_DATA.channels[currentDiagnosticState.channel] || 'SAC';
    const riskScore = Math.round(s.baseRisk * sol.riskMult);

    const message = `Olá, Prof. Mestre Osvaldo Queta e equipe FOX LIBRAS! Realizei o Diagnóstico de Compliance LBI no site:
- Setor: ${s.name}
- Solução Atual: ${sol.name}
- Canal Crítico: ${ch}
- Nível de Risco Calculado: ${riskScore}%
Gostaria de solicitar o Laudo de Auditoria LBI e agendar uma reunião de diagnóstico técnico para minha empresa.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5563992581001?text=${encoded}`, '_blank');
}

// Inicialização Completa no Carregamento do DOM
window.addEventListener('DOMContentLoaded', () => {
    calcularInvestimento();
    renderCorporateMarquee();
    renderServicesVideoGrid();
    renderGalleryCarousel();
    recordVisitTelemetry();
    checkAdminRoute();
    updateLbiDiagnostic();
});

if (typeof window !== 'undefined') {
    const initVLibras = () => {
        if (window.VLibras && typeof window.VLibras.Widget === 'function') {
            try {
                new window.VLibras.Widget('https://vlibras.gov.br/app');
            } catch (e) {
                console.warn('VLibras init warning:', e);
            }
        }
    };
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initVLibras();
    } else {
        window.addEventListener('DOMContentLoaded', initVLibras);
    }
}