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
