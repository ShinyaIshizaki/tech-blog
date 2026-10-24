(() => {
  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    const copied = document.execCommand('copy');
    textarea.remove();
    if (!copied) {
      throw new Error('Copy command was rejected');
    }
  };

  document.querySelectorAll('.highlighter-rouge > .highlight').forEach((block) => {
    const code = block.querySelector('pre > code');
    if (!code) {
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy-button';
    button.textContent = 'コピー';
    button.setAttribute('aria-label', 'コードをクリップボードにコピー');
    block.appendChild(button);

    button.addEventListener('click', async () => {
      try {
        await copyText(code.textContent);
        button.textContent = 'コピーしました';
        button.setAttribute('aria-label', 'コードをコピーしました');
      } catch {
        button.textContent = 'コピーできません';
        button.setAttribute('aria-label', 'コードをコピーできませんでした');
      }

      window.setTimeout(() => {
        button.textContent = 'コピー';
        button.setAttribute('aria-label', 'コードをクリップボードにコピー');
      }, 2000);
    });
  });
})();