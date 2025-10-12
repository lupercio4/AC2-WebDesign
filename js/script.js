// js/script.js - FUNCIONALIDADES COMPLETAS

// =============================================
// 1. INICIALIZAÇÃO GERAL
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Recycle JS - Inicializando funcionalidades...');
    
    // Inicializar todas as funcionalidades
    inicializarTema();
    inicializarBotaoTopo();
    inicializarTypewriter();
    inicializarScrollSuave();
    inicializarHeaderDinamico();
    inicializarAnimacoesScroll();
    
    // Adicionar eventos aos botões existentes
    inicializarBotoes();
});

// =============================================
// 2. MODO ESCURO/CLARO
// =============================================

function inicializarTema() {
    const botaoTema = document.getElementById('botaoTema');
    const temaSalvo = localStorage.getItem('temaRecycle');
    
    // Aplicar tema salvo ou detectar preferência do sistema
    if (temaSalvo === 'escuro' || (!temaSalvo && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        ativarModoEscuro();
    }
    
    botaoTema.addEventListener('click', alternarTema);
}

function alternarTema() {
    const botaoTema = document.getElementById('botaoTema');
    
    if (document.body.classList.contains('tema-escuro')) {
        desativarModoEscuro();
    } else {
        ativarModoEscuro();
    }
}

function ativarModoEscuro() {
    document.body.classList.add('tema-escuro');
    localStorage.setItem('temaRecycle', 'escuro');
    document.getElementById('botaoTema').textContent = '☀️';
}

function desativarModoEscuro() {
    document.body.classList.remove('tema-escuro');
    localStorage.setItem('temaRecycle', 'claro');
    document.getElementById('botaoTema').textContent = '🌓';
}

// =============================================
// 3. BOTÃO VOLTAR AO TOPO
// =============================================

function inicializarBotaoTopo() {
    const botaoTopo = document.getElementById('botaoTopo');
    
    // Ocultar botão inicialmente
    botaoTopo.style.opacity = '0';
    botaoTopo.style.visibility = 'hidden';
    
    // Mostrar/ocultar botão no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            botaoTopo.style.opacity = '1';
            botaoTopo.style.visibility = 'visible';
        } else {
            botaoTopo.style.opacity = '0';
            botaoTopo.style.visibility = 'hidden';
        }
    });
    
    // Evento de clique
    botaoTopo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =============================================
// 4. EFEITO TYPEWRITER (ESCREVENDO)
// =============================================

function inicializarTypewriter() {
    const textosParaDigitar = [
        {
            elemento: document.querySelector('.tituloPrincipal'),
            textos: [
                'Conheça a Recycle',
                'Transforme seu lixo em benefícios',
                'Junte-se à revolução sustentável'
            ],
            velocidade: 100,
            apagarVelocidade: 50,
            tempoEntreTextos: 2000
        },
        {
            elemento: document.querySelector('.textoDescricao'),
            textos: [
                'A máquina inteligente que transforma o descarte de PETs e latas de alumínio em uma experiência moderna, gratificante e sustentável.',
                'Simples, bonita e eficaz para um futuro mais verde.',
                'Reciclagem com recompensas - faça a diferença!'
            ],
            velocidade: 40,
            apagarVelocidade: 30,
            tempoEntreTextos: 3000
        }
    ];
    
    textosParaDigitar.forEach(config => {
        if (config.elemento) {
            iniciarTypewriter(config);
        }
    });
}

function iniciarTypewriter(config) {
    let textoIndex = 0;
    let charIndex = 0;
    let isApagando = false;
    const elemento = config.elemento;
    const textoOriginal = elemento.textContent;
    
    // Salvar texto original e limpar
    elemento.setAttribute('data-texto-original', textoOriginal);
    elemento.textContent = '';
    elemento.classList.add('digitando');
    
    function digitar() {
        const textoAtual = config.textos[textoIndex];
        
        if (!isApagando && charIndex <= textoAtual.length) {
            elemento.textContent = textoAtual.substring(0, charIndex);
            charIndex++;
            setTimeout(digitar, config.velocidade);
        } else if (isApagando && charIndex >= 0) {
            elemento.textContent = textoAtual.substring(0, charIndex);
            charIndex--;
            setTimeout(digitar, config.apagarVelocidade);
        } else {
            isApagando = !isApagando;
            if (!isApagando) {
                textoIndex = (textoIndex + 1) % config.textos.length;
            }
            setTimeout(digitar, config.tempoEntreTextos);
        }
    }
    
    
    setTimeout(digitar, 1000);
}


function inicializarScrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const alvo = document.querySelector(href);
                
                if (alvo) {
                    alvo.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}


function inicializarHeaderDinamico() {
    const header = document.querySelector('.cabecalhoContainer');
    let ultimoScroll = 0;
    
    window.addEventListener('scroll', function() {
        const scrollAtual = window.pageYOffset;
        
        
        if (scrollAtual > 50) {
            header.style.background = 'var(--header-scroll-bg, rgba(255, 255, 255, 0.95))';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = '';
            header.style.backdropFilter = '';
            header.style.boxShadow = '';
        }
        
        if (scrollAtual > ultimoScroll && scrollAtual > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        ultimoScroll = scrollAtual;
    });
}


function inicializarAnimacoesScroll() {
    const elementos = document.querySelectorAll('.cardRecurso, .secaoTecnologia, .secaoSustentavel');
    
    elementos.forEach(el => {
        el.classList.add('escondido');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revelado');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elementos.forEach(el => {
        observer.observe(el);
    });
}



function inicializarBotoes() {
    
    const botaoSaibaMais = document.querySelector('.botaoPrimario');
    if (botaoSaibaMais) {
        botaoSaibaMais.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector('.secaoTecnologia').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    
   
    const cards = document.querySelectorAll('.cardRecurso');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function estaNaTela(elemento) {
    const rect = elemento.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

console.log('✅ Todas as funcionalidades JavaScript foram carregadas!');