export type CropData ={
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": string | number;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
    "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
  }
  
  export type  ProcessedData= {
    year: string;
    maxCrop: { name: string; production: number };
    minCrop: { name: string; production: number };
  }
  
  export type  AverageYieldData= {
    name: string;
    averageYield: number;
  }
  