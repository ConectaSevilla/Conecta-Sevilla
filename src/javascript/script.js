/* ============================================================
   MENU MOBILE (hamburguer)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.onclick = function(e) {
            e.preventDefault(); 
            mobileMenu.classList.toggle('active');
        };
    }
});

/* ============================================================
   BOTÃO VOLTAR AO INÍCIO
   ============================================================ */
(function criarBotaoTopo() {
    const btn = document.createElement('button');
    btn.id = 'btn-topo';
    btn.setAttribute('aria-label', 'Voltar ao início');
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { // Aparece mais rápido
            btn.classList.add('visivel');
        } else {
            btn.classList.remove('visivel');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ============================================================
   SISTEMA DE TRADUÇÃO (EN / ES / PT)
   ============================================================ */
(function sistemaIdiomas() {
    let idiomaAtual = localStorage.getItem('idioma') || 'en';

    function aplicarTraducoes() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const chave = el.getAttribute('data-i18n');
            const traducao = TRADUCOES[idiomaAtual]?.[chave];
            if (!traducao) return;

            // Mantém ícones se existirem, mas força a troca do texto
            const icone = el.querySelector('i');
            if (icone && (el.tagName === 'A' || el.tagName === 'BUTTON')) {
                el.innerHTML = icone.outerHTML + ' ' + traducao;
            } else {
                el.textContent = traducao;
            }
        });
        document.documentElement.lang = idiomaAtual;
    }

    function criarSeletorIdioma() {
        if (document.getElementById('seletor-idioma')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'seletor-idioma';
        wrapper.innerHTML = `
            <button class="lang-btn" data-lang="en" title="English">🇬🇧 EN</button>
            <button class="lang-btn" data-lang="es" title="Español">🇪🇸 ES</button>
            <button class="lang-btn" data-lang="pt" title="Português">🇵🇹 PT</button>
        `;

        const nav = document.getElementById('navbar');
        const btnContato = nav.querySelector('.btn-principal');
        const menuMobile = document.getElementById('mobile_nav_list');

        if (btnContato) {
            nav.insertBefore(wrapper, btnContato);
        } else {
            nav.appendChild(wrapper);
        }

        if (menuMobile) {
            const liMobile = document.createElement('li');
            liMobile.className = 'nav-item lang-mobile-item';

            const wrapperMobile = wrapper.cloneNode(true);
            wrapperMobile.id = 'seletor-idioma-mobile';
            wrapperMobile.classList.add('seletor-mobile');

            liMobile.appendChild(wrapperMobile);
            menuMobile.appendChild(liMobile);
        }

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                idiomaAtual = btn.getAttribute('data-lang');
                localStorage.setItem('idioma', idiomaAtual);
                aplicarTraducoes();
                atualizarBotoesAtivos();

                const mm = document.getElementById('mobile_menu');
                if (mm && mm.classList.contains('active')) {
                    mm.classList.remove('active');
                }
            });
        });
    }

    function atualizarBotoesAtivos() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('ativo', btn.getAttribute('data-lang') === idiomaAtual);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        criarSeletorIdioma();
        aplicarTraducoes();
        atualizarBotoesAtivos();
    });
})();
