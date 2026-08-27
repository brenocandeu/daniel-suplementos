
const URL_PLANILHA_GOOGLE = 'https://docs.google.com/spreadsheets/d/1uQJiDBSCi8ZGXJ3IHOxzYlTWJR8vc1HQse6oMbpWgVg/gviz/tq?tqx=out:csv';
const URL_PLANILHA_CUPONS = 'https://docs.google.com/spreadsheets/d/1MqjOYkfgomfgPC7PTrvmJEENdWRiAjCnNfpXMH69sps/gviz/tq?tqx=out:csv'; // Link CSV da planilha de cupons

let CUPONS_DB = [{ codigo: 'kdbibi', desconto: 5 }]; // Inicializa com o cupom de teste
let appliedCoupon = null;

const PRODUTOS_DB = [
  {
    "id": "v01",
    "category": "LINHA OFICIAL",
    "priceNum": "149.90",
    "title": "RESVERATROL TRANS VINIE 165mg - 60 CÁPSULAS",
    "image": "img/products/v01.png",
    "priceText": "R$ 149,90"
  },
  {
    "id": "v02",
    "category": "LINHA OFICIAL",
    "priceNum": "69.90",
    "title": "CREATINA FATOR X VINIE 100% PURA - 300G",
    "image": "img/products/v02.png",
    "priceText": "R$ 69,90"
  },
  {
    "id": "v03",
    "category": "LINHA OFICIAL",
    "priceNum": "89.90",
    "title": "CREATINA FATOR X VINIE SABOR UVA + RESVERATROL - 300G",
    "image": "img/products/v03.png",
    "priceText": "R$ 89,90"
  },
  {
    "id": "v04",
    "category": "LINHA OFICIAL",
    "priceNum": "139.90",
    "title": "COLÁGENO HIDROLISADO VINIE + RESVERATROL - 300G",
    "image": "img/products/v04.png",
    "priceText": "R$ 139,90"
  },
  {
    "id": "v05",
    "category": "LINHA OFICIAL",
    "priceNum": "89.90",
    "title": "VINI HAIR SUPLEMENTO DE VITAMINAS 20g - 30 CÁPSULAS",
    "image": "img/products/v05.png",
    "priceText": "R$ 89,90"
  },
  {
    "id": "v06",
    "category": "LINHA OFICIAL",
    "priceNum": "99.90",
    "title": "CREATINA FATOR X VINIE SABOR ABACAXI + RESVERATROL - 305G",
    "image": "img/products/v06.png",
    "priceText": "R$ 99,90"
  },
  {
    "id": "v07",
    "category": "LINHA OFICIAL",
    "priceNum": "89.90",
    "title": "BIOTINA BARÃO MEN LINE - 30 CÁPSULAS",
    "image": "img/products/v07.png",
    "priceText": "R$ 89,90"
  },
  {
    "id": "v08",
    "category": "LINHA OFICIAL",
    "priceNum": "15.90",
    "title": "COQUETELEIRA SHAKER VINIE PERFORMANCE",
    "image": "img/products/v08.png",
    "priceText": "R$ 15,90"
  },
  {
    "id": "p1",
    "category": "PROTEÍNAS",
    "priceNum": "172.90",
    "title": "WHEY GOLD ADAPTOGEN 900G - ORIGINAL",
    "image": "img/products/p1.jpg",
    "priceText": "R$ 172,90"
  },
  {
    "id": "p2",
    "category": "PROTEÍNAS",
    "priceNum": "232.90",
    "title": "WHEY PROTEIN CONCENTRADO DUX 900G - CAPPUCCINO",
    "image": "img/products/p2.jpg",
    "priceText": "R$ 232,90"
  },
  {
    "id": "p3",
    "category": "PROTEÍNAS",
    "priceNum": "232.90",
    "title": "WHEY PROTEIN CONCENTRADO DUX 900G - CHOCOLATE",
    "image": "img/products/p3.jpg",
    "priceText": "R$ 232,90"
  },
  {
    "id": "p4",
    "category": "PROTEÍNAS",
    "priceNum": "232.90",
    "title": "WHEY PROTEIN CONCENTRADO DUX 900G - CHOCOLATE BRANCO",
    "image": "img/products/p4.jpg",
    "priceText": "R$ 232,90"
  },
  {
    "id": "p5",
    "category": "PROTEÍNAS",
    "priceNum": "232.90",
    "title": "WHEY PROTEIN CONCENTRADO DUX 900G - COOKIES",
    "image": "img/products/p5.jpg",
    "priceText": "R$ 232,90"
  },
  {
    "id": "p100",
    "category": "PROTEÍNAS",
    "priceNum": "179.90",
    "title": "WHEY PROTEIN CONCENTRADO DUX 450G - CHOCOLATE BRANCO",
    "image": "img/products/p100.jpg",
    "priceText": "R$ 179,90"
  },
  {
    "id": "p6",
    "category": "PROTEÍNAS",
    "priceNum": "179.90",
    "title": "WHEY GOLD ADAPTOGEN 900G - CHOCOTELLA",
    "image": "img/products/p6.jpg",
    "priceText": "R$ 179,90"
  },
  {
    "id": "p7",
    "category": "PROTEÍNAS",
    "priceNum": "89.90",
    "title": "WHEY PROTEIN NUTRI INTEGRAL MEDICA POTE 900G - BAUNILHA",
    "image": "img/products/p7.jpg",
    "priceText": "R$ 89,90"
  },
  {
    "id": "p8",
    "category": "PROTEÍNAS",
    "priceNum": "89.90",
    "title": "WHEY PROTEIN NUTRI INTEGRAL MEDICA POTE 900G - CHOCOLATE",
    "image": "img/products/p8.jpg",
    "priceText": "R$ 89,90"
  },
  {
    "id": "p9",
    "category": "PROTEÍNAS",
    "priceNum": "89.90",
    "title": "WHEY PROTEIN NUTRI INTEGRAL MEDICA POTE 900G - COOKIES",
    "image": "img/products/p9.jpg",
    "priceText": "R$ 89,90"
  },
  {
    "id": "p10",
    "category": "PROTEÍNAS",
    "priceNum": "172.90",
    "title": "WHEY GOLD ADAPTOGEN 900G - DULCE DE LECHE",
    "image": "img/products/p10.jpg",
    "priceText": "R$ 172,90"
  },
  {
    "id": "p11",
    "category": "PROTEÍNAS",
    "priceNum": "157.90",
    "title": "WHEY 100% MAX TITANIUM 900G POTE - CHOCOLATE",
    "image": "img/products/p11.jpg",
    "priceText": "R$ 157,90"
  },
  {
    "id": "p12",
    "category": "PROTEÍNAS",
    "priceNum": "149.90",
    "title": "WHEY 100% MAX TITANIUM 900G REFIL - COOKIES E CREAM",
    "image": "img/products/p12.jpg",
    "priceText": "R$ 149,90"
  },
  {
    "id": "p13",
    "category": "PROTEÍNAS",
    "priceNum": "134.90",
    "title": "ISOLATE DEFINITION BODY ACTION 900G - BAUNILHA",
    "image": "img/products/p13.jpg",
    "priceText": "R$ 134,90"
  },
  {
    "id": "p14",
    "category": "PROTEÍNAS",
    "priceNum": "134.90",
    "title": "ISOLATE DEFINITION BODY ACTION 900G - CHOCOLATE",
    "image": "img/products/p14.jpg",
    "priceText": "R$ 134,90"
  },
  {
    "id": "p15",
    "category": "PROTEÍNAS",
    "priceNum": "134.90",
    "title": "ISOLATE DEFINITION BODY ACTION 900G - MORANGO",
    "image": "img/products/p15.jpg",
    "priceText": "R$ 134,90"
  },
  {
    "id": "p16",
    "category": "PRÉ-TREINOS",
    "priceNum": "59.90",
    "title": "PRE TREINO WORKOUT PANIC ADAPTOGEN 150G - LIMONADA",
    "image": "img/products/p16.jpg",
    "priceText": "R$ 59,90"
  },
  {
    "id": "p17",
    "category": "PRÉ-TREINOS",
    "priceNum": "59.90",
    "title": "PRE TREINO WORKOUT PANIC ADAPTOGEN 150G - MAÇA VERDE",
    "image": "img/products/p17.jpg",
    "priceText": "R$ 59,90"
  },
  {
    "id": "p18",
    "category": "PRÉ-TREINOS",
    "priceNum": "104.90",
    "title": "PRE TREINO WORKOUT PANIC ADAPTOGEN 300G - ABACAXI",
    "image": "img/products/p18.jpg",
    "priceText": "R$ 104,90"
  },
  {
    "id": "p19",
    "category": "PRÉ-TREINOS",
    "priceNum": "119.90",
    "title": "PRE TREINO HORUS POTE 300G MAX TITANIUM - CITRUS",
    "image": "img/products/p19.jpg",
    "priceText": "R$ 119,90"
  },
  {
    "id": "p20",
    "category": "PRÉ-TREINOS",
    "priceNum": "119.90",
    "title": "PRE TREINO HORUS POTE 300G MAX TITANIUM - BLUE ICE",
    "image": "img/products/p20.jpg",
    "priceText": "R$ 119,90"
  },
  {
    "id": "p21",
    "category": "PRÉ-TREINOS",
    "priceNum": "104.90",
    "title": "PRE TREINO WORKOUT PANIC ADAPTOGEN 300G - MELANCIA",
    "image": "img/products/p21.jpg",
    "priceText": "R$ 104,90"
  },
  {
    "id": "p22",
    "category": "CREATINA",
    "priceNum": "69.90",
    "title": "CREATINA DARKNESS MONOHYDRATE INTEGRAL MEDICA 300G",
    "image": "img/products/p22.jpg",
    "priceText": "R$ 69,90"
  },
  {
    "id": "p23",
    "category": "CREATINA",
    "priceNum": "69.90",
    "title": "CREATINA MAX TITANIUM 300G",
    "image": "img/products/p23.jpg",
    "priceText": "R$ 69,90"
  },
  {
    "id": "p24",
    "category": "CREATINA",
    "priceNum": "74.90",
    "title": "CREATINA MONOHIDRATADA DUX POTE 300G",
    "image": "img/products/p24.jpg",
    "priceText": "R$ 74,90"
  },
  {
    "id": "p25",
    "category": "TERMOGÊNICOS",
    "priceNum": "89.90",
    "title": "2HOT POTE 200G MAX TITANIUM - TANGERINA",
    "image": "img/products/p25.jpg",
    "priceText": "R$ 89,90"
  },
  {
    "id": "p26",
    "category": "TERMOGÊNICOS",
    "priceNum": "49.90",
    "title": "THERMA PRO HARDCORE INTEGRAL MEDICA 60 CAPS",
    "image": "img/products/p26.jpg",
    "priceText": "R$ 49,90"
  },
  {
    "id": "p27",
    "category": "TERMOGÊNICOS",
    "priceNum": "74.90",
    "title": "CAFEINA DUX POTE 90 CAPS 67G",
    "image": "img/products/p27.jpg",
    "priceText": "R$ 74,90"
  },
  {
    "id": "p28",
    "category": "PASTAS DE AMENDOIM",
    "priceNum": "67.90",
    "title": "PASTA DE AMENDOIM DR PEANUT 600G - AVELA",
    "image": "img/products/p28.jpg",
    "priceText": "R$ 67,90"
  },
  {
    "id": "p29",
    "category": "PASTAS DE AMENDOIM",
    "priceNum": "67.90",
    "title": "PASTA DE AMENDOIM DR PEANUT 600G - BOMBOM ITALIANO",
    "image": "img/products/p29.jpg",
    "priceText": "R$ 67,90"
  },
  {
    "id": "p30",
    "category": "PASTAS DE AMENDOIM",
    "priceNum": "67.90",
    "title": "PASTA DE AMENDOIM DR PEANUT 600G - COOKIES E CREAM",
    "image": "img/products/p30.jpg",
    "priceText": "R$ 67,90"
  },
  {
    "id": "p31",
    "category": "PASTAS DE AMENDOIM",
    "priceNum": "67.90",
    "title": "PASTA DE AMENDOIM DR PEANUT 600G - DOCE DE LEITE",
    "image": "img/products/p31.jpg",
    "priceText": "R$ 67,90"
  },
  {
    "id": "p32",
    "category": "PASTAS DE AMENDOIM",
    "priceNum": "59.90",
    "title": "PASTA DE AMENDOIM 450G LA GANEXA - MOUSSE BRIGADEIRO",
    "image": "img/products/p32.jpg",
    "priceText": "R$ 59,90"
  },
  {
    "id": "p33",
    "category": "PASTAS DE AMENDOIM",
    "priceNum": "59.90",
    "title": "PASTA DE AMENDOIM 450G LA GANEXA - PISTACHE",
    "image": "img/products/p33.jpg",
    "priceText": "R$ 59,90"
  },
  {
    "id": "p34",
    "category": "PASTAS DE AMENDOIM",
    "priceNum": "59.90",
    "title": "PASTA DE AMENDOIM 450G LA GANEXA - CARAMELO E FLOR DE SAL",
    "image": "img/products/p34.jpg",
    "priceText": "R$ 59,90"
  },
  {
    "id": "p35",
    "category": "PASTAS DE AMENDOIM",
    "priceNum": "44.90",
    "title": "PASTA DE AMENDOIM 450G LA GANEXA - CHOCOLATE CROCANTE",
    "image": "img/products/p35.jpg",
    "priceText": "R$ 44,90"
  },
  {
    "id": "p36",
    "category": "PASTAS DE AMENDOIM",
    "priceNum": "44.90",
    "title": "PASTA DE AMENDOIM 450G LA GANEXA - LEITINHO",
    "image": "img/products/p36.jpg",
    "priceText": "R$ 44,90"
  },
  {
    "id": "p37",
    "category": "PASTAS DE AMENDOIM",
    "priceNum": "67.90",
    "title": "PASTA DE AMENDOIM DR PEANUT 600G - BROWNIE",
    "image": "img/products/p37.jpg",
    "priceText": "R$ 67,90"
  },
  {
    "id": "p38",
    "category": "SNACKS E GÉIS",
    "priceNum": "9.90",
    "title": "BARRA WHEY GREGO NUTRATA 40G C/12 - HAVANNA DULCE DE LECHE BANOFFEE",
    "image": "img/products/p38.jpg",
    "priceText": "R$ 9,90"
  },
  {
    "id": "p39",
    "category": "SNACKS E GÉIS",
    "priceNum": "14.90",
    "title": "BARRA PROTOBAR 70G C/9 NUTRATA - BROWNIE CHOCOLAT COM DOCE DE LEITE",
    "image": "img/products/p39.jpg",
    "priceText": "R$ 14,90"
  },
  {
    "id": "p40",
    "category": "SNACKS E GÉIS",
    "priceNum": "14.90",
    "title": "BARRA PROTOBAR 70G C/9 NUTRATA - DOCE DE LEITE LEGITIMO",
    "image": "img/products/p40.jpg",
    "priceText": "R$ 14,90"
  },
  {
    "id": "p41",
    "category": "SNACKS E GÉIS",
    "priceNum": "14.90",
    "title": "BARRA CRISP INTEGRAL MEDICA 45G C/12 - PEANUT BUTTER",
    "image": "img/products/p41.jpg",
    "priceText": "R$ 14,90"
  },
  {
    "id": "p42",
    "category": "SNACKS E GÉIS",
    "priceNum": "2.90",
    "title": "GO RECOVERY GEL 30G ATLHETICA DISPLAY C/10 UNIDADES - MORANGO",
    "image": "img/products/p42.jpg",
    "priceText": "R$ 2,90"
  },
  {
    "id": "p43",
    "category": "SNACKS E GÉIS",
    "priceNum": "3.90",
    "title": "GO! ENERGY NOW GEL 30G ATLHETICA DISPLAY C/10 UNIDADES - LARANJA COM ACEROLA",
    "image": "img/products/p43.jpg",
    "priceText": "R$ 3,90"
  },
  {
    "id": "p44",
    "category": "SNACKS E GÉIS",
    "priceNum": "14.90",
    "title": "BARRA CRISP INTEGRAL MEDICA 45G C/12 - COOKIES AND CREAM",
    "image": "img/products/p44.jpg",
    "priceText": "R$ 14,90"
  },
  {
    "id": "p45",
    "category": "SNACKS E GÉIS",
    "priceNum": "14.90",
    "title": "BARRA CRISP INTEGRAL MEDICA 45G C/12 - DUO CRUNCH",
    "image": "img/products/p45.jpg",
    "priceText": "R$ 14,90"
  },
  {
    "id": "p46",
    "category": "SNACKS E GÉIS",
    "priceNum": "3.90",
    "title": "ENERGEL BLACK 30G SACHE BODY ACTION C/10 - UVA",
    "image": "img/products/p46.jpg",
    "priceText": "R$ 3,90"
  },
  {
    "id": "p47",
    "category": "SNACKS E GÉIS",
    "priceNum": "14.90",
    "title": "BARRA CRISP INTEGRAL MEDICA 45G C/12 - CREME DE COCO",
    "image": "img/products/p47.jpg",
    "priceText": "R$ 14,90"
  },
  {
    "id": "p48",
    "category": "SNACKS E GÉIS",
    "priceNum": "14.90",
    "title": "BARRA CRISP INTEGRAL MEDICA 45G C/12 - BROWNIE DE CHOCOLATE",
    "image": "img/products/p48.jpg",
    "priceText": "R$ 14,90"
  },
  {
    "id": "p49",
    "category": "SNACKS E GÉIS",
    "priceNum": "3.90",
    "title": "ENERGEL BLACK 30G SACHE BODY ACTION C/10 - FRUTAS VERMELHAS",
    "image": "img/products/p49.jpg",
    "priceText": "R$ 3,90"
  },
  {
    "id": "p50",
    "category": "SNACKS E GÉIS",
    "priceNum": "9.90",
    "title": "BARRA WHEY GREGO NUTRATA 40G C/12 - BEIJINHO",
    "image": "img/products/p50.jpg",
    "priceText": "R$ 9,90"
  },
  {
    "id": "p51",
    "category": "SNACKS E GÉIS",
    "priceNum": "9.90",
    "title": "BARRA WHEY GREGO NUTRATA 40G C/12 - BRIGADEIRO",
    "image": "img/products/p51.jpg",
    "priceText": "R$ 9,90"
  },
  {
    "id": "p52",
    "category": "SNACKS E GÉIS",
    "priceNum": "9.90",
    "title": "BARRA WHEY GREGO NUTRATA 40G C/12 - MORANGO CHANTIL",
    "image": "img/products/p52.jpg",
    "priceText": "R$ 9,90"
  },
  {
    "id": "p53",
    "category": "SNACKS E GÉIS",
    "priceNum": "3.90",
    "title": "ENERGEL BLACK 30G SACHE BODY ACTION C/10 - MORANGO",
    "image": "img/products/p53.jpg",
    "priceText": "R$ 3,90"
  },
  {
    "id": "p54",
    "category": "HIPERCALÓRICOS",
    "priceNum": "119.90",
    "title": "HIPERCALORICO MAX TITANIUM 3 KG REFIL - BAUNILHA",
    "image": "img/products/p54.jpg",
    "priceText": "R$ 119,90"
  },
  {
    "id": "p55",
    "category": "HIPERCALÓRICOS",
    "priceNum": "119.90",
    "title": "HIPERCALORICO MAX TITANIUM 3 KG REFIL - CHOCOLATE",
    "image": "img/products/p55.jpg",
    "priceText": "R$ 119,90"
  },
  {
    "id": "p56",
    "category": "HIPERCALÓRICOS",
    "priceNum": "119.90",
    "title": "HIPERCALORICO MAX TITANIUM 3 KG REFIL - MORANGO",
    "image": "img/products/p56.jpg",
    "priceText": "R$ 119,90"
  },
  {
    "id": "p57",
    "category": "ACESSÓRIOS",
    "priceNum": "17.90",
    "title": "COQUETELEIRA SHAKER BODY ACTION 600 ML ROSA",
    "image": "img/products/p57.jpg",
    "priceText": "R$ 17,90"
  },
  {
    "id": "p58",
    "category": "ACESSÓRIOS",
    "priceNum": "44.90",
    "title": "COQUETELEIRA TERMICA CAMPEOES MAX TITANIUM 700 ML",
    "image": "img/products/p58.jpg",
    "priceText": "R$ 44,90"
  },
  {
    "id": "p59",
    "category": "ACESSÓRIOS",
    "priceNum": "17.90",
    "title": "COQUETELEIRA AZUL BODY ACTION NUTRI SCIENCE",
    "image": "img/products/p59.jpg",
    "priceText": "R$ 17,90"
  },
  {
    "id": "p60",
    "category": "ACESSÓRIOS",
    "priceNum": "17.90",
    "title": "COQUETELEIRA ROXA COLAGENO BODY ACTION",
    "image": "img/products/p60.jpg",
    "priceText": "R$ 17,90"
  },
  {
    "id": "p61",
    "category": "ACESSÓRIOS",
    "priceNum": "17.90",
    "title": "COQUETELEIRA CRISTAL ALL DAY 400 ML MAX TITANIUM",
    "image": "img/products/p61.jpg",
    "priceText": "R$ 17,90"
  },
  {
    "id": "v08",
    "category": "ACESSÓRIOS",
    "priceNum": "15.90",
    "title": "COQUETELEIRA SHAKER VINIE PERFORMANCE",
    "image": "img/products/v08.png",
    "priceText": "R$ 15,90"
  },
  {
    "id": "p62",
    "category": "ELETRÓLITOS",
    "priceNum": "7.90",
    "title": "REPOSITOR DE ELETRÓLITOS LIQUIDZ SACHÊ 5G - SABOR: LIMONADA TROPICAL",
    "image": "img/products/p62.jpg",
    "priceText": "R$ 7,90"
  },
  {
    "id": "p63",
    "category": "ELETRÓLITOS",
    "priceNum": "7.90",
    "title": "REPOSITOR DE ELETRÓLITOS LIQUIDZ SACHÊ 5G - SABOR: MORANGO C/ KIWI",
    "image": "img/products/p63.jpg",
    "priceText": "R$ 7,90"
  },
  {
    "id": "p64",
    "category": "ELETRÓLITOS",
    "priceNum": "7.90",
    "title": "REPOSITOR DE ELETRÓLITOS LIQUIDZ SACHÊ 5G - SABOR: MELANCIA C/ ROMÃ",
    "image": "img/products/p64.jpg",
    "priceText": "R$ 7,90"
  },
  {
    "id": "p65",
    "category": "ELETRÓLITOS",
    "priceNum": "7.90",
    "title": "REPOSITOR DE ELETRÓLITOS LIQUIDZ SACHÊ 5G - SABOR: MARACUJÁ C/ MORANGO",
    "image": "img/products/p65.jpg",
    "priceText": "R$ 7,90"
  },
  {
    "id": "p66",
    "category": "VITAMINAS",
    "priceNum": "47.90",
    "title": "MELATONINA 30 ML OCEAN DROP",
    "image": "img/products/p66.jpg",
    "priceText": "R$ 47,90"
  },
  {
    "id": "v07",
    "category": "VITAMINAS",
    "priceNum": "89.90",
    "title": "BIOTINA BARÃO MEN LINE - 30 CÁPSULAS",
    "image": "img/products/v07.png",
    "priceText": "R$ 89,90"
  },
  {
    "id": "p67",
    "category": "TERMOGÊNICOS",
    "priceNum": "29.90",
    "title": "THERMO FLAME 60 CAPS BLACK SKULL",
    "image": "img/products/p67.jpg",
    "priceText": "R$ 29,90"
  },
  {
    "id": "p68",
    "category": "VITAMINAS",
    "priceNum": "34.90",
    "title": "TREONATO SUPRA 60 CAPS 421 MG HERBAMED",
    "image": "img/products/p68.jpg",
    "priceText": "R$ 34,90"
  },
  {
    "id": "p69",
    "category": "TERMOGÊNICOS",
    "priceNum": "41.90",
    "title": "CAFEINA HERBAMED 60CAPS 200MG",
    "image": "img/products/p69.jpg",
    "priceText": "R$ 41,90"
  },
  {
    "id": "p70",
    "category": "TERMOGÊNICOS",
    "priceNum": "38.90",
    "title": "CAFEINA 200 MG 60 CAPSULAS BODY ACTION",
    "image": "img/products/p70.jpg",
    "priceText": "R$ 38,90"
  },
  {
    "id": "p71",
    "category": "VITAMINAS",
    "priceNum": "44.90",
    "title": "OMEGA 3 HERBAMED 60CAPS 1000MG",
    "image": "img/products/p71.jpg",
    "priceText": "R$ 44,90"
  },
  {
    "id": "p72",
    "category": "SNACKS E GÉIS",
    "priceNum": "14.90",
    "title": "BARRA CRISP INTEGRAL MEDICA 45G C/12 - OVOMALTINE",
    "image": "img/products/p72.jpg",
    "priceText": "R$ 14,90"
  },
  {
    "id": "p73",
    "category": "VITAMINAS",
    "priceNum": "29.90",
    "title": "VITAMINA C HERBAMED 60 CAPS",
    "image": "img/products/p73.jpg",
    "priceText": "R$ 29,90"
  },
  {
    "id": "p74",
    "category": "VITAMINAS",
    "priceNum": "19.90",
    "title": "VITAMINA D3 HERBAMED 60 CAPS",
    "image": "img/products/p74.jpg",
    "priceText": "R$ 19,90"
  },
  {
    "id": "p75",
    "category": "ACESSÓRIOS",
    "priceNum": "37.90",
    "title": "BALANÇA DIGITAL INTEGRAL MEDICA",
    "image": "img/products/p75.jpg",
    "priceText": "R$ 37,90"
  },
  {
    "id": "p76",
    "category": "PRÉ-TREINOS",
    "priceNum": "4.90",
    "title": "PRE TREINO NUCLEAR RUSH EM GEL 25G CAIXA C/ 10UN BODY ACTION - FRUTAS VERMELHAS",
    "image": "img/products/p76.jpg",
    "priceText": "R$ 4,90"
  },
  {
    "id": "p77",
    "category": "PRÉ-TREINOS",
    "priceNum": "4.90",
    "title": "PRE TREINO NUCLEAR RUSH EM GEL 25G CAIXA C/ 10UN BODY ACTION - GUARANÁ",
    "image": "img/products/p77.jpg",
    "priceText": "R$ 4,90"
  },
  {
    "id": "p78",
    "category": "PRÉ-TREINOS",
    "priceNum": "69.90",
    "title": "PRE-NIGHT 200G - BODY ACTION - GUARANÁ COM AÇAÍ",
    "image": "img/products/p78.jpg",
    "priceText": "R$ 69,90"
  },
  {
    "id": "p79",
    "category": "VITAMINAS",
    "priceNum": "23.90",
    "title": "MELATONINA SUPRA 60CAPS HERBAMED",
    "image": "img/products/p79.jpg",
    "priceText": "R$ 23,90"
  },
  {
    "id": "p80",
    "category": "PROTEÍNAS",
    "priceNum": "99.90",
    "title": "PROTEINA EM PÓ UEVO NATUROVOS 1KG - MORANGO",
    "image": "img/products/p80.png",
    "priceText": "R$ 99,90"
  },
  {
    "id": "p81",
    "category": "SNACKS E GÉIS",
    "priceNum": "14.90",
    "title": "BARRA CHARGE PROTEIN NESTLÉ 12U - NUTRATA",
    "image": "img/products/p81.jpg",
    "priceText": "R$ 14,90"
  },
  {
    "id": "p82",
    "category": "PROTEÍNAS",
    "priceNum": "149.90",
    "title": "100% WHEY DOUBLE TASTY POTE 900G MAX TITANIUM - MORANGO",
    "image": "img/products/p82.jpg",
    "priceText": "R$ 149,90"
  },
  {
    "id": "p83",
    "category": "PROTEÍNAS",
    "priceNum": "149.90",
    "title": "100% WHEY DOUBLE TASTY POTE 900G MAX TITANIUM - BAUNILHA",
    "image": "img/products/p83.jpg",
    "priceText": "R$ 149,90"
  },
  {
    "id": "p84",
    "category": "PROTEÍNAS",
    "priceNum": "194.90",
    "title": "CARNIBOL DARKNESS 900G - BLUEBERRY",
    "image": "img/products/p84.jpg",
    "priceText": "R$ 194,90"
  },
  {
    "id": "p85",
    "category": "PROTEÍNAS",
    "priceNum": "194.90",
    "title": "BEEF PROTEIN 900G - INTEGRAL MEDICA - FRUTAS VERMELHAS",
    "image": "img/products/p85.png",
    "priceText": "R$ 194,90"
  },
  {
    "id": "p86",
    "category": "SNACKS E GÉIS",
    "priceNum": "14.90",
    "title": "BARRA DARK CHARGE PROTEIN NESTLÉ 12U - NUTRATA",
    "image": "img/products/p86.jpg",
    "priceText": "R$ 14,90"
  },
  {
    "id": "p87",
    "category": "SNACKS E GÉIS",
    "priceNum": "3.90",
    "title": "ENERGEL BLACK 30G SACHE BODY ACTION C/10 - GUARANA COM ACAI",
    "image": "img/products/p87.jpg",
    "priceText": "R$ 3,90"
  },
  {
    "id": "p88",
    "category": "SNACKS E GÉIS",
    "priceNum": "9.90",
    "title": "BARRA WHEY GREGO NUTRATA 40G C/12 - HAVANNA DULCE DE LECHE LEGITIMO",
    "image": "img/products/p88.jpg",
    "priceText": "R$ 9,90"
  },
  {
    "id": "p89",
    "category": "ELETRÓLITOS",
    "priceNum": "7.90",
    "title": "REPOSITOR DE ELETRÓLITOS LIQUIDZ SACHÊ 5G - SABOR: JABUTICABA",
    "image": "img/products/p89.jpg",
    "priceText": "R$ 7,90"
  },
  {
    "id": "p90",
    "category": "ELETRÓLITOS",
    "priceNum": "7.90",
    "title": "REPOSITOR DE ELETRÓLITOS LIQUIDZ SACHÊ 5G - SABOR: TANGERINA",
    "image": "img/products/p90.jpg",
    "priceText": "R$ 7,90"
  },
  {
    "id": "p91",
    "category": "PROTEÍNAS",
    "priceNum": "99.90",
    "title": "NUTRI WHEY PROTEIN POTE 907G - INTEGRALMEDICA - CHOCOLATE",
    "image": "img/products/p91.jpg",
    "priceText": "R$ 99,90"
  },
  {
    "id": "p92",
    "category": "PROTEÍNAS",
    "priceNum": "94.90",
    "title": "NUTRI WHEY PROTEIN REFIL CONCENTRADO 907G ORIGINAL - INTEGRALMEDICA - BAUNILHA",
    "image": "img/products/p92.jpg",
    "priceText": "R$ 94,90"
  },
  {
    "id": "p93",
    "category": "PROTEÍNAS",
    "priceNum": "58.90",
    "title": "ALBUMINA PROTEINA EM PÓ 420G - UÊVO - CHOCOLATE",
    "image": "img/products/p93.jpg",
    "priceText": "R$ 58,90"
  },
  {
    "id": "p94",
    "category": "TERMOGÊNICOS",
    "priceNum": "7.90",
    "title": "SUPERCOFFEE 3.0 DOCE DE LEITE TO GO STICK",
    "image": "img/products/p94.jpg",
    "priceText": "R$ 7,90"
  },
  {
    "id": "p95",
    "category": "TERMOGÊNICOS",
    "priceNum": "7.90",
    "title": "SUPERCOFFEE 3.0 LÍNGUA DE GATO TO GO STICK",
    "image": "img/products/p95.jpg",
    "priceText": "R$ 7,90"
  },
  {
    "id": "p96",
    "category": "TERMOGÊNICOS",
    "priceNum": "129.90",
    "title": "SUPERCOFFEE 3.0 ORIGINAL 220G",
    "image": "img/products/p96.jpg",
    "priceText": "R$ 129,90"
  },
  {
    "id": "p97",
    "category": "TERMOGÊNICOS",
    "priceNum": "129.90",
    "title": "SUPERCOFFEE 3.0 VANILLA LATTE 220G",
    "image": "img/products/p97.jpg",
    "priceText": "R$ 129,90"
  },
  {
    "id": "p98",
    "category": "TERMOGÊNICOS",
    "priceNum": "199.90",
    "title": "SUPERCOFFEE 3.0 CHOCONILLA 380G",
    "image": "img/products/p98.jpg",
    "priceText": "R$ 199,90"
  },
  {
    "id": "p99",
    "category": "TERMOGÊNICOS",
    "priceNum": "7.90",
    "title": "SUPERCOFFEE 3.0 CHOCONILLA TO GO STICK",
    "image": "img/products/p99.jpg",
    "priceText": "R$ 7,90"
  }
];

document.addEventListener('DOMContentLoaded', () => {
    // LÓGICA DE DESEJOS
    const wishlistKeys = 'NF_WISHLIST';
    const WISHLIST_EXPIRACY = 30 * 24 * 60 * 60 * 1000;
    let wishlistItems = JSON.parse(localStorage.getItem(wishlistKeys)) || [];
    const now = Date.now();
    wishlistItems = wishlistItems.filter(item => now < item.expiresAt);
    localStorage.setItem(wishlistKeys, JSON.stringify(wishlistItems));

    // LÓGICA DO CARRINHO
    const cartKeys = 'NF_CART';
    let cartItems = JSON.parse(localStorage.getItem(cartKeys)) || [];

    const cartCountEl = document.getElementById('cartCount');
    const wishlistCountEl = document.getElementById('wishlistCount');
    const cartSidebar = document.getElementById('cartSidebar');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const overlay = document.getElementById('globalOverlay');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const wishlistItemsContainer = document.getElementById('wishlistItemsContainer');
    const cartTotalPriceEl = document.getElementById('cartTotalPrice');
    const couponInput = document.getElementById('couponInput');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    
    let productCards = []; // Vai ser preenchido após renderizar

    const formatPrice = (p) => parseFloat(p).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    if (applyCouponBtn && couponInput) {
        couponInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });

        applyCouponBtn.addEventListener('click', () => {
            const codigo = couponInput.value.trim().toLowerCase();
            if (!codigo) {
                alert('Digite um código de cupom válido.');
                return;
            }
            
            const foundCoupon = CUPONS_DB.find(c => c.codigo === codigo);
            if (foundCoupon) {
                appliedCoupon = foundCoupon;
                // alert(`Cupom ${codigo.toUpperCase()} aplicado com sucesso! Desconto de ${foundCoupon.desconto}%`);
                couponInput.value = '';
                renderCart();
            } else {
                alert('Cupom inválido ou expirado.');
            }
        });
    }

    const updateBadges = () => {
        cartCountEl.textContent = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        wishlistCountEl.textContent = wishlistItems.length;

        if(productCards.length > 0){
           productCards.forEach(card => {
               const id = card.getAttribute('data-id');
               const heartBtn = card.querySelector('.wishlist-btn');
               if(!heartBtn) return;
               const icon = heartBtn.querySelector('i');
               
               if(wishlistItems.find(w => w.id === id)){
                   heartBtn.classList.add('active');
                   icon.classList.remove('fa-regular');
                   icon.classList.add('fa-solid');
               } else {
                   heartBtn.classList.remove('active');
                   icon.classList.add('fa-regular');
                   icon.classList.remove('fa-solid');
               }
           });
        }
    };

    const toggleWishlist = (id, title, price, category, imageUrlHtml) => {
        const index = wishlistItems.findIndex(w => w.id === id);
        if(index > -1){
            wishlistItems.splice(index, 1);
        } else {
            wishlistItems.push({
                id, title, price, category, imageUrlHtml,
                expiresAt: Date.now() + WISHLIST_EXPIRACY
            });
        }
        localStorage.setItem(wishlistKeys, JSON.stringify(wishlistItems));
        updateBadges();
        renderWishlist();
    };

    const addToCart = (id, title, price, category, imageUrlHtml) => {
        const numericPrice = parseFloat(price);
        const exists = cartItems.find(c => c.id === id);
        if(exists){
            exists.quantity += 1;
        } else {
            cartItems.push({ id, title, price: numericPrice, quantity: 1, category, imageUrlHtml });
        }
        localStorage.setItem(cartKeys, JSON.stringify(cartItems));
        updateBadges();
        renderCart();
        
        cartSidebar.classList.add('open');
        overlay.classList.add('open');
    };

    window.updateCartQuantity = (id, delta) => {
        const item = cartItems.find(c => c.id === id);
        if(!item) return;
        item.quantity += delta;
        if(item.quantity <= 0) {
            cartItems = cartItems.filter(c => c.id !== id);
        }
        localStorage.setItem(cartKeys, JSON.stringify(cartItems));
        updateBadges();
        renderCart();
    };

    window.removeWishlist = (id) => {
        wishlistItems = wishlistItems.filter(w => w.id !== id);
        localStorage.setItem(wishlistKeys, JSON.stringify(wishlistItems));
        updateBadges();
        renderWishlist();
    };

    // Hero Buy Buttons (se existirem na página)
    const heroBuyBtns = document.querySelectorAll('.hero-buy-btn');
    if(heroBuyBtns.length > 0){
        heroBuyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = btn.getAttribute('data-id');
                const title = btn.getAttribute('data-title');
                const price = btn.getAttribute('data-price');
                const category = btn.getAttribute('data-category');
                addToCart(id, title, price, category, '<div class="image-placeholder"><i class="fa-solid fa-bolt"></i></div>');
            });
        });
    }

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if(cartItems.length === 0){
            cartItemsContainer.innerHTML = '<p style="color:#A0A0A0; text-align:center; margin-top:20px;">O seu carrinho está vazio.</p>';
            cartTotalPriceEl.innerHTML = 'R$ 0,00';
            return;
        }

        cartItems.forEach(item => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="sidebar-item">
                    <div class="sidebar-item-img">${item.imageUrlHtml || ''}</div>
                    <div class="sidebar-item-info">
                        <h5>${item.title}</h5>
                        <span class="price">${formatPrice(item.price)}</span>
                        <div class="qty-controls">
                            <button onclick="updateCartQuantity('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartQuantity('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            `;
        });

        if (appliedCoupon) {
            const discountValue = total * (appliedCoupon.desconto / 100);
            const totalWithDiscount = total - discountValue;
            cartTotalPriceEl.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: flex-end;">
                    <div><s style="font-size: 0.8em; color: #aaa; margin-right: 8px;">${formatPrice(total)}</s><span style="color: #2ecc71;">${formatPrice(totalWithDiscount)}</span></div>
                    <div style="font-size: 0.7em; color: #39FF14; margin-top: 4px;">Cupom ${appliedCoupon.codigo.toUpperCase()} aplicado (-${appliedCoupon.desconto}%)</div>
                </div>
            `;
        } else {
            cartTotalPriceEl.textContent = formatPrice(total);
        }
    };

    const renderWishlist = () => {
        wishlistItemsContainer.innerHTML = '';
        if(wishlistItems.length === 0){
            wishlistItemsContainer.innerHTML = '<p style="color:#A0A0A0; text-align:center; margin-top:20px;">Sua lista de desejos está vazia.</p>';
            return;
        }
        wishlistItems.forEach(item => {
            wishlistItemsContainer.innerHTML += `
                <div class="sidebar-item">
                    <div class="sidebar-item-img">${item.imageUrlHtml || ''}</div>
                    <div class="sidebar-item-info">
                        <h5>${item.title}</h5>
                        <span class="price">R$ ${item.price.replace('.', ',')}</span>
                        <div class="wishlist-actions" style="margin-top:10px;">
                            <button onclick="removeWishlist('${item.id}')" style="background:transparent; border:none; color:#ff4757; cursor:pointer;"><i class="fa-solid fa-trash"></i> Remover</button>
                        </div>
                    </div>
                </div>
            `;
        });
    };

    document.getElementById('openCartBtn').addEventListener('click', () => {
        renderCart();
        cartSidebar.classList.add('open');
        overlay.classList.add('open');
    });

    document.getElementById('openWishlistBtn').addEventListener('click', () => {
        renderWishlist();
        wishlistSidebar.classList.add('open');
        overlay.classList.add('open');
    });

    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        wishlistSidebar.classList.remove('open');
        overlay.classList.remove('open');
    });

    document.querySelectorAll('.close-sidebar').forEach(btn => {
        btn.addEventListener('click', () => {
             cartSidebar.classList.remove('open');
             wishlistSidebar.classList.remove('open');
             overlay.classList.remove('open');
        });
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if(cartItems.length === 0) return alert('Seu carrinho está vazio!');
        let message = "Olá! Gostaria de finalizar o seguinte pedido:\n\n";
        let totalOriginal = 0;
        cartItems.forEach(i => {
            totalOriginal += i.price * i.quantity;
            message += `- ${i.quantity}x *${i.title}* (${formatPrice(i.price)})\n`;
        });

        if (appliedCoupon) {
            const discountValue = totalOriginal * (appliedCoupon.desconto / 100);
            const totalFinal = totalOriginal - discountValue;
            message += `\nSubtotal: ${formatPrice(totalOriginal)}\n`;
            message += `*Cupom utilizado:* ${appliedCoupon.codigo.toUpperCase()} (${appliedCoupon.desconto}% de desconto)\n`;
            message += `*TOTAL FINAL: ${formatPrice(totalFinal)}*\n\nComo podemos prosseguir com o pagamento e a entrega?`;
        } else {
            message += `\n*TOTAL: ${formatPrice(totalOriginal)}*\n\nComo podemos prosseguir com o pagamento e a entrega?`;
        }

        const whatsappNumber = "5517996821533";
        const encodedUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(encodedUrl, '_blank');
    });

    // CARROSSEL INICIAL (HERO)
    const track = document.getElementById('heroCarousel');
    if(track) {
        const slides = document.querySelectorAll('.hero-card');
        const dots = document.querySelectorAll('.hero-pagination .dot');
        let currentIndex = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        const updateCarousel = (index) => {
            currentTranslate = index * -100;
            prevTranslate = currentTranslate;
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            track.style.transform = `translateX(${currentTranslate}%)`;
            dots.forEach(d => d.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');
        };

        const getPositionX = (e) => {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        };

        const touchStart = (index) => {
            return (e) => {
                isDragging = true;
                startPos = getPositionX(e);
                animationID = requestAnimationFrame(animation);
                track.style.transition = 'none';
                track.style.cursor = 'grabbing';
                clearInterval(carouselInterval);
            };
        };

        const touchMove = (e) => {
            if(isDragging) {
                const currentPosition = getPositionX(e);
                const diff = currentPosition - startPos;
                const diffPercent = (diff / track.offsetWidth) * 100;
                currentTranslate = prevTranslate + diffPercent;
            }
        };

        const touchEnd = () => {
            isDragging = false;
            cancelAnimationFrame(animationID);
            track.style.cursor = 'grab';

            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -15 && currentIndex < slides.length - 1) currentIndex += 1;
            else if (movedBy > 15 && currentIndex > 0) currentIndex -= 1;

            updateCarousel(currentIndex);
            startAutoSlide();
        };

        const animation = () => {
            track.style.transform = `translateX(${currentTranslate}%)`;
            if (isDragging) requestAnimationFrame(animation);
        };

        let carouselInterval;
        const startAutoSlide = () => {
            if(slides.length > 1) {
                clearInterval(carouselInterval);
                carouselInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % slides.length;
                    updateCarousel(currentIndex);
                }, 5000);
            }
        };

        if(slides.length > 1) {
            track.style.cursor = 'grab';
            startAutoSlide();
            track.addEventListener('mousedown', touchStart(currentIndex));
            track.addEventListener('mousemove', touchMove);
            track.addEventListener('mouseup', touchEnd);
            track.addEventListener('mouseleave', () => { if(isDragging) touchEnd() });
            track.addEventListener('touchstart', touchStart(currentIndex), {passive: true});
            track.addEventListener('touchmove', touchMove, {passive: true});
            track.addEventListener('touchend', touchEnd);

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel(currentIndex);
                    startAutoSlide();
                });
            });
            
            const disableDrag = e => e.preventDefault();
            track.querySelectorAll('img, a, h2, p, button, span').forEach(el => {
                el.addEventListener('dragstart', disableDrag);
            });
        }
    }

    // BUSCA
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    let searchActive = false;

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchActive = !searchActive;
            if(searchActive) {
                searchInput.style.width = '160px';
                searchInput.style.padding = '6px 12px';
                searchInput.style.opacity = '1';
                searchInput.style.marginRight = '8px';
                searchInput.style.border = '1px solid var(--primary-neon)';
                searchInput.focus();
            } else {
                searchInput.style.width = '0';
                searchInput.style.padding = '0';
                searchInput.style.opacity = '0';
                searchInput.style.marginRight = '0';
                searchInput.style.border = '1px solid transparent';
                searchInput.value = '';
                filterProducts('');
            }
        });

        searchInput.addEventListener('input', (e) => {
            filterProducts(e.target.value.toLowerCase().trim());
        });
    }

    const filterProducts = (term) => {
        productCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            if(title.includes(term) || category.includes(term)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        document.querySelectorAll('.featured-section').forEach(section => {
            const cards = section.querySelectorAll('.product-card');
            const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
            if(visibleCards.length === 0 && term !== '') {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    };

    // ABAS DE CATEGORIA
    const categoryTabsLinks = document.querySelectorAll('.category-tabs a');
    categoryTabsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
             e.preventDefault();
             document.querySelectorAll('.category-tabs .tab').forEach(t=>t.classList.remove('active'));
             link.parentElement.classList.add('active');
             
             const targetId = link.getAttribute('href');
             if(targetId && targetId.startsWith('#')) {
                 const targetSection = document.querySelector(targetId);
                 if(targetSection) {
                     const yOffset = -75;
                     const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                     window.scrollTo({top: y, behavior: 'smooth'});
                 }
             }
        });
    });

    // SISTEMA DE ESTOQUE GOOGLE SHEETS E RENDERIZAÇÃO
    function parseCSV(csvText) {
        const lines = csvText.split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return null;
        
        const parseLine = (line) => {
            const result = [];
            let current = '';
            let inQuotes = false;
            for(let i=0; i<line.length; i++){
                const char = line[i];
                if(char === '"'){
                    inQuotes = !inQuotes;
                } else if(char === ',' && !inQuotes){
                    result.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            result.push(current);
            return result.map(s => s.trim());
        };

        const headers = parseLine(lines[0]).map(h => h.toLowerCase());
        const idIndex = headers.indexOf('id');
        const estoqueIndex = headers.indexOf('estoque');
        const nomeIndex = headers.indexOf('nome_produto') !== -1 ? headers.indexOf('nome_produto') : headers.indexOf('nome');
        const valorIndex = headers.indexOf('valor') !== -1 ? headers.indexOf('valor') : headers.indexOf('preco');
        const imagemIndex = headers.indexOf('imagem') !== -1 ? headers.indexOf('imagem') : headers.indexOf('url_imagem');
        const categoriaIndex = headers.indexOf('categoria');
        
        if(idIndex === -1) return null;

        const stockMap = {};

        for(let i=1; i<lines.length; i++) {
            const cols = parseLine(lines[i]);
            const cleanCol = (index) => index !== -1 && cols[index] ? cols[index] : '';

            const idCol = cleanCol(idIndex);
            const estoqueCol = estoqueIndex !== -1 ? cleanCol(estoqueIndex).toLowerCase() : 'sim';
            const nomeCol = cleanCol(nomeIndex);
            const valorCol = cleanCol(valorIndex);
            const imagemCol = cleanCol(imagemIndex);
            const categoriaCol = cleanCol(categoriaIndex);
            
            if(idCol) {
                stockMap[idCol] = (estoqueCol === 'sim' || estoqueCol === 's' || estoqueCol === 'true');
                
                let existingProds = PRODUTOS_DB.filter(p => p.id === idCol);
                
                // Update common attributes for all instances of this product
                if (existingProds.length > 0) {
                    existingProds.forEach(existingProd => {
                        existingProd.sortIndex = i;
                        if (nomeCol) existingProd.title = nomeCol;
                        if (valorCol) {
                            existingProd.priceText = valorCol.includes('R$') ? valorCol : `R$ ${valorCol}`;
                            let num = valorCol.replace(/[^\d,.-]/g, '').replace(',', '.');
                            if(num) existingProd.priceNum = num;
                        }
                        if (imagemCol) existingProd.image = imagemCol;
                    });
                }
                
                // Handle multiple categories if provided in CSV
                if (categoriaCol) {
                    let categories = categoriaCol.split(',').map(c => c.trim().toUpperCase());
                    categories.forEach(cat => {
                        let prodInCat = existingProds.find(p => p.category === cat);
                        if (!prodInCat) {
                            // If product is not in this category, add it
                            let num = valorCol.replace(/[^\d,.-]/g, '').replace(',', '.');
                            let titleToUse = nomeCol || (existingProds[0] ? existingProds[0].title : '');
                            let priceTextToUse = valorCol ? (valorCol.includes('R$') ? valorCol : `R$ ${valorCol}`) : (existingProds[0] ? existingProds[0].priceText : '');
                            let priceNumToUse = num || (existingProds[0] ? existingProds[0].priceNum : '0.00');
                            let imgToUse = imagemCol || (existingProds[0] ? existingProds[0].image : 'img/Logo2.png');
                            
                            if (titleToUse && priceTextToUse) {
                                PRODUTOS_DB.push({
                                    id: idCol,
                                    category: cat,
                                    priceNum: priceNumToUse,
                                    title: titleToUse,
                                    image: imgToUse, 
                                    priceText: priceTextToUse,
                                    sortIndex: i
                                });
                            }
                        }
                    });
                } else if (existingProds.length === 0 && nomeCol && valorCol) {
                    // New product without specific category
                    let num = valorCol.replace(/[^\d,.-]/g, '').replace(',', '.');
                    PRODUTOS_DB.push({
                        id: idCol,
                        category: "OUTROS",
                        priceNum: num || '0.00',
                        title: nomeCol,
                        image: imagemCol || 'img/Logo2.png', 
                        priceText: valorCol.includes('R$') ? valorCol : `R$ ${valorCol}`,
                        sortIndex: i
                    });
                }
            }
        }
        
        // Ordena o array oficial para refletir exatamente a ordem das linhas da planilha
        PRODUTOS_DB.sort((a, b) => {
            let indexA = a.sortIndex !== undefined ? a.sortIndex : 999999;
            let indexB = b.sortIndex !== undefined ? b.sortIndex : 999999;
            return indexA - indexB;
        });

        return stockMap;
    }

    function renderProducts(stockMap) {
        const container = document.getElementById('lista-produtos');
        if(!container) return;

        let html = '';
        
        // Mapeamento correto dos IDs das seções baseados nas abas
        const getCategoryId = (catName) => {
            const map = {
                "LINHA OFICIAL": "linha-oficial",
                "PROTEÍNAS": "proteinas",
                "PRÉ-TREINOS": "pre-treinos",
                "CREATINA": "creatina",
                "TERMOGÊNICOS": "termogenicos",
                "PASTAS DE AMENDOIM": "pastas-de-amendoim",
                "SNACKS E GÉIS": "snacks-e-geis",
                "HIPERCALÓRICOS": "hipercaloricos",
                "VITAMINAS": "vitaminas",
                "ACESSÓRIOS": "acessorios",
                "ELETRÓLITOS": "eletrolitos"
            };
            return map[catName] || catName.toLowerCase().replace(/ /g, '-');
        };

        let categories = [...new Set(PRODUTOS_DB.map(p => p.category))];
        
        // Garante que ACESSÓRIOS seja a última seção
        if (categories.includes("ACESSÓRIOS")) {
            categories = categories.filter(c => c !== "ACESSÓRIOS");
            categories.push("ACESSÓRIOS");
        }

        categories.forEach(category => {
            const catId = getCategoryId(category);
            
            html += `<section class="featured-section" id="${catId}" style="margin-top: 40px;">
                <div class="section-header">
                    <h3>${category}</h3>
                </div>
                <div class="product-grid">`;

            const prods = PRODUTOS_DB.filter(p => p.category === category);
            prods.forEach(p => {
                const hasStock = stockMap ? stockMap[p.id] !== false : true;
                
                const btnHtml = hasStock 
                    ? `<button class="add-btn"><i class="fa-solid fa-plus"></i></button>`
                    : `<button class="add-btn disabled" disabled style="background:#444; color:#999; cursor:not-allowed;"><i class="fa-solid fa-ban"></i></button>`;
                    
                const stockBadge = hasStock 
                    ? ''
                    : `<div class="out-of-stock-badge" style="position:absolute; top:10px; left:10px; background:#ff4757; color:#fff; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; z-index:2; text-transform:uppercase; letter-spacing:1px;">ESGOTADO</div>`;

                html += `<div class="product-card" data-category="${p.category}" data-id="${p.id}" data-price="${p.priceNum}" data-title="${p.title.replace(/"/g, '&quot;')}" style="position:relative;">
                    ${stockBadge}
                    <button class="wishlist-btn"><i class="fa-regular fa-heart"></i></button>
                    <div class="product-image">
                        <img alt="${p.title.replace(/"/g, '&quot;')}" src="${p.image}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;" />
                    </div>
                    <div class="product-info">
                        <span class="category">${p.category}</span>
                        <h4 class="product-title">${p.title}</h4>
                        <div class="product-bottom">
                            <span class="price">${p.priceText}</span>
                            ${btnHtml}
                        </div>
                    </div>
                </div>`;
            });
            
            html += `</div></section>`;
        });

        container.innerHTML = html;
        
        // Atualiza a variável global de cards para a pesquisa e badges funcionarem
        productCards = document.querySelectorAll('.product-card');
        
        attachProductEvents();
        updateBadges();
    }

    function attachProductEvents() {
        productCards.forEach(card => {
            const id = card.getAttribute('data-id');
            const title = card.getAttribute('data-title');
            const price = card.getAttribute('data-price');
            const category = card.getAttribute('data-category');
            const imagePlaceholderHtml = card.querySelector('.product-image').innerHTML;

            const wishBtn = card.querySelector('.wishlist-btn');
            if(wishBtn){
                wishBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    toggleWishlist(id, title, price, category, imagePlaceholderHtml);
                });
            }

            const addBtn = card.querySelector('.add-btn');
            if(addBtn && !addBtn.disabled){
                addBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    addToCart(id, title, price, category, imagePlaceholderHtml);
                });
            }
        });
    }

    async function loadStore() {
        renderProducts(null); // Renderiza inicial assuming em estoque
        
        if(URL_PLANILHA_GOOGLE.startsWith('http')) {
            try {
                // Adicionado cache-buster para forçar o navegador a pegar o CSV novo
                const cacheBuster = URL_PLANILHA_GOOGLE.includes('?') 
                    ? `&t=${Date.now()}` 
                    : `?t=${Date.now()}`;
                    
                const res = await fetch(URL_PLANILHA_GOOGLE + cacheBuster, { cache: 'no-store' });
                const csvText = await res.text();
                const stockMap = parseCSV(csvText);
                if(stockMap) {
                    renderProducts(stockMap);
                }
            } catch(e) {
                console.error("Erro ao carregar o estoque:", e);
            }
        }
    }

    async function loadCupons() {
        if(typeof URL_PLANILHA_CUPONS !== 'undefined' && URL_PLANILHA_CUPONS.startsWith('http')) {
            try {
                const cacheBuster = URL_PLANILHA_CUPONS.includes('?') 
                    ? `&t=${Date.now()}` 
                    : `?t=${Date.now()}`;
                    
                const res = await fetch(URL_PLANILHA_CUPONS + cacheBuster, { cache: 'no-store' });
                const csvText = await res.text();
                const lines = csvText.split('\n').filter(l => l.trim() !== '');
                if (lines.length > 0) {
                    const parseLine = (line) => {
                        const result = [];
                        let current = '';
                        let inQuotes = false;
                        for(let i=0; i<line.length; i++){
                            const char = line[i];
                            if(char === '"'){
                                inQuotes = !inQuotes;
                            } else if(char === ',' && !inQuotes){
                                result.push(current);
                                current = '';
                            } else {
                                current += char;
                            }
                        }
                        result.push(current);
                        return result.map(s => s.trim());
                    };

                    const headers = parseLine(lines[0]).map(h => h.toLowerCase());
                    const codigoIndex = headers.indexOf('codigo');
                    const descontoIndex = headers.indexOf('desconto');
                    
                    if(codigoIndex !== -1) {
                        const coupons = [];
                        for(let i=1; i<lines.length; i++) {
                            const cols = parseLine(lines[i]);
                            const cleanCol = (index) => index !== -1 && cols[index] ? cols[index] : '';

                            const codigo = cleanCol(codigoIndex).toLowerCase();
                            const descontoRaw = cleanCol(descontoIndex);
                            let descontoStr = descontoRaw.replace(/[^\d,.-]/g, '').replace(',', '.');
                            let desconto = parseFloat(descontoStr) || 5; 

                            if (codigo) {
                                coupons.push({ codigo, desconto });
                            }
                        }
                        if(coupons.length > 0) {
                            CUPONS_DB = coupons; // Sobrescreve com os valores da planilha
                        }
                    }
                }
            } catch(e) {
                console.error("Erro ao carregar cupons:", e);
            }
        }
    }

    loadCupons();
    loadStore();
});
