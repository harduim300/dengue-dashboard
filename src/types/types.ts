export type LocationOption = {
  value: string;
  label: string;
};

export type SummaryData = {
  total_casos: string,
  media_risco: string,
  porcentagem_alerta_4: string,
}

export type SummaryGraphData = {
  dt_weeks: string[],
  casos: string[],
}