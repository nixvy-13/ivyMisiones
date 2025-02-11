export function calcularNivel(nivel, setNivel,exp){
    if(nivel === 1){
        if(exp >= 100){
            setNivel(2)
        }
    }else{
        let expNecesaria = (100 * nivel)*1.2;
        if(exp >= expNecesaria){
            setNivel(nivel+1)
        }
    }
}