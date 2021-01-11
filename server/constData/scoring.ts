export interface ScoringTag {
  name: string;
  tags: string[];
  score: number; // from 0 to 100
  comment: string;
  risk?: string;
}

export const HealthTags: ScoringTag[] = [
  {
    comment: "il permet de lier des agents de turbidité dans une boisson.",
    tags: ["E1201"],
    name: "Le Polyvinylpyrrolidone E1201",
    score: 0,
    risk: "des fausses couches et des cancers.",
  },
  {
    comment: "il permet de lier des agents de turbidité dans une boisson.",
    tags: ["E1202"],
    name: "Le Polyvinylpyrrolidone E1202",
    score: 0,
    risk: "des fausses couches et des cancers.",
  },
  {
    comment: "un conservateur de synthèse également utilisé comme pesticide",
    tags: ["E230"],
    name: "Diphényle E230",
    score: 70,
    risk: "des nausées, une irritation des yeux, allergies",
  },
  {
    comment: "Alternative au sucre, très utilisé dans les produits light",
    tags: ["E951"],
    name: "L’aspartame E951",
    score: 80,
    risk: "des troubles digestifs, des maux de tête, insomnies, prise de poids",
  },
  {
    comment: "édulcorant de synthèse pour remplacer le sucre",
    tags: ["E952"],
    name: "Acide Cyclamique E952",
    score: 0,
    risk: "Cancers",
  },
  {
    comment: "édulcorant 600 fois plus sucrant que le sucre",
    tags: ["E955"],
    name: "Sucralose E955",
    score: 15,
    risk: "problèmes de foie et de reins",
  },
  {
    comment: "édulcorant 300 fois plus sucrant que le sucre",
    tags: ["E954"],
    name: "Saccharine E954",
    score: 90,
    risk: "allergies",
  },
  {
    comment: "Alternative au sucre, très utilisé dans les produits light",
    tags: ["E962"],
    name: "Sel d’aspartame E962",
    score: 80,
    risk: "des troubles digestifs, des maux de tête, insomnies, prise de poids",
  },
  {
    comment: "Alternative au sucre, très utilisé dans les produits light",
    tags: ["Acésulfame-K"],
    name: "Acésulfame-K",
    score: 80,
    risk: "des troubles digestifs, des maux de tête, insomnies, prise de poids",
  },
  {
    comment: "édulcorant de synthèse",
    tags: ["E967"],
    name: "Xylitol E967",
    score: 15,
    risk: "problèmes de reins, évanouissement, acidose",
  },
  {
    comment: "c’est un conservateur chimique",
    tags: ["E210"],
    name: "Acide benzoïque E210",
    score: 60,
    risk: "des problèmes de croissance, insomnies, trouble du comportement",
  },
  {
    comment: "édulcorant 200 fois plus sucrant que le sucre",
    tags: ["E950"],
    name: "Acesulfame-k E950",
    score: 0,
    risk: "hausse de cholestérol, cancers, problèmes aux poumons",
  },
  {
    comment: "additif interdit en Australie et en Allemagne",
    tags: ["E927a"],
    name: "Azodicarbonamide E927a",
    score: 80,
    risk: "asthme, hyperactivité, insomnies",
  },
  {
    comment:
      "Utilisé comme agent d’enrobage pour traiter les agrumes, légumes, fruits",
    tags: ["E914"],
    name: "Cire de polyéthylène oxydée E914",
    score: 0,
    risk: "cancers",
  },
  {
    comment: "cire végétale utilisé comme agent d’enrobage",
    tags: ["E912"],
    name: "Esters de l’acide montanique E912",
    score: 90,
    risk: "des allergies",
  },
  {
    comment: "un antioxydant de synthèse",
    tags: ["E310"],
    name: "Gallate de propyle E310",
    score: 0,
    risk: "problème au foie, hyperactivité, cancers",
  },
  {
    comment:
      "issu du pétrole ou lignite, présent dans les chewing-gums et de nombreuses confiseries",
    tags: ["E905"],
    name: "Cire microcristalline E905",
    score: 10,
    risk: "problème au niveau des lymphes et du foie",
  },
  {
    comment: "huile de silicone anti-mousse",
    tags: ["E900"],
    name: "Diméthylpolysiloxane E900",
    score: 0,
    risk: "problèmes au niveau du foie, des reins, cancers",
  },
  {
    comment: "c’est un colorant rouge",
    tags: ["E124"],
    name: "Ponceau 4r E124",
    score: 80,
    risk: "de l’urticaire, asthme, hyperactivité",
  },
  {
    comment: "support pour additif de synthèse qui peut remplacer le sel",
    tags: ["E640"],
    name: "Glycine E640",
    score: 70,
    risk: "retard de croissance",
  },
  {
    comment: "exhausteur de goût",
    tags: ["E637"],
    name: "Ethyl matol E637",
    score: 36,
    risk: "des risques de destruction des globules rouges",
  },
  {
    comment: "exhausteur de goût",
    tags: ["E636"],
    name: "Maltol E636",
    score: 36,
    risk: "des risques de destruction des globules rouges",
  },
  {
    comment: "exhausteur de goût",
    tags: ["E630"],
    name: "Acide inosinique E630",
    score: 80,
    risk: "problème d’asthme, réactions cutanées, allergies",
  },
  {
    comment: "exhausteur de goût pour stimuler l’appétit",
    tags: ["E627"],
    name: "Guanylate disodique E627",
    score: 80,
    risk: "irritation des muqueuses, de l’asthme",
  },
  {
    comment: "exhausteur de goût de synthèse très utilisé",
    tags: ["E621"],
    name: "Glutamate monosodique E621",
    score: 23,
    risk: "destruction des neurones",
  },
  {
    comment: "un anti-agglomérant",
    tags: ["E553a"],
    name: "Silicate de magnésium E553a",
    score: 90,
    risk: "problèmes au niveau de la respiration",
  },

  {
    comment: "un anti-agglomérant",
    tags: ["E553b"],
    name: "Talc E553b",
    score: 90,
    risk: "problèmes au niveau de la respiration",
  },
  {
    comment: "additif très utilisé, pour remplacer le sel",
    tags: ["E620"],
    name: "Acide glutamique E620",
    score: 70,
    risk:
      "asthme, problème de sensibilité du dos et des bras, problème cardiovasculaires",
  },
  {
    comment:
      "utilisé pour augmenter la masse des aliments, interdit en Australie",
    tags: ["E544"],
    name: "Poly phosphates de calcium E544 ",
    score: 80,
    risk: "allergies, problèmes de digestion",
  },
  {
    comment: "un antioxydant de synthèse",
    tags: ["E311"],
    name: "Gallate d’octyle E311",
    score: 50,
    risk: "de l’urticaire, des allergies, problème concernant les hémoglobines",
  },
  {
    comment: "utilisé dans les patisseries, présenté comme neurotoxique",
    tags: ["E541"],
    name: "Phosphates d’aluminium acide sodique E541",
    score: 10,
    risk: "problèmes de reins, alzheimer, problèmes de coeur",
  },
  {
    comment: "un dérivé de l’aluminium",
    tags: ["E520"],
    name: "Sulfate d’aluminium E520",
    score: 10,
    risk: "nocif pour les reins, alzheimer",
  },
  {
    comment: "un anti-moussant utilisé comme colorant",
    tags: ["E491"],
    name: "Monostérate de sorbinate E491",
    score: 30,
    risk: "lésion(s) d’organe(s), diarrhées",
  },
  {
    comment: "antioxydant, présent dans de la nourriture pour bébé",
    tags: ["E473"],
    name: "Sucroesters E473",
    score: 90,
    risk: "problèmes de digestion et diarrhées",
  },
  {
    comment: "un épaississant",
    tags: ["E460"],
    name: "Céllulose microcristalline E460 ",
    score: 0,
    risk: "cancers",
  },
  {
    comment: "support de synthèse utilisé dans les desserts",
    tags: ["E432"],
    name: "Polysorbate 20 E432",
    score: 0,
    risk: "problèmes de calculs rénaux, des tumeurs, allergies",
  },
  {
    comment:
      "un antioxydant, il est utilisé en médecine pour traiter un empoisonnements aux métaux lourds",
    tags: ["E385"],
    name: "Edta E385",
    score: 70,
    risk: "problème de digestion, coagulation du sang",
  },
  {
    comment: "très utilisé dans les laitages et bonbons",
    tags: ["E441"],
    name: "Gélatine E441 ",
    score: 80,
    risk: "nombreuses allergies, asthme",
  },
];

export const EnvironmentTags: ScoringTag[] = [
  {
    name: "Polyéthilène haute densité",
    comment: "Contenants de produits alimentaires, recyclable",
    tags: ["PE-HD"],
    risk: "Emballage plastique",
    score: 60,
  },
  {
    name: "Polyéthilène basse densité",
    comment: "Emballage de pain ou de produits surgeléss",
    tags: ["PE-LD"],
    risk: "Plastique non recyclable",
    score: 20,
  },
  {
    name: "Polypropylène",
    comment: "Contenants de produits alimentaires, non recyclalbe",
    tags: ["PP"],
    risk: "Plastique non recyclable",
    score: 20,
  },
  {
    name: "Verre",
    comment: "Très facilement recyclable ou réutilisable",
    tags: ["verre"],
    score: 100,
  },
  {
    name: "Carton",
    comment: "Très facilement recyclable",
    tags: ["carton", "papier"],
    score: 100,
  },
  {
    name: "Polyéthylène terephtalate",
    comment: "Plastique généralement trouvé dans les bouteilles, recyclable",
    tags: ["PET"],
    score: 75,
  },
  {
    name: "Polychlorure de vinyle",
    comment: "Plastique de film alimentaire, recyclable",
    tags: ["PVC"],
    score: 75,
  },
  {
    name: "Polystyrène",
    comment: "Plastique de film alimentaire, recyclable",
    tags: ["PS", "Polystyrène"],
    risk: "Difficilement recyclable, s'eparpille dans la nature",
    score: 15,
  },
  {
    name: "Aluminium",
    comment: "Emballage recyclable",
    tags: ["Aluminium", "alu"],
    risk: "Difficilement recyclable, s'eparpille dans la nature",
    score: 90,
  },
];

export const Distances : ScoringTag[] = [
    {
        name: "France",
        comment: "Origine France",
        score: 100,
        tags: ["france", "fr"]
    },
    {
        name: "Allemagne",
        comment: "Origine Allemagne",
        score: 80,
        tags: ["allemagne", "germany", "de", "ge"]
    },
    {
        name: "Espagne",
        comment: "Origine Espagne",
        score: 70,
        tags: ["espagne", "spain", "es"]
    },
    {
        name: "Portugal",
        comment: "Origine Portugal",
        score: 65,
        tags: ["portugal", "pt"]
    },
    {
        name: "Belgique",
        comment: "Origine Belgique",
        score: 80,
        tags: ["belgique", "belgium", "be"]
    },
    {
        name: "Union Européenne",
        comment: "Origine UE",
        score: 40,
        tags: ["ue", "eu", "union européenne"]
    }
]