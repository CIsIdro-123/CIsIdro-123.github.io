(function () {
    var loader = document.getElementById('page-loader');
    if (!loader) return;

    window.addEventListener('load', function () {
        setTimeout(function () {
            loader.classList.add('slide-up');
            setTimeout(function () {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 600);
        }, 300);
    });
})();
