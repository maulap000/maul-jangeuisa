const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign, LevelFormat
} = require('C:/Users/PEOPLECOM/클로드cowork영역/docx-temp/node_modules/docx');
const fs = require('fs');
const path = require('path');

// ── 색상 ──
const NAVY  = "1C2840";
const GOLD  = "A8895A";
const CREAM = "F5F3EF";
const STONE = "E5E1D8";
const GRAY  = "6B7280";
const WHITE = "FFFFFF";

// ── 페이지 (A4, 좁은 여백) ──
const PW = 11906;
const PH = 16838;
const MG = 567; // ~10mm
const CW = PW - MG * 2; // 10772 DXA (콘텐츠 너비)
const HALF = Math.floor(CW / 2); // 5386

// ── 테두리 헬퍼 ──
const none   = () => ({ style: BorderStyle.NIL, size: 0, color: WHITE });
const single = (color, sz) => ({ style: BorderStyle.SINGLE, size: sz || 6, color });
const noBorders = () => ({ top: none(), bottom: none(), left: none(), right: none() });
const allBorders = (color, sz) => {
  const b = single(color, sz);
  return { top: b, bottom: b, left: b, right: b };
};

// ── 텍스트 헬퍼 ──
const run = (text, opts = {}) => new TextRun({
  text,
  font: opts.serif ? "Noto Serif KR" : "Malgun Gothic",
  size: opts.size || 18,
  bold: opts.bold || false,
  color: opts.color || "000000",
  italics: opts.italics || false,
});

// 빈 단락
const empty = (space) => new Paragraph({
  children: [],
  spacing: { before: 0, after: space || 0 },
});

// ── 로고 이미지 ──
const logoPath = path.join(__dirname, 'images', 'logo.png');
const logoData = fs.readFileSync(logoPath);

// ── 헤더 테이블 (로고 | 태그라인+전화) ──
function makeHeader() {
  const logoCol = Math.floor(CW * 0.38);
  const rightCol = CW - logoCol;
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [logoCol, rightCol],
    borders: { ...noBorders(), insideH: none(), insideV: none() },
    rows: [
      new TableRow({
        children: [
          // 로고
          new TableCell({
            width: { size: logoCol, type: WidthType.DXA },
            borders: { ...noBorders(), bottom: single(NAVY, 16) },
            verticalAlign: VerticalAlign.BOTTOM,
            margins: { top: 80, bottom: 120, left: 0, right: 120 },
            children: [new Paragraph({
              children: [new ImageRun({
                type: "png",
                data: logoData,
                transformation: { width: 130, height: 68 },
                altText: { title: "마을장의사", description: "마을장의사 로고", name: "logo" },
              })],
              alignment: AlignmentType.LEFT,
            })],
          }),
          // 태그라인 + 전화
          new TableCell({
            width: { size: rightCol, type: WidthType.DXA },
            borders: { ...noBorders(), bottom: single(NAVY, 16) },
            verticalAlign: VerticalAlign.BOTTOM,
            margins: { top: 80, bottom: 120, left: 120, right: 0 },
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 0, after: 20 },
                children: [run("장례지도사가 직접 운영하는 후불장례 종합서비스", { size: 14, color: GRAY })],
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 0, after: 20 },
                children: [run("가입비 없음  ·  선납금 없음  ·  발인날 결제", { size: 14, color: GRAY })],
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: 0, after: 0 },
                children: [
                  run("1877-1852", { size: 30, bold: true, color: NAVY }),
                  run("  24시간 상담", { size: 14, color: GRAY }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ── 신뢰 배지 띠 ──
function makeTrustBand() {
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CW, type: WidthType.DXA },
        shading: { fill: CREAM, type: ShadingType.CLEAR },
        borders: { ...noBorders(), bottom: single(STONE, 6) },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 0 },
          children: [
            run("✓ ", { size: 14, color: GOLD, bold: true }),
            run("완전 후불 — 발인날 결제", { size: 14, color: NAVY, bold: true }),
            run("   |   ", { size: 14, color: STONE }),
            run("✓ ", { size: 14, color: GOLD, bold: true }),
            run("가입비·선납금 없음", { size: 14, color: NAVY, bold: true }),
            run("   |   ", { size: 14, color: STONE }),
            run("✓ ", { size: 14, color: GOLD, bold: true }),
            run("장례지도사 직접 운영", { size: 14, color: NAVY, bold: true }),
            run("   |   ", { size: 14, color: STONE }),
            run("✓ ", { size: 14, color: GOLD, bold: true }),
            run("숨은 비용 없음", { size: 14, color: NAVY, bold: true }),
          ],
        })],
      })],
    })],
  });
}

// ── 섹션 타이틀 ──
function makeSectionTitle(text) {
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CW, type: WidthType.DXA },
        shading: { fill: WHITE, type: ShadingType.CLEAR },
        borders: { ...noBorders(), bottom: single(STONE, 6) },
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({
          spacing: { before: 0, after: 0 },
          children: [run(text, { size: 18, bold: true, color: NAVY })],
        })],
      })],
    })],
  });
}

// ── 상품 카드 내용 생성 헬퍼 ──
function makeCardRows(items) {
  const w1 = 1100, w2 = HALF - w1 - 240;
  return items.map(([label, value, highlight]) =>
    new TableRow({
      children: [
        new TableCell({
          width: { size: w1, type: WidthType.DXA },
          borders: { ...noBorders(), bottom: single("F0EDE8", 4) },
          margins: { top: 50, bottom: 50, left: 80, right: 60 },
          children: [new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [run(label, { size: 14, bold: true, color: highlight ? GOLD : NAVY })],
          })],
        }),
        new TableCell({
          width: { size: w2, type: WidthType.DXA },
          borders: { ...noBorders(), bottom: single("F0EDE8", 4) },
          margins: { top: 50, bottom: 50, left: 60, right: 80 },
          children: [new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [run(value, { size: 14, bold: highlight, color: highlight ? NAVY : GRAY })],
          })],
        }),
      ],
    })
  );
}

// ── 상품 2단 테이블 ──
function makeProducts() {
  const gap = 200;
  const cardW = Math.floor((CW - gap) / 2);
  // 카드 안 내부 테이블용 너비
  const inner = cardW - 160; // 안쪽 패딩 제외

  function cardCell(name, priceNum, priceOrig, supportTag, incRows, diffRows, cardColor) {
    const w1 = 1000, w2 = inner - w1;

    const incTable = new Table({
      width: { size: inner, type: WidthType.DXA },
      columnWidths: [w1, w2],
      borders: { ...noBorders(), insideH: none(), insideV: none() },
      rows: incRows,
    });

    const children = [
      // 라벨
      new Paragraph({ spacing: { before: 0, after: 40 },
        children: [run(name === "작은 장례" ? "많이 선택" : "격식 있게", { size: 13, bold: true, color: GOLD })] }),
      // 상품명
      new Paragraph({ spacing: { before: 0, after: 60 },
        children: [run(name, { size: 28, bold: true, color: NAVY })] }),
      // 취소선 가격
      new Paragraph({ spacing: { before: 0, after: 20 },
        children: [new TextRun({ text: priceOrig, font: "Malgun Gothic", size: 14, color: GRAY,
          strike: true })] }),
      // 실부담 가격
      new Paragraph({ spacing: { before: 0, after: 40 },
        children: [
          run(priceNum, { size: 46, bold: true, color: NAVY }),
          run(" 만원", { size: 18, color: GRAY }),
        ] }),
      // 지원 태그
      new Paragraph({
        spacing: { before: 0, after: 100 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: STONE, space: 8 } },
        children: [run(supportTag, { size: 13, bold: true, color: GOLD })],
      }),
      // 포함내역 타이틀
      new Paragraph({ spacing: { before: 80, after: 60 },
        children: [run("INCLUDES  포함 내역", { size: 13, bold: true, color: GOLD })] }),
      // 포함내역 테이블
      incTable,
    ];

    if (diffRows) {
      children.push(new Paragraph({ spacing: { before: 100, after: 40 },
        children: [run("작은장례와 비교하면", { size: 13, bold: true, color: NAVY })] }));
      diffRows.forEach(t => children.push(
        new Paragraph({ spacing: { before: 0, after: 20 },
          children: [
            run("→ ", { size: 13, color: GOLD }),
            run(t, { size: 13, color: GRAY }),
          ] })
      ));
    }

    return new TableCell({
      width: { size: cardW, type: WidthType.DXA },
      shading: { fill: cardColor, type: ShadingType.CLEAR },
      borders: allBorders(cardColor === CREAM ? STONE : "C8A870", 8),
      margins: { top: 120, bottom: 140, left: 120, right: 120 },
      verticalAlign: VerticalAlign.TOP,
      children,
    });
  }

  // 작은장례 포함내역 행
  const smallRows = makeCardRows([
    ["관",        "화장용 오동나무", false],
    ["수의",      "화장 면수의", false],
    ["장례지도사", "3일간 전담 진행", false],
    ["상복",      "남성양복 3벌 · 여성한복 3벌 대여", false],
    ["장의차량",  "버스 또는 리무진 택1", false],
    ["앰뷸런스",  "관내 제공 (사전 신청 시)", false],
    ["염습·입관", "공인 장례지도사 2명 직접", true],
    ["관꽃 장식", "입관 관꽃 장식 무상 제공", true],
    ["접객실",    "1일차 1명 / 2일차 1명", false],
    ["봉안함",    "화장 목함", false],
  ]);

  // 일반장례 포함내역 행
  const normalRows = makeCardRows([
    ["관",        "화장용 오동나무", false],
    ["수의",      "저마수의 또는 한복수의", false],
    ["장례지도사", "3일간 전담 진행", false],
    ["상복",      "남성양복 5벌 · 여성한복 5벌 대여", false],
    ["장의차량",  "버스 + 리무진 모두 포함", false],
    ["앰뷸런스",  "관내 제공 (사전 신청 시)", false],
    ["염습·입관", "공인 장례지도사 2명 직접", true],
    ["관꽃 장식", "입관 관꽃 장식 무상 제공", true],
    ["접객실",    "1일차 2명 / 2일차 2명", false],
    ["봉안함",    "황토자기함 또는 목함", false],
  ]);

  const diffItems = [
    "수의 등급 업 (저마수의)",
    "상복 2벌 추가 (총 5벌씩)",
    "장의버스 + 리무진 모두 포함",
    "접객실 인원 2배 (각 일차 2명)",
    "봉안함 등급 업 (황토자기함)",
  ];

  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [cardW, gap, cardW],
    borders: { ...noBorders(), insideH: none(), insideV: none() },
    rows: [new TableRow({
      children: [
        cardCell("작은 장례", "160", "200만원",
          "꽃제단 40만원 지원 차감  →  실부담 160만원",
          smallRows, null, CREAM),
        // 빈 간격 셀
        new TableCell({
          width: { size: gap, type: WidthType.DXA },
          borders: noBorders(),
          children: [new Paragraph({ children: [] })],
        }),
        cardCell("일반 장례", "250", "290만원",
          "꽃제단 40만원 지원 차감  →  실부담 250만원",
          normalRows, diffItems, "FAF5EB"),
      ],
    })],
  });
}

// ── 공통 안내 ──
function makeCommon() {
  const items = [
    ["완전 후불", "발인날 결제, 선납금 없음"],
    ["가입비 없음", "계약서 없음, 문자로 약속 확인"],
    ["장례지도사 직접 운영", "처음부터 끝까지 담당"],
    ["숨은 비용 없음", "안내 금액 외 추가 청구 없음"],
  ];
  const hw = Math.floor(CW / 2);
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(new TableRow({
      children: items.slice(i, i + 2).map(([k, v]) =>
        new TableCell({
          width: { size: hw, type: WidthType.DXA },
          shading: { fill: CREAM, type: ShadingType.CLEAR },
          borders: { ...noBorders(), bottom: single(STONE, 4) },
          margins: { top: 60, bottom: 60, left: 120, right: 120 },
          children: [new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [
              run("● ", { size: 13, color: GOLD }),
              run(k, { size: 14, bold: true, color: NAVY }),
              run("  —  " + v, { size: 14, color: GRAY }),
            ],
          })],
        })
      ),
    }));
  }
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [hw, hw],
    borders: allBorders(STONE, 6),
    rows,
  });
}

// ── 별도 납부 안내 ──
function makeSeparate() {
  const items = [
    ["시설 사용료", "안치실 · 염습실 · 빈소(홀) 사용료"],
    ["음식 · 제사상", "장례식장에 직접 주문 및 납부"],
    ["꽃제단 비용", "장례식장 납부 (마을장의사 40만원 지원 적용 후)"],
    ["장지 비용", "화장료 · 봉안당(납골당) · 묘지 등"],
  ];
  const hw = Math.floor(CW / 2);

  const noteRow = new TableRow({
    children: [new TableCell({
      columnSpan: 2,
      width: { size: CW, type: WidthType.DXA },
      borders: { ...noBorders(), top: single(STONE, 4) },
      shading: { fill: WHITE, type: ShadingType.CLEAR },
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
      children: [new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [
          run("꽃제단은 장례식장에 납부하는 비용이며, 마을장의사가 그 중 ", { size: 13, color: GRAY }),
          run("40만원을 지원", { size: 13, bold: true, color: NAVY }),
          run("합니다.", { size: 13, color: GRAY }),
          run("  (작은장례 200→160만원 / 일반장례 290→250만원의 차감 금액이 이 지원금입니다.)", { size: 12, color: GRAY }),
        ],
      })],
    })],
  });

  const dataRows = [];
  for (let i = 0; i < items.length; i += 2) {
    dataRows.push(new TableRow({
      children: items.slice(i, i + 2).map(([k, v]) =>
        new TableCell({
          width: { size: hw, type: WidthType.DXA },
          shading: { fill: WHITE, type: ShadingType.CLEAR },
          borders: { ...noBorders(), bottom: single("F0EDE8", 4) },
          margins: { top: 60, bottom: 60, left: 120, right: 120 },
          children: [new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [
              run("· ", { size: 14, color: GOLD, bold: true }),
              run(k, { size: 14, bold: true, color: NAVY }),
              run("  " + v, { size: 14, color: GRAY }),
            ],
          })],
        })
      ),
    }));
  }

  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [hw, hw],
    borders: allBorders(STONE, 6),
    rows: [
      // 헤더행
      new TableRow({
        children: [new TableCell({
          columnSpan: 2,
          width: { size: CW, type: WidthType.DXA },
          shading: { fill: CREAM, type: ShadingType.CLEAR },
          borders: { ...noBorders(), bottom: single(STONE, 6) },
          margins: { top: 70, bottom: 70, left: 120, right: 120 },
          children: [new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [run("※ 장례식장에 별도 납부하는 항목  (마을장의사 서비스 금액에 미포함)",
              { size: 14, bold: true, color: NAVY })],
          })],
        })],
      }),
      ...dataRows,
      noteRow,
    ],
  });
}

// ── 푸터 테이블 ──
function makeFooter() {
  const lw = Math.floor(CW * 0.5);
  const rw = CW - lw;
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [lw, rw],
    borders: { ...noBorders(), insideH: none(), insideV: none() },
    rows: [new TableRow({
      children: [
        new TableCell({
          width: { size: lw, type: WidthType.DXA },
          borders: { ...noBorders(), top: single(NAVY, 16) },
          margins: { top: 120, bottom: 80, left: 0, right: 120 },
          verticalAlign: VerticalAlign.BOTTOM,
          children: [
            new Paragraph({ spacing: { before: 0, after: 30 },
              children: [run("1877-1852", { size: 36, bold: true, color: NAVY })] }),
            new Paragraph({ spacing: { before: 0, after: 0 },
              children: [run("24시간 상담 가능  ·  전화 상담만 운영", { size: 14, color: GRAY })] }),
          ],
        }),
        new TableCell({
          width: { size: rw, type: WidthType.DXA },
          borders: { ...noBorders(), top: single(NAVY, 16) },
          margins: { top: 120, bottom: 80, left: 120, right: 0 },
          verticalAlign: VerticalAlign.BOTTOM,
          children: [
            new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { before: 0, after: 30 },
              children: [run("마을장의사.com", { size: 20, bold: true, color: NAVY })] }),
            new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { before: 0, after: 0 },
              children: [run("홈페이지에서 더 자세한 내용을 확인하실 수 있습니다", { size: 13, color: GRAY })] }),
          ],
        }),
      ],
    })],
  });
}

// ── 문서 조립 ──
const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: PW, height: PH },
        margin: { top: MG, right: MG, bottom: MG, left: MG },
      },
    },
    children: [
      makeHeader(),
      empty(80),
      makeTrustBand(),
      empty(60),
      makeSectionTitle("후불상조서비스  —  상품 안내"),
      empty(80),
      makeProducts(),
      empty(80),
      makeCommon(),
      empty(80),
      makeSeparate(),
      empty(80),
      makeFooter(),
    ],
  }],
});

// ── 저장 ──
const outPath = path.join(__dirname, 'pamphlet.docx');
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log('OK:', outPath);
}).catch(e => { console.error(e); process.exit(1); });
