import jsPDF from 'jspdf';
import { InvitationData } from '../types';

/**
 * Generates the official 6-page Cartilha:
 * "DIRECIONAMENTO DO IMPOSTO DE RENDA - 40 ANOS DA LAVAGEM DA ESQUINA DO PADRE"
 * PRONAC 264180 | Artigo 18 | Esquina do Padre Produções Artísticas
 */
/**
 * When `artworkDataUrl` is provided (a PNG of the invitation card), it is placed
 * as a full-page cover before the Cartilha, so a single file carries both the
 * artwork and the commercial media kit — WhatsApp and e-mail render that first
 * page as the preview thumbnail.
 */
export const generateOfficialProposalPdf = (
  data: InvitationData,
  artworkDataUrl?: string | null
): { blob: Blob; url: string; fileName: string } => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pw = doc.internal.pageSize.getWidth(); // 210
  const ph = doc.internal.pageSize.getHeight(); // 297
  const margin = 18;
  const cw = pw - margin * 2;

  // Colors
  const darkNavy = [19, 34, 56]; // #132238
  const gold = [217, 160, 54]; // #d9a036
  const bgLight = [251, 248, 242]; // #fbf8f2
  const textDark = [35, 35, 35];
  const textGray = [100, 100, 100];
  const borderLight = [228, 222, 210];

  // Helper for footer
  const renderFooter = (pageNumber: number, label: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(130, 125, 115);
    doc.text(label.toUpperCase(), margin, ph - 12);
    doc.text(`0${pageNumber} / 06`, pw - margin, ph - 12, { align: 'right' });
  };

  // Helper for chapter header
  const renderChapterHeader = (chapNum: string, title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(chapNum.toUpperCase(), margin, 24);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(title.toUpperCase(), margin, 34);
  };

  // ==========================================
  // ARTWORK COVER (optional, rendered before the Cartilha)
  // ==========================================
  if (artworkDataUrl) {
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.rect(0, 0, pw, ph, 'F');

    // Gold hairline frame
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.4);
    doc.rect(8, 8, pw - 16, ph - 16);

    const captionBand = 20;
    const artMaxW = pw - 32;
    const artMaxH = ph - 32 - captionBand;

    const props = doc.getImageProperties(artworkDataUrl);
    const fit = Math.min(artMaxW / props.width, artMaxH / props.height);
    const iw = props.width * fit;
    const ih = props.height * fit;
    const ix = (pw - iw) / 2;
    const iy = 16 + (artMaxH - ih) / 2;

    // White mat behind the artwork so any transparency stays legible
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(ix - 2.5, iy - 2.5, iw + 5, ih + 5, 2, 2, 'F');
    doc.addImage(artworkDataUrl, 'PNG', ix, iy, iw, ih, undefined, 'FAST');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(
      'CONVITE OFICIAL  |  40 ANOS DA LAVAGEM DA ESQUINA DO PADRE',
      pw / 2,
      ph - 20,
      { align: 'center' }
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(190, 200, 215);
    doc.text(
      'Caetite - Bahia    |    PRONAC 264180    |    Cartilha completa nas paginas seguintes',
      pw / 2,
      ph - 14,
      { align: 'center' }
    );

    doc.addPage();
  }

  // ==========================================
  // PAGE 1: CAPA
  // ==========================================
  // Navy background
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.rect(0, 0, pw, ph, 'F');

  // "CARTILHA"
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('C  A  R  T  I  L  H  A', margin, 32);

  // Big Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text('DIRECIONAMENTO\nDO IMPOSTO\nDE RENDA', margin, 50, { lineHeightFactor: 1.15 });

  // Gold separator line
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(margin, 92, cw, 1.2, 'F');

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(220, 225, 235);
  const subText = 'Guia visual para empresas do Lucro Real: como investir ate 4% do IRPJ devido em cultura sem gastar um centavo a mais.';
  doc.text(subText, margin, 102, { maxWidth: cw - 20, lineHeightFactor: 1.3 });

  // Dedicated to company badge (if customized)
  if (data.recipientCompany && data.recipientCompany !== 'Sua Empresa / Marca') {
    doc.setFillColor(30, 48, 76);
    doc.roundedRect(margin, 124, cw, 14, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(`APRESENTADO A: ${data.recipientCompany.toUpperCase()}`, margin + 6, 133);
  }

  // 4% Circle Graphic
  const circleX = pw - margin - 32;
  const circleY = 166;
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1.2);
  doc.circle(circleX, circleY, 24, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('4%', circleX, circleY + 2, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('DO IRPJ DEVIDO', circleX, circleY + 11, { align: 'center' });

  // Box CUSTO REAL ZERO
  doc.setDrawColor(60, 80, 110);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, 150, 85, 32, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('CUSTO REAL PARA A EMPRESA', margin + 6, 160);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text('ZERO', margin + 6, 174);

  // Footer / Project identity
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(margin, ph - 38, 16, 0.8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('40 ANOS DA LAVAGEM DA ESQUINA DO PADRE', margin, ph - 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(190, 200, 215);
  doc.text('Caetite - Bahia    |    PRONAC 264180    |    Artigo 18', margin, ph - 22);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Esquina do Padre Producoes Artisticas', margin, ph - 16);


  // ==========================================
  // PAGE 2: CAPÍTULO 01 - COMO FUNCIONA A LEI
  // ==========================================
  doc.addPage();
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.rect(0, 0, pw, ph, 'F');

  renderChapterHeader('CAPITULO 01', 'COMO FUNCIONA A LEI DE INCENTIVO');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const p1Text = 'A legislacao federal permite que empresas tributadas pelo Lucro Real direcionem ate 4% do Imposto de Renda devido para projetos culturais aprovados pelo Governo Federal, abatendo 100% desse valor na apuracao.';
  doc.text(p1Text, margin, 46, { maxWidth: cw, lineHeightFactor: 1.35 });

  // 3 Steps
  const cardW = (cw - 8) / 3;
  const cardH = 48;
  const cardY = 70;

  // Step 1
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.roundedRect(margin, cardY, cardW, cardH, 2, 2, 'FD');
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(margin, cardY, cardW, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(200, 195, 185);
  doc.text('01', margin + 5, cardY + 12);

  doc.setFontSize(8.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('EMPRESA', margin + 5, cardY + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Apura o IRPJ devido no regime de Lucro Real.', margin + 5, cardY + 27, { maxWidth: cardW - 10, lineHeightFactor: 1.3 });

  // Step 2
  const x2 = margin + cardW + 4;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x2, cardY, cardW, cardH, 2, 2, 'FD');
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(x2, cardY, cardW, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(200, 195, 185);
  doc.text('02', x2 + 5, cardY + 12);

  doc.setFontSize(8.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('DESTINACAO', x2 + 5, cardY + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Transfere ate 4% para a conta oficial do projeto.', x2 + 5, cardY + 27, { maxWidth: cardW - 10, lineHeightFactor: 1.3 });

  // Step 3
  const x3 = margin + (cardW + 4) * 2;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x3, cardY, cardW, cardH, 2, 2, 'FD');
  doc.setFillColor(34, 139, 84); // green
  doc.rect(x3, cardY, cardW, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(200, 195, 185);
  doc.text('03', x3 + 5, cardY + 12);

  doc.setFontSize(8.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('ABATIMENTO', x3 + 5, cardY + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Deduz 100% do valor na guia DARF recalculada.', x3 + 5, cardY + 27, { maxWidth: cardW - 10, lineHeightFactor: 1.3 });

  // PONTO FUNDAMENTAL BOX
  const pfY = 132;
  const pfH = 65;
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(margin, pfY, cw, pfH, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('P O N T O   F U N D A M E N T A L', margin + 10, pfY + 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  const fundText = 'A sua empresa NAO paga menos imposto e NAO gasta nada a mais. O desembolso total continua rigorosamente o mesmo.';
  doc.text(fundText, margin + 10, pfY + 25, { maxWidth: cw - 20, lineHeightFactor: 1.3 });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(200, 210, 225);
  const fundSub = 'A diferenca real e a quem esse dinheiro e entregue - e o retorno que ele traz para o seu negocio.';
  doc.text(fundSub, margin + 10, pfY + 48, { maxWidth: cw - 20, lineHeightFactor: 1.3 });

  renderFooter(2, 'O MECANISMO LEGAL');


  // ==========================================
  // PAGE 3: CAPÍTULO 02 - OS DOIS CENÁRIOS
  // ==========================================
  doc.addPage();
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.rect(0, 0, pw, ph, 'F');

  renderChapterHeader('CAPITULO 02', 'OS DOIS CENARIOS');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Exemplo pratico para uma empresa com imposto devido de R$ 1.000.000,00.', margin, 44);

  // Cenário 1 Card
  let cy = 52;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.roundedRect(margin, cy, cw, 58, 2, 2, 'FD');
  doc.setFillColor(180, 50, 40); // red accent line
  doc.rect(margin, cy, cw, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('CENARIO 1 - Sem patrocinar o projeto', margin + 6, cy + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Guia (DARF) paga a Receita Federal', margin + 6, cy + 20);
  doc.setFont('helvetica', 'bold');
  doc.text('R$ 1.000.000,00', pw - margin - 6, cy + 20, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.text('Destinado a cultura e ao desenvolvimento local', margin + 6, cy + 27);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 50, 40);
  doc.text('R$ 0,00', pw - margin - 6, cy + 27, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Retorno de imagem para a sua marca', margin + 6, cy + 34);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 50, 40);
  doc.text('ZERO', pw - margin - 6, cy + 34, { align: 'right' });

  // 100% bar
  doc.setFillColor(30, 70, 130);
  doc.roundedRect(margin + 6, cy + 40, cw - 12, 6, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('100% PARA BRASILIA', margin + 10, cy + 44.5);

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('TOTAL PAGO PELA EMPRESA', margin + 6, cy + 53);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('R$ 1.000.000,00', pw - margin - 6, cy + 53, { align: 'right' });

  // Cenário 2 Card
  cy = 118;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, cy, cw, 68, 2, 2, 'FD');
  doc.setFillColor(34, 139, 84); // green accent
  doc.rect(margin, cy, cw, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('CENARIO 2 - Patrocinando os 40 Anos da Lavagem', margin + 6, cy + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Limite legal permitido (4%)', margin + 6, cy + 20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('R$ 40.000,00', pw - margin - 6, cy + 20, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Transferencia para a conta oficial do projeto', margin + 6, cy + 27);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('R$ 40.000,00', pw - margin - 6, cy + 27, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Guia (DARF) recalculada a Receita Federal', margin + 6, cy + 34);
  doc.setFont('helvetica', 'bold');
  doc.text('R$ 960.000,00', pw - margin - 6, cy + 34, { align: 'right' });

  // Split Bar 96% + 4%
  const barW = cw - 12;
  const bar96 = barW * 0.92;
  const bar4 = barW * 0.08;
  doc.setFillColor(30, 70, 130);
  doc.rect(margin + 6, cy + 42, bar96, 6, 'F');
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(margin + 6 + bar96, cy + 42, bar4, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('96% PARA A UNIAO', margin + 10, cy + 46.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('4%', margin + 6 + bar96 + 2, cy + 46.5);

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('TOTAL PAGO PELA EMPRESA', margin + 6, cy + 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('R$ 1.000.000,00', pw - margin - 6, cy + 59, { align: 'right' });

  // Bottom Box
  const bbY = 196;
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(margin, bbY, cw, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('MESMO DESEMBOLSO. DESTINO DIFERENTE.', pw / 2, bbY + 11.5, { align: 'center' });

  renderFooter(3, 'COMPARATIVO FINANCEIRO');


  // ==========================================
  // PAGE 4: CAPÍTULO 03 - A VANTAGEM PARA O EMPRESÁRIO
  // ==========================================
  doc.addPage();
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.rect(0, 0, pw, ph, 'F');

  renderChapterHeader('CAPITULO 03', 'A VANTAGEM PARA O EMPRESARIO');

  let vy = 52;
  const vList = [
    {
      num: '01',
      title: 'O valor final nao muda',
      desc: 'Em vez de transferir R$ 1.000.000,00 integralmente para os cofres da Uniao em Brasilia, sua empresa envia R$ 960.000,00 ao governo e aplica R$ 40.000,00 diretamente na cidade onde seus clientes vivem.'
    },
    {
      num: '02',
      title: 'Marketing e prestigio a custo zero',
      desc: 'Seu negocio ganha destaque como patrocinador oficial de um evento com 40 anos de tradicao, com visibilidade em pecas de divulgacao, redes sociais, materiais institucionais e durante o cortejo cultural.'
    },
    {
      num: '03',
      title: 'Dinheiro que movimenta a economia local',
      desc: 'O recurso permanece em Caetite gerando empregos diretos e indiretos, fortalecendo o comercio, a rede hoteleira, prestadores de servico e os artistas da terra.'
    }
  ];

  vList.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(gold[0], gold[1], gold[2]);
    doc.text(item.num, margin, vy + 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(item.title, margin + 20, vy + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(item.desc, margin + 20, vy + 12, { maxWidth: cw - 20, lineHeightFactor: 1.4 });

    // subtle divider line
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.setLineWidth(0.4);
    doc.line(margin, vy + 38, pw - margin, vy + 38);

    vy += 46;
  });

  renderFooter(4, 'RETORNO INSTITUCIONAL');


  // ==========================================
  // PAGE 5: CAPÍTULO 04 - SEGURANÇA TRIBUTÁRIA
  // ==========================================
  doc.addPage();
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.rect(0, 0, pw, ph, 'F');

  renderChapterHeader('CAPITULO 04', 'SEGURANCA TRIBUTARIA');

  // Badge PRONAC Box
  let sy = 46;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.roundedRect(margin, sy, cw, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('REGISTRO OFICIAL', margin + 6, sy + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('PRONAC 264180', margin + 6, sy + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('ARTIGO 18', pw - margin - 6, sy + 16, { align: 'right' });

  // 4 Cards Grid
  const gw = (cw - 6) / 2;
  const gh = 36;
  sy = 74;

  const gList = [
    { title: 'DEDUCAO INTEGRAL', desc: 'O valor do patrocinio e compensado em 100% no IRPJ devido pela empresa.', x: margin, y: sy },
    { title: 'COMPROVACAO OFICIAL', desc: 'Emissao de Recibo Oficial de Mecenato, com total respaldo fiscal perante a Receita Federal.', x: margin + gw + 6, y: sy },
    { title: 'CONTA EXCLUSIVA', desc: 'O deposito e feito unicamente na conta bancaria vinculada ao projeto no Banco do Brasil.', x: margin, y: sy + gh + 6 },
    { title: 'MONITORAMENTO', desc: 'Movimentacao e prestacao de contas acompanhadas diretamente pelo Governo Federal.', x: margin + gw + 6, y: sy + gh + 6 }
  ];

  gList.forEach(g => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.roundedRect(g.x, g.y, gw, gh, 2, 2, 'FD');

    doc.setFillColor(gold[0], gold[1], gold[2]);
    doc.rect(g.x + 6, g.y + 6, 12, 1.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(g.title, g.x + 6, g.y + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(g.desc, g.x + 6, g.y + 20, { maxWidth: gw - 12, lineHeightFactor: 1.3 });
  });

  // Transparência Dark Box
  const ty = sy + (gh + 6) * 2 + 4;
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(margin, ty, cw, 22, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('T R A N S P A R E N C I A', margin + 8, ty + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Nenhum recurso transita por contas particulares. Tudo e rastreavel.', margin + 8, ty + 16);

  renderFooter(5, 'RESPALDO LEGAL E FISCAL');


  // ==========================================
  // PAGE 6: CAPÍTULO 05 - COMO APLICAR
  // ==========================================
  doc.addPage();
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2]);
  doc.rect(0, 0, pw, ph, 'F');

  renderChapterHeader('CAPITULO 05', 'COMO APLICAR');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const apSub = 'Basta apresentar estas informacoes a contabilidade da sua empresa para que o calculo da destinacao seja validado no fechamento fiscal.';
  doc.text(apSub, margin, 44, { maxWidth: cw, lineHeightFactor: 1.3 });

  // 5 Step rows
  const steps = [
    'Confirme com a contabilidade o IRPJ devido no periodo.',
    'Calcule o limite de 4% sobre esse valor.',
    'Solicite os dados da conta oficial do projeto (PRONAC 264180).',
    'Faca o deposito e receba o Recibo Oficial de Mecenato.',
    'Abata o valor integralmente na guia DARF do fechamento.'
  ];

  let ay = 56;
  steps.forEach((st, i) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.roundedRect(margin, ay, cw, 14, 2, 2, 'FD');

    // Number circle badge
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.roundedRect(margin + 4, ay + 3, 8, 8, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`${i + 1}`, margin + 8, ay + 8.5, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(st, margin + 16, ay + 8.5);

    ay += 17;
  });

  // Bottom Project Card (Dark Navy)
  ay += 6;
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(margin, ay, cw, 42, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('P R O J E T O', margin + 8, ay + 10);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('40 ANOS DA LAVAGEM\nDA ESQUINA DO PADRE', margin + 8, ay + 19, { lineHeightFactor: 1.15 });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('Esquina do Padre Producoes Artisticas', margin + 8, ay + 32);

  doc.setFontSize(8.5);
  doc.setTextColor(190, 200, 215);
  doc.text('Caetite - Bahia    |    PRONAC 264180    |    Artigo 18', margin + 8, ay + 38);

  renderFooter(6, 'PASSO A PASSO');

  // Output
  const cleanCompanyName = (data.recipientCompany || 'Empresa').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = artworkDataUrl
    ? `Convite_e_Cartilha_40_Anos_Lavagem_${cleanCompanyName}.pdf`
    : `Cartilha_IRPJ_40_Anos_Lavagem_PRONAC_${cleanCompanyName}.pdf`;

  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);

  return { blob, url, fileName };
};
