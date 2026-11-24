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
document.addEventListener('DOMContentLoaded', () => {
    const btnTopo = document.getElementById('btn-topo');
    
    if (btnTopo) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                btnTopo.classList.add('visivel');
            } else {
                btnTopo.classList.remove('visivel');
            }
        });

        btnTopo.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

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

            const icone = el.querySelector('i');
            if (icone && (el.tagName === 'A' || el.tagName === 'BUTTON')) {
                el.innerHTML = icone.outerHTML + ' ' + traducao;
            } else {
                // AQUI ESTAVA O ERRO: Usar innerHTML permite ler o <strong> e traduzir listas
                el.innerHTML = traducao;
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

/* ============================================================
   FUNÇÃO DO BOTÃO VOLTAR INTELIGENTE
   ============================================================ */
function voltarPagina(event) {
    event.preventDefault();
    
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}
