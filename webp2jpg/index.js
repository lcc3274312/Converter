let convertedBlob = null;
let originalFileName = '';

// 監聽文件選擇
document.getElementById('fileInput')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 儲存原始檔名（不含副檔名）
    originalFileName = file.name.split('.')[0];

    // 顯示狀態
    const status = document.getElementById('status');
    if (status) {
        status.textContent = '轉換中...';
    }

    // 顯示預覽
    const preview = document.getElementById('preview');
    preview.src = URL.createObjectURL(file);
    preview.style.display = 'block';

    try {
        // 轉換圖片
        convertedBlob = await convertToJPG(file);
        if (status) {
            status.textContent = '轉換完成！';
        }

        // 顯示下載按鈕
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.style.display = 'inline-block';
        }
    } catch (error) {
        if (status) {
            status.textContent = '轉換失敗: ' + error.message;
        }
    }
});

// 轉換函數
function convertToJPG(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('無法創建畫布上下文'));
                return;
            }

            // 繪製圖片
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('轉換失敗'));
                }
            }, 'image/jpeg', 0.95);
        };
        img.onerror = () => reject(new Error('圖片載入失敗'));
        img.src = URL.createObjectURL(file);
    });
}

// 下載按鈕點擊事件
document.getElementById('downloadBtn')?.addEventListener('click', () => {
    if (!convertedBlob || !originalFileName) return;

    const url = URL.createObjectURL(convertedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${originalFileName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});