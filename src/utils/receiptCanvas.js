// High-Definition JPEG Thermal Receipt Generator for MENOKEN POS
export const generateReceiptJpeg = (trx) => {
  return new Promise((resolve) => {
    const width = 540;
    const baseHeight = 520;
    const itemHeight = (trx.items?.length || 1) * 32;
    const totalHeight = baseHeight + itemHeight;

    const scale = 2; // High-DPI Retina scaling
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = totalHeight * scale;

    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // 1. Clean Thermal Paper Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, totalHeight);

    // Decorative receipt border (Subtle perforated top & bottom)
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, width, 8);

    // 2. Uncen & MENOKEN Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#059669';
    ctx.font = 'bold 11px "Courier New", monospace';
    ctx.fillText('★ UNIVERSITAS CENDERAWASIH ★', width / 2, 36);

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 20px "Courier New", monospace';
    ctx.fillText('MENOKEN UNCEN', width / 2, 62);

    ctx.fillStyle = '#047857';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText(trx.groupName || 'Stan Wirausaha Mahasiswa', width / 2, 84);

    ctx.fillStyle = '#64748b';
    ctx.font = '11px "Courier New", monospace';
    ctx.fillText(`Waktu: ${trx.date || new Date().toLocaleString('id-ID')}`, width / 2, 104);
    ctx.fillText(`No. Transaksi: ${trx.id || 'TRX-ONLINE'}`, width / 2, 120);

    // Dashed Divider Helper
    const drawDivider = (y) => {
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(width - 30, y);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    drawDivider(136);

    // 3. Customer Info
    ctx.textAlign = 'left';
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.fillText(`Pelanggan : ${trx.customerName || 'Pelanggan Stan Expo'}`, 32, 156);
    ctx.fillText(`Kasir     : Stan Wirausaha Kampus`, 32, 174);

    drawDivider(188);

    // 4. Items List
    let currentY = 212;
    ctx.font = 'bold 12px "Courier New", monospace';

    (trx.items || []).forEach((item) => {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0f172a';
      const itemTitle = `${item.name} x${item.qty}`;
      // Truncate if too long
      const truncatedTitle = itemTitle.length > 32 ? itemTitle.substring(0, 30) + '..' : itemTitle;
      ctx.fillText(truncatedTitle, 32, currentY);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(`Rp${Number(item.subtotal || 0).toLocaleString('id-ID')}`, width - 32, currentY);

      currentY += 28;
    });

    drawDivider(currentY);
    currentY += 28;

    // 5. Total & Payment
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 16px "Courier New", monospace';
    ctx.fillText('TOTAL TRANSAKSI', 32, currentY);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#047857';
    ctx.font = '900 18px "Courier New", monospace';
    ctx.fillText(`Rp${Number(trx.totalAmount || 0).toLocaleString('id-ID')}`, width - 32, currentY);

    currentY += 26;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.fillText('Metode Bayar', 32, currentY);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(`${trx.paymentMethod || 'Tunai'}`, width - 32, currentY);

    currentY += 22;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#475569';
    ctx.fillText('Status', 32, currentY);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#059669';
    ctx.font = '900 12px "Courier New", monospace';
    ctx.fillText('LUNAS (PAID)', width - 32, currentY);

    currentY += 16;
    drawDivider(currentY);
    currentY += 24;

    // 6. Thermal Footer & Verification
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    ctx.font = 'italic 11px "Courier New", monospace';
    ctx.fillText('Terima kasih telah mendukung wirausaha muda', width / 2, currentY);
    currentY += 16;
    ctx.fillText('Universitas Cenderawasih Papua!', width / 2, currentY);
    currentY += 20;

    // Stamp & Security
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px "Courier New", monospace';
    ctx.fillText('● BUKTI PEMBAYARAN SAH MENOKEN UNCEN 2026 ●', width / 2, currentY);
    currentY += 14;
    ctx.fillText('https://menoken.vercel.app', width / 2, currentY);

    // Bottom accent strip
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, totalHeight - 8, width, 8);

    // Convert to JPEG data URL
    const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.95);

    // Also get blob for sharing
    canvas.toBlob((blob) => {
      resolve({
        dataUrl: jpegDataUrl,
        blob,
        filename: `Struk-MENOKEN-${trx.id || Date.now()}.jpg`
      });
    }, 'image/jpeg', 0.95);
  });
};

// Download helper
export const downloadReceiptJpeg = (dataUrl, filename) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename || `Struk-MENOKEN-${Date.now()}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
