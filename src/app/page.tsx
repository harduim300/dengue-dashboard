"use client"
import React, { useState, useEffect, useMemo, useRef } from "react";
import Card from "@/components/SummaryCards";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import {CategoryScale} from 'chart.js'; 
import LocationSelect from "@/components/LocationSelect";
import { getSummaryData, getGraphData, getVersion } from "@/services/api";
Chart.register(CategoryScale);

export default function Home() {
  const [activeLocation, setActiveLocation] = useState("BR");
  const [lastUpdated, setLastUpdated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [summaryData, setSummaryData] = useState({
    total_casos: '0',
    media_risco: '0',
    porcentagem_alerta_4: '0',
  });

  const [timeseriesData, setTimeseriesData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: string[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Casos de Dengue por Semana",
        data: [],
        borderColor: "red",
        backgroundColor: "red",
        fill: false,
      },
    ],
  });

  const timeseriesOptions = {
    responsive: true,
    normalized: true,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
    scale: {
      y: {
        min: 0,
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
  
      await getGraphData(activeLocation).then(setTimeseriesData);
      await getSummaryData(activeLocation).then(setSummaryData);
  
      setIsLoading(false);
    }
  
    fetchData();
  }, [activeLocation])

  useEffect(() => {
    async function fetchVersion () {
      await getVersion().then(setLastUpdated)
    }
    fetchVersion()
  }, [])

  return (
    <div id='App' className="">
      <h1 className="text-center my-4 text-titlecolor font-bold text-3xl">
        Monitor da Dengue 🦟
      </h1>
      <div id="dashboard-container" className="m-auto grid grid-rows-gridLayout gap-3 w-container_width h-container_height text-center rounded-md">
        <div id="dashboard-menu" className="flex justify-between py-4 bg-white items-center">
          <LocationSelect activeLocation={activeLocation} setActiveLocation={setActiveLocation} />
          <span id="update-date" className="mr-4">
            Última atualização: {lastUpdated}
            <br/>
            <span className="text-[8px]">(Este é um site de teste. Consulte fontes oficiais para informações precisas.)</span>
          </span>
        </div>
        {isLoading ? 
        (<div className="flex justify-center items-center h-64 flex-col bg-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"/>
          <span className="mt-10">Carregando Informações...</span>
          <br/>
          <span>(Algumas solicitações podem demorar mais tempo)</span>
        </div>)
        :
        (<>
          <div id="dashboard-timeseries" className="bg-white text-black">
            <Line id="line-chart"
              data={timeseriesData}
              options={timeseriesOptions}
              className="h-4/5 m-6"
            />
          </div>
          <div id="dashboard-summary" className="flex flex-row justify-evenly bg-white">
            <Card keyColor={1} title="Total de Casos" value={summaryData.total_casos}/>
            <Card keyColor={2} title="Grau de Risco" value={summaryData.media_risco}/>
            <Card keyColor={3} title="% de Cidades em Epidemia" value={`${summaryData.porcentagem_alerta_4}%`}/>
          </div>
        </>)
        }
      </div>
    </div>
  );
}