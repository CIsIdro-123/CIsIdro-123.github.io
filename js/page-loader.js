(function () {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    // 根据路径切换 GIF
    const path = window.location.pathname;
    const gifMap = {
        '/tags/':      '/img/loading-tags.gif',
        '/archives/':  '/img/loading-archives.gif',
        '/about/':     '/img/loading-about.gif',
        '/guestbook/': '/img/loading-guestbook.gif',
    };

    const gifEl = loader.querySelector('.loader-gif');
    if (gifEl) {
        let matched = '/img/loading-default.gif';
        for (const [key, val] of Object.entries(gifMap)) {
            if (path.startsWith(key) || path === key) {
                matched = val;
                break;
            }
        }
        gifEl.src = matched;
    }

    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.classList.add('slide-up');
            setTimeout(function () {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 600);
        }, 400);
    });
})();