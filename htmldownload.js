const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// === CONFIGURAÇÕES ========================
const url = 'url'; // 🔁 Altere aqui a URL desejada
const nomeArquivo = 'ProtheusTest'; // 🔁 Altere aqui o nome do arquivo (sem extensão)
const pastaDestino = 'C:/Users/iago.benevides/Documents/Iago Benevides/QAz/Automacoes/Dowload HTML';
// ==========================================

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // HTML
    const html = await page.content();
    const caminhoHTML = path.join(pastaDestino, `${nomeArquivo}.html`);
    fs.writeFileSync(caminhoHTML, html, 'utf-8');
    console.log(`✅ HTML salvo em: ${caminhoHTML}`);

    // Screenshot
    const caminhoPNG = path.join(pastaDestino, `${nomeArquivo}.png`);
    await page.screenshot({ path: caminhoPNG, fullPage: true });
    console.log(`🖼️ Print salvo em: ${caminhoPNG}`);
  } catch (err) {
    console.error('❌ Erro ao capturar página:', err);
  } finally {
    await browser.close();
  }
})();