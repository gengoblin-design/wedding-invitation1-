// 結婚式の日付を設定（年, 月-1, 日, 時, 分, 秒）
const weddingDate = new Date(2026, 5, 15, 14, 0, 0).getTime(); // 2026年6月15日 14:00

// カウントダウンタイマー
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        // 結婚式当日になった場合
        document.getElementById('countdown').innerHTML = '<div class="celebration">🎉 本日は結婚式です！ 🎉</div>';
    }
}

// 1秒ごとにカウントダウンを更新
setInterval(updateCountdown, 1000);

// 初回実行
updateCountdown();

// スムーズスクロール
document.addEventListener('DOMContentLoaded', function() {
    // スクロールインジケーターのクリックイベント
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('.couple-photos').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // フェードインアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を監視
    const animateElements = document.querySelectorAll('.section-title, .photo-card, .timeline-item, .venue-card, .info-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// RSVP フォーム関連
function openRSVPForm() {
    const formContainer = document.getElementById('rsvpFormContainer');
    if (formContainer.style.display === 'none' || formContainer.style.display === '') {
        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        formContainer.style.display = 'none';
    }
}

function openGoogleForm() {
    // Google Formsのリンクを開く（実際のURLに置き換えてください）
    const googleFormUrl = 'https://forms.google.com/your-form-id';
    window.open(googleFormUrl, '_blank');
}

// Google Mapsを開く
function openMap() {
    // 実際の会場の住所に置き換えてください
    const address = '東京都千代田区千代田1-1';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
}

// RSVP フォーム送信処理
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータを取得
            const formData = new FormData(rsvpForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // ここでフォームデータを処理
            console.log('RSVP Data:', data);
            
            // 成功メッセージを表示
            showSuccessMessage();
            
            // フォームをリセット
            rsvpForm.reset();
            
            // フォームを非表示
            document.getElementById('rsvpFormContainer').style.display = 'none';
        });
    }
});

function showSuccessMessage() {
    // 成功メッセージを表示
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            text-align: center;
            margin: 2rem auto;
            max-width: 400px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        ">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            ご回答ありがとうございました！
        </div>
    `;
    
    const rsvpSection = document.querySelector('.rsvp-section .container');
    rsvpSection.appendChild(successDiv);
    
    // 3秒後にメッセージを削除
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// パララックス効果（オプション）
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// モバイルメニュー（必要に応じて）
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// 画像の遅延読み込み（オプション）
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ページ読み込み完了時の処理
window.addEventListener('load', function() {
    // 遅延読み込みを初期化
    lazyLoadImages();
    
    // ローディングアニメーションを非表示（必要に応じて）
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Google Analytics（必要に応じて）
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// RSVP ボタンクリックの追跡
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('rsvp-btn')) {
        trackEvent('rsvp_button_click', {
            button_type: e.target.classList.contains('primary') ? 'form' : 'google'
        });
    }
});

// ソーシャルシェア機能（オプション）
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('花子 & 太郎の結婚式にご招待いたします！');
    
    let shareUrl = '';
    
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'line':
            shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// PWA対応（オプション）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// 印刷対応
function printInvitation() {
    window.print();
}

// QRコード生成（必要に応じて）
function generateQRCode() {
    const qrCodeContainer = document.getElementById('qrcode');
    if (qrCodeContainer && typeof QRCode !== 'undefined') {
        new QRCode(qrCodeContainer, {
            text: window.location.href,
            width: 128,
            height: 128
        });
    }
}

// 多言語対応（オプション）
const translations = {
    ja: {
        'rsvp_success': 'ご回答ありがとうございました！',
        'loading': '読み込み中...',
        'error': 'エラーが発生しました'
    },
    en: {
        'rsvp_success': 'Thank you for your response!',
        'loading': 'Loading...',
        'error': 'An error occurred'
    }
};

function translate(key, lang = 'ja') {
    return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
}