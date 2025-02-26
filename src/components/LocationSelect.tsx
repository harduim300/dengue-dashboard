import React, { useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { LocationOption } from "@/types/types";

const Select = dynamic(() => import("react-select"), { ssr: false });

const locationList: LocationOption[] = [
  { value: 'BR', label: 'Brasil' },
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

type Props = {
  activeLocation: string;
  setActiveLocation: (value: string) => void;
};

export default function LocationSelect({ activeLocation, setActiveLocation }: Props) {
  const selectRef = useRef<any>(null);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.setValue(
        locationList.find((option) => option.value === activeLocation)
      );
    }
  }, [activeLocation]);

  return useMemo(() => (
    <Select
      ref={selectRef}
      placeholder="Selecione um Estado"
      options={locationList}
      onChange={(option) => setActiveLocation((option as LocationOption).value)}
      defaultValue={locationList.find((option) => option.value === activeLocation)}
      className="w-1/3 ml-4"
    />
  ), []);
}
