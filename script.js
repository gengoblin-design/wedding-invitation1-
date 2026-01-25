// カウントダウン機能
function updateCountdown() {
    const weddingDate = new Date('2026-09-26T10:40:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // 結婚式当日または過ぎた場合
        document.getElementById('countdown').innerHTML = '<div class="countdown-complete">THE DAY OF WEDDING!</div>';
    }
}

// スムーススクロール機能
function smoothScroll() {
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// スクロール時のナビゲーション効果
function handleNavScroll() {
    const nav = document.querySelector('.main-nav');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        // ナビゲーションの背景透明度調整
        if (scrollTop > 100) {
            nav.style.background = 'rgba(28, 28, 28, 0.98)';
        } 
        else {
            nav.style.background = 'rgba(28, 28, 28, 0.95)';
        }
        
        // スクロールインジケーターの非表示
        if (scrollIndicator) {
            if (scrollTop > 200) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        }
    });
}

// アクティブセクションのハイライト
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                // 現在のアクティブリンクを削除
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // 対応するナビリンクをアクティブに
                const activeLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
}

// ギャラリー画像のモーダル表示（オプション）
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            // モーダル作成
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <img src="${this.src}" alt="${this.alt}">
                        <button class="modal-close">&times;</button>
                    </div>
                </div>
            `;
            
            // モーダルスタイル
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const modalImg = modal.querySelector('img');
            modalImg.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            document.body.appendChild(modal);
            
            // フェードイン
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // 閉じる機能
            const closeModal = () => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target === modal.querySelector('.modal-overlay')) {
                    closeModal();
                }
            });
            
            // ESCキーで閉じる
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEsc);
                }
            };
            document.addEventListener('keydown', handleEsc);
        });
    });
}

// フォームの統合準備（Microsoft Forms用）
function prepareMicrosoftForms() {
    // Microsoft Formsの埋め込みコードがある場合の処理
    const formsPlaceholder = document.querySelector('.forms-placeholder');
    
    if (formsPlaceholder) {
        // 実際のMicrosoft Formsの埋め込みコードに置き換える場合の準備
        // 例: <iframe>タグを動的に挿入
        
        // 現在はプレースホルダーとして表示
        console.log('Microsoft Formsの埋め込み準備完了');
        
        // 実際の埋め込み例（コメントアウト）:
        /*
        const formsIframe = document.createElement('iframe');
        formsIframe.src = 'YOUR_MICROSOFT_FORMS_EMBED_URL';
        formsIframe.width = '100%';
        formsIframe.height = '600px';
        formsIframe.frameBorder = '0';
        formsIframe.marginHeight = '0';
        formsIframe.marginWidth = '0';
        
        formsPlaceholder.innerHTML = '';
        formsPlaceholder.appendChild(formsIframe);
        */
    }
}

// パフォーマンス最適化：画像の遅延読み込み
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// アニメーション効果のオプション
function initAnimationOptions() {
    // スクロール時のフェードイン効果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素
    const animateElements = document.querySelectorAll('.profile, .timeline-item, .venue-card, .detail-card, .gallery-item');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// アニメーション用CSS（動的に追加）
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .profile, .timeline-item, .venue-card, .detail-card, .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .timeline-item:nth-child(even) {
            transform: translateY(30px) translateX(30px);
        }
        
        .timeline-item:nth-child(even).animate-in {
            transform: translateY(0) translateX(0) !important;
        }
        
        .gallery-item {
            transition-delay: calc(var(--delay, 0) * 0.1s);
        }
        
        .countdown-complete {
            font-size: 1.5rem;
            color: #daa520;
            font-weight: 600;
            text-align: center;
            padding: 2rem;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        
        .main-nav a.active {
            background: rgba(255,255,255,0.15);
            color: #daa520;
        }
        
        .main-nav a.active::after {
            width: 80%;
        }
        
        @media (max-width: 768px) {
            .timeline-item:nth-child(even) {
                transform: translateY(30px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ギャラリー項目に遅延アニメーション用のCSS変数を設定
function setGalleryAnimationDelay() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.setProperty('--delay', index);
    });
}

// 初期化関数
function init() {
    // 基本機能の初期化
    updateCountdown();
    smoothScroll();
    handleNavScroll();
    highlightActiveSection();
    prepareMicrosoftForms();
    
    // アニメーション機能の初期化（オプション）
    addAnimationStyles();
    setGalleryAnimationDelay();
    initAnimationOptions();
    initLazyLoading();
    initGalleryModal();
    
    // カウントダウンを1秒ごとに更新
    setInterval(updateCountdown, 1000);
    
    console.log('結婚式招待サイトが正常に初期化されました');
}

// DOMが読み込まれたら初期化実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// アニメーション効果のオプション一覧（コンソールで確認可能）
const animationOptions = {
    basic: {
        name: "基本フェードイン",
        description: "要素が画面に入るときにフェードインします",
        enabled: true
    },
    stagger: {
        name: "段階的アニメーション", 
        description: "ギャラリー画像が順番にアニメーションします",
        enabled: true
    },
    parallax: {
        name: "パララックス効果",
        description: "背景画像がスクロールに合わせて動きます（実装可能）",
        enabled: false
    },
    typewriter: {
        name: "タイプライター効果",
        description: "テキストが一文字ずつ表示されます（実装可能）",
        enabled: false
    },
    floating: {
        name: "フローティング効果",
        description: "要素が軽やかに浮遊するアニメーション（実装可能）",
        enabled: false
    },
    slideIn: {
        name: "スライドイン効果",
        description: "要素が左右からスライドして登場します（実装可能）",
        enabled: false
    }
};

// アニメーションオプションをコンソールに表示
console.log('利用可能なアニメーション効果:', animationOptions);
console.log('追加のアニメーション効果をご希望の場合は、お知らせください。');

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.error);
});

// パフォーマンス監視（開発用）
if (window.performance && window.performance.mark) {
    window.performance.mark('site-init-start');
    
    window.addEventListener('load', function() {
        window.performance.mark('site-init-end');
        window.performance.measure('site-init', 'site-init-start', 'site-init-end');
        
        const measure = window.performance.getEntriesByName('site-init')[0];
        console.log(`サイト初期化時間: ${measure.duration.toFixed(2)}ms`);
    });
}
