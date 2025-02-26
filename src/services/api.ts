import { SummaryData, SummaryGraphData } from "@/types/types";

const baseUrl = "https://dengue-dashboard-backend.vercel.app/dengue_api";

export async function getSummaryData (activeLocation: string)  {
    let res;
    if (activeLocation == "BR"){
        res = await fetch(`${baseUrl}/br`);
    }
    else {
        res = await fetch(`${baseUrl}/uf/${activeLocation}`)
    }
    let summaryData : SummaryData = await res.json();

    let formattedData: SummaryData = {
        total_casos: Number(summaryData.total_casos).toLocaleString(),
        media_risco: summaryData.media_risco,
        porcentagem_alerta_4: Number(summaryData.porcentagem_alerta_4).toLocaleString()
    };

    return formattedData;
}

export async function getGraphData  (activeLocation: string) {
    let res;
    if (activeLocation == "BR"){
      res = await fetch(`${baseUrl}/grafico_br`);
    }
    else {
      res = await fetch(`${baseUrl}/grafico_uf/${activeLocation}`)
    }

    let summaryGraphData : SummaryGraphData = await res.json();
    console.log(summaryGraphData)

    return {
      labels: summaryGraphData.dt_weeks,
      datasets: [
        {
          label: "Casos de Dengue por Semana",
          data: summaryGraphData.casos,
          borderColor: "red",
          backgroundColor: "red", 
          fill: false,
        },
      ],
    }
  }

export async function getVersion () {
    try {
        const res = await fetch(`${baseUrl}/version`);

        const data = await res.json();
        
        return(data);
    } catch (error) {
        console.error("Erro ao obter a versão do modelo:", error);
        return('Error')
    }
};