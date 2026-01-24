// 結婚式の日付を設定（年, 月-1, 日, 時, 分, 秒）
const weddingDate = new Date(2026, 8, 26, 10, 40, 0).getTime(); // 2026年9月26日 10:40

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
    const address = '明治神宮神楽殿 東京都渋谷区代々木神園町1-1';
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
            padding: 0;
            border-radius: 10px;
            text-align: center;
            margin: 0;
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
