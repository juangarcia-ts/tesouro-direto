import SimulationImage from "../media/images/menu-simulation.jpeg";
import ProfileImage from "../media/images/menu-profile.jpeg";
import InvestimentsImage from "../media/images/menu-investiments.jpeg";
import AlertImage from "../media/images/menu-alerts.jpeg";
import SettingsImage from "../media/images/menu-settings.jpeg";
import AggressiveImage from "../media/images/profile-aggressive.jpeg";
import ModerateImage from "../media/images/profile-moderate.jpeg";
import ConservativeImage from "../media/images/profile-conservative.jpeg";

export const menuOptions = [
  {
    link: "/meus-titulos",
    title: "Meus Títulos",
    imageURL: InvestimentsImage
  },
  {
    link: "/meus-alertas",
    title: "Meus Alertas",
    imageURL: AlertImage
  },
  {
    link: "/simular-perfil",
    title: "Simular perfil",
    imageURL: ProfileImage
  },
  {
    link: "/simular-rendimentos",
    title: "Simular rendimentos",
    imageURL: SimulationImage
  },
  {
    link: "/minha-conta",
    title: "Minhas Configurações",
    imageURL: SettingsImage
  }
];

export const simulatorTabs = [
  {
    id: 0,
    name: "Tesouro Prefixado",
    interestRate: 8.05
  },
  {
    id: 1,
    name: "Tesouro Selic",
    interestRate: 6.5
  },
  {
    id: 2,
    name: "Tesouro IPCA+",
    interestRate: 5.43
  }
];

export const optionsRange = [
  {
    value: 1
  },
  {
    value: 2
  },
  {
    value: 3
  },
  {
    value: 6
  },
  {
    value: 12
  },
  {
    value: 24
  },
  {
    value: 60
  },
  {
    value: 120
  },
  {
    value: 240
  },
  {
    value: 360
  }
];

export const profiles = {
  A: {
    shortcut: "A",
    name: "Agressivo",
    image: AggressiveImage,
    summary:
      "O perfil agressivo é aquele que tem amplo conhecimento de mercado e assume correr altos riscos para conseguir grandes ganhos em suas operações.  Costumam aplicar mais da metade de seus recursos em produtos de renda variável, como day trade com alavancagem, ou em produtos considerados complexos, como opções estruturadas e COE.\n\nNeste tipo de perfil, ter equilíbrio emocional faz toda a diferença já que as chances de perdas são muito maiores do que no perfil conservador e moderado."
  },
  B: {
    shortcut: "B",
    name: "Moderado",
    image: ModerateImage,
    summary:
      "Este tipo de perfil preza por investimentos que proporcionem segurança ao seu capital, mas busca retornos acima da média e, por isso, aceita assumir certos riscos, diversificando sua carteira entre produtos de Renda Fixa, como Títulos Públicos e CDBs, e produtos de Renda Variável, como Fundo de Investimentos em Ações, Fundos Imobiliários, entre outros."
  },
  C: {
    shortcut: "C",
    name: "Conservador",
    image: ConservativeImage,
    summary:
      "O perfil conservador é aquele que, ao investir, coloca a segurança em primeiro lugar e se propõe a assumir os menores riscos possíveis.\n\nEle faz questão de sentir seguro e prefere colocar seu capital em um investimento que ele saiba quanto irá render no fim da aplicação, como os produtos de Renda Fixa (CDB, Tesouro Direto, Fundos de Renda Fixa, LCI, LCA, entre outros).\n\nOu seja, preferem uma rentabilidade a médio e longo prazo com proteção ao capital investido pelo FGC (Fundo Garantidor de Crédito) ao invés dos resultados de curto prazo, que oferecem mais riscos nas operações."
  }
};

export const quizQuestions = [
  {
    title: "Qual sua idade?",
    answers: [
      {
        text: "Até 25 anos",
        result: "A"
      },
      {
        text: "De 26 a 40 anos",
        result: "B"
      },
      {
        text: "De 41 a 64 anos",
        result: "B/C"
      },
      {
        text: "65 anos ou mais",
        result: "C"
      }
    ]
  },
  {
    title: "Como você avalia seu conhecimento sobre investimentos?",
    answers: [
      {
        text: "Não tenho conhecimento",
        result: "C"
      },
      {
        text: "Razoável",
        result: "B/C"
      },
      {
        text: "Bom",
        result: "A/B"
      },
      {
        text: "Excelente",
        result: "A"
      }
    ]
  },
  {
    title: "Qual seu objetivo ao investir?",
    answers: [
      {
        text:
          "Preservar capital: Corrigir os investimentos pela variação da inflação",
        result: "C"
      },
      {
        text: "Acumular recursos: Obter rentabilidade acima da inflação",
        result: "B"
      },
      {
        text:
          "Especular: Ter alta valorização, correndo riscos maiores, se necessário",
        result: "A"
      }
    ]
  },
  {
    title: "Por quanto tempo você deseja manter o seu investimento?",
    answers: [
      {
        text: "Menos de 1 ano - Curto prazo",
        result: "A"
      },
      {
        text: "Entre 1 e 3 anos - Médio prazo",
        result: "A/B"
      },
      {
        text: "Entre 3 e 5 anos - Médio-longo prazo",
        result: "B/C"
      },
      {
        text: "Acima de 5 anos - Longo prazo",
        result: "C"
      }
    ]
  },
  {
    title:
      "Com que frequência você pretende utilizar uma nova estratégia para os seus investimentos?",
    answers: [
      {
        text:
          "Pretendo rever e traçar periodicamente novas estratégias para os meus investimentos",
        result: "A"
      },
      {
        text:
          "Pretendo rever e traçar esporadicamente novas estratégias para os meus investimentos",
        result: "B"
      },
      {
        text:
          "Pretendo rever e traçar novas estratégias para os meus investimentos somente quando julgar necessário",
        result: "C"
      }
    ]
  },
  {
    title: "Qual a melhor opção para descrever sua tolerância ao risco?",
    answers: [
      {
        text:
          "Baixa: quero rentabilidade acima da poupança com preservação do poder de compra",
        result: "C"
      },
      {
        text:
          "Regular: quero rentabilidade próxima a taxa de juros DI (CDI) e aceito eventuais riscos",
        result: "B/C"
      },
      {
        text:
          "Média: estou disposto a assumir riscos maiores para superar a taxa de juros DI (CDI)",
        result: "B"
      },
      {
        text:
          "Alta: estou disposto a assumir riscos elevados para alcançar retornos expressivos",
        result: "A"
      }
    ]
  },
  {
    title: "O que você faria se suas ações caíssem 20%?",
    answers: [
      {
        text: "Venderia todas as minhas ações",
        result: "C"
      },
      {
        text: "Venderia uma parte de minhas ações",
        result: "B/C"
      },
      {
        text: "Permaneceria com a mesma quantidade de ações",
        result: "B"
      },
      {
        text: "Compraria mais ações",
        result: "A"
      }
    ]
  },
  {
    title:
      "Qual é o valor aproximado dos seus investimentos financeiros atualmente?",
    answers: [
      {
        text: "0 a 100 mil",
        result: "C"
      },
      {
        text: "100 a 500 mil",
        result: "B/C"
      },
      {
        text: "500 a 1 milhão",
        result: "B"
      },
      {
        text: "Acima de 1 milhão",
        result: "A"
      }
    ]
  }
];
