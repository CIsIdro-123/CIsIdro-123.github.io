(() => {
  /* ========= 代码块语言标签 ========= */
  document.querySelectorAll('figure.highlight').forEach(item => {
    const cls = item.className.split(' ');
    let lang = cls[1];
    item.setAttribute('data-lang', lang && lang !== 'plain' ? lang : 'Code');
  });

  /* ========= 代码块一键复制 ========= */
  document.querySelectorAll('.post-content figure.highlight').forEach(block => {
      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.textContent = '复制';
      btn.type = 'button';
      btn.addEventListener('click', () => {
          const code = block.querySelector('td.code')?.innerText
                    || block.querySelector('pre')?.innerText || '';
          const done = () => { btn.textContent = '已复制'; setTimeout(() => (btn.textContent = '复制'), 1500); };
          if (navigator.clipboard) {
              navigator.clipboard.writeText(code).then(done).catch(() => fallbackCopy(code, done));
          } else {
              fallbackCopy(code, done);
          }
      });
      block.appendChild(btn);

      function fallbackCopy(text, done) {
          const ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); ta.remove(); done();
      }
  });

  /* ========= 主题切换 ========= */
  const body = document.body;
  const themeToggleBtn = document.querySelector('.theme-toggle');

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
    }
  };

function sendThemeToGiscus(theme) {
    const frame = document.querySelector('.giscus-frame');
    if (!frame || !frame.contentWindow) {
        // giscus 可能还没加载完，1.2 秒后重试一次
        setTimeout(() => {
            const retry = document.querySelector('.giscus-frame');
            if (retry && retry.contentWindow) {
                retry.contentWindow.postMessage(
                    { giscus: { setConfig: { theme } } },
                    'https://giscus.app'
                );
            }
        }, 1200);
        return;
    }
    frame.contentWindow.postMessage(
        { giscus: { setConfig: { theme } } },
        'https://giscus.app'
    );
}
  
  const toggleTheme = () => {
    const next =
      body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
    sendThemeToGiscus(next);
  };

  // 初始化
  applyTheme(localStorage.getItem('theme') || 'dark');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  const menuTrigger = document.getElementById('menu-trigger');
  if (menuTrigger) {
    menuTrigger.addEventListener('change', function () {
      document.querySelector('.wrapper')?.classList.toggle(
        'blurry',
        this.checked
      );
    });
  }

  const toTopBtn = document.getElementById('toTopBtn');
  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      toTopBtn.style.display = window.scrollY > 20 ? 'flex' : 'none';
    });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeButton');
  const toggleBtn = document.getElementById('toggleButton');

  if (toggleBtn && overlay) {
    toggleBtn.addEventListener('click', () => {
      overlay.style.display = 'flex';
      toggleBtn.style.display = 'none';
    });
  }

  if (closeBtn && overlay && toggleBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
      toggleBtn.style.display = 'flex';
    });
  }

  /* ========= 加载页消失 ========= */
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      body.classList.add('loaded');
    });
  });

/* ========= 本地搜索 ========= */
document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('local-search-input');
    var resultsDiv = document.getElementById('search-results');

    // 元素不存在就直接退出
    if (!input || !resultsDiv) return;

    var resultList = resultsDiv.querySelector('ul');

    // 点击搜索框外部 →关闭搜索结果
    document.addEventListener('click', function(e) {
        var wrapper = document.querySelector('.search-box-wrapper');
        if (!wrapper) return;
        var isClickInside = wrapper.contains(e.target);
        if (!isClickInside) {
            resultsDiv.style.display = 'none';
        }
    });

    // 监听输入事件
    input.addEventListener('input', function() {
        var query = this.value.trim().toLowerCase();

        if (query.length === 0) {
            resultsDiv.style.display = 'none';
            return;
        }

        // 发起请求获取 search.xml
        fetch('/search.xml')
            .then(function(response) { return response.text(); })
            .then(function(str) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(str, 'text/xml');
                var entries = xmlDoc.getElementsByTagName('entry');
                var html = '';

                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    var title = entry.getElementsByTagName('title')[0]?.textContent || '';
                    var link  = entry.getElementsByTagName('url')[0]?.textContent || '';

                    if (title.toLowerCase().indexOf(query) > -1) {
                        html += '<li><a href="' + link + '">' + title + '</a></li>';
                    }
                }

                resultList.innerHTML = html || '<li>未找到相关文章</li>';
                resultsDiv.style.display = 'block';
            })
            .catch(function(err) {
                resultList.innerHTML = '<li>请先安装搜索插件</li>';
                resultsDiv.style.display = 'block';
            });
    });
});

(function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 80; 

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            navbar.classList.add('navbar-hidden');
        } 
        else {
            navbar.classList.remove('navbar-hidden');
        }

        lastScroll = currentScroll <= 0 ? 0 : currentScroll; 
    }, { passive: true });
})();



})();

