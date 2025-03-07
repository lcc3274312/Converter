let base64Result: string = '';

function convertToBase64(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) {
        alert('請先選擇檔案！');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e: ProgressEvent<FileReader>) {
        base64Result = e.target?.result as string;
        const outputElement = document.getElementById('base64Output');
        const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement;
        
        if (outputElement) {
            outputElement.textContent = base64Result;
        }
        if (downloadBtn) {
            downloadBtn.disabled = false;
        }
    };
    reader.readAsDataURL(file);
}

function downloadBase64File(): void {
    if (!base64Result) {
        alert('請先轉換檔案！');
        return;
    }

    const element = document.createElement('a');
    element.setAttribute('href', base64Result);
    element.setAttribute('download', 'base64_output.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}