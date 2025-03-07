function convertToBase64String() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files?.[0];
    if (!file) {
        alert('請先選擇檔案！');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        if (!e.target?.result) {
            alert('讀取檔案失敗！');
            return;
        }
        const base64Result = e.target.result;
        const oe1 = document.getElementById('base64Output');
        const oe2 = document.getElementById('fileFormatOutput');

        const parts = base64Result.split(',');
        if (parts.length !== 2) {
            alert('檔案格式錯誤！');
            return;
        }
        oe1.textContent = parts[1];
        oe2.textContent = parts[0];
    };
    reader.readAsDataURL(file);
}
