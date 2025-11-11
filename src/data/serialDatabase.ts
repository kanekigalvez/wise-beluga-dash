export interface SerialInfo {
  prefix: string;
  software: string;
  url: string;
  details: { label: string; value: string }[];
}

const diagzoneDetailsTemplate = [
  { label: "Software Compatible", value: "Diagzone PRO" },
  { label: "Actualización", value: "Consultar" },
];

export const serialDatabase: SerialInfo[] = [
  {
    prefix: "96919",
    software: "Golo ED+",
    url: "https://diagzone.com/producto/golo-ed-plus",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "96579",
    software: "iDiag for Android",
    url: "https://diagzone.com/producto/idiag-for-android",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "97986",
    software: "TD1",
    url: "https://diagzone.com/producto/td1",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "97699",
    software: "ED 3.0",
    url: "https://diagzone.com/producto/ed-3-0",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98914",
    software: "BT200",
    url: "https://diagzone.com/producto/bt200",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "96859",
    software: "ED V2.0",
    url: "https://diagzone.com/producto/ed-v2-0",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "70001",
    software: "V",
    url: "https://diagzone.com/producto/v",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98374",
    software: "V Plus",
    url: "https://diagzone.com/producto/v-plus",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "97189",
    software: "TOPDON",
    url: "https://diagzone.com/producto/topdon",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "96883",
    software: "MaxGo",
    url: "https://diagzone.com/producto/maxgo",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98689",
    software: "HD IV",
    url: "https://diagzone.com/producto/hd-iv",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98649",
    software: "HD III",
    url: "https://diagzone.com/producto/hd-iii",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "97619",
    software: "M-Diag",
    url: "https://diagzone.com/producto/m-diag",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98609",
    software: "PRO4 D3",
    url: "https://diagzone.com/producto/pro4-d3",
    details: diagzoneDetailsTemplate,
  },
  {
    prefix: "98579",
    software: "PAD2 D3",
    url: "https://diagzone.com/producto/pad2-d3",
    details: diagzoneDetailsTemplate,
  },
];