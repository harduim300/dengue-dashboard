
type Props = {
    keyColor: number,
    title: string,
    value: string,
}

const Card = (props: Props) => {

    let bgColor;
    let nivel_alerta;

    switch (props.keyColor) {
        case 1:
            bgColor = '#d13e56';
            break;
        case 2:
            if (Number(props.value) >= 1 && Number(props.value) < 1.5) {
                bgColor = 'green';
                nivel_alerta = 'Baixo Risco';
            } else if (Number(props.value) >= 1.5 && Number(props.value) < 2.5){
                bgColor = 'yellow';
                nivel_alerta = 'Atenção';
            } else if (Number(props.value) >= 2.5 && Number(props.value) < 3.5){
                bgColor = 'orange';
                nivel_alerta = 'Transmissão';
            } else {
                bgColor = 'red';
                nivel_alerta = 'Epidemia';
            }
            break;
        case 3:
            bgColor = '#687987'
    }
    
    return (
        <div style={{backgroundColor: bgColor}} id='summary-cards' className="m-1 text-white flex-summary_data flex flex-col justify-center">
            <h2 style={{textShadow: '1px 1px 2px black'}} className="pt-4 animate-fade animate-summary_card_anime">{ props.keyColor !== 1 ? props.title: <span>{props.title}<br/> (Ao longo de 1 ano)</span>}</h2>
            <p style={{textShadow: '1px 1px 2px black'}} className="text-summary_card_p">{ props.keyColor !== 2 ? props.value: nivel_alerta}</p>
        </div>
    )
}

export default Card;