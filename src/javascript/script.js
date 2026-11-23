const mobileBtn = document.getElementById('mobile_btn');
const mobileMenu = document.getElementById('mobile_menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

(function criarBotaoTopo() {
    // Cria o botão
    const btn = document.createElement('button');
    btn.id = 'btn-topo';
    btn.setAttribute('aria-label', 'Voltar ao início');
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(btn);

    // Mostra/esconde conforme o scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visivel');
        } else {
            btn.classList.remove('visivel');
        }
    });

    // Ação de clique
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
/* ===== SISTEMA DE TRADUÇÃO ===== */
(function sistemaIdiomas() {
    // Carrega o idioma salvo ou usa inglês como padrão
    let idiomaAtual = localStorage.getItem('idioma') || 'en';

    // Função que aplica as traduções aos elementos com data-i18n
    function aplicarTraducoes() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const chave = el.getAttribute('data-i18n');
            const traducao = TRADUCOES[idiomaAtual]?.[chave];
            if (traducao) {
                // Se o elemento tem filhos (ex: ícones), preserva-os
                if (el.children.length > 0 && el.tagName === 'A') {
                    // mantém os ícones e troca apenas o texto
                    const icone = el.querySelector('i');
                    el.innerHTML = (icone ? icone.outerHTML + ' ' : '') + traducao;
                } else {
                    el.textContent = traducao;
                }
            }
        });
        document.documentElement.lang = idiomaAtual;
        document.body.setAttribute('data-idioma', idiomaAtual);
    }

    // Cria o seletor de idioma (no header)
    function criarSeletorIdioma() {
        // Evita duplicar se já existir
        if (document.getElementById('seletor-idioma')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'seletor-idioma';
        wrapper.innerHTML = `
            <button class="lang-btn" data-lang="en" title="English">EN</button>
            <button class="lang-btn" data-lang="es" title="Español">ES</button>
            <button class="lang-btn" data-lang="pt" title="Português">PT</button>
        `;
        // Insere antes do botão "Contacto" (btn-principal)
        const nav = document.getElementById('navbar');
        const btnContato = nav.querySelector('.btn-principal');
        if (btnContato) {
            nav.insertBefore(wrapper, btnContato);
        } else {
            nav.appendChild(wrapper);
        }

        // Evento de clique nos botões
        wrapper.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                idiomaAtual = btn.getAttribute('data-lang');
                localStorage.setItem('idioma', idiomaAtual);
                aplicarTraducoes();
                atualizarBotoesAtivos();
            });
        });
    }

    function atualizarBotoesAtivos() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('ativo', btn.getAttribute('data-lang') === idiomaAtual);
        });
    }

    // Inicializa
    document.addEventListener('DOMContentLoaded', () => {
        criarSeletorIdioma();
        aplicarTraducoes();
        atualizarBotoesAtivos();
    });
})();
