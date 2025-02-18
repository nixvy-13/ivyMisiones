export function calcularExpNecesaria(nivel){
    let xpNecesaria = 100
    if(nivel != 1){
        xpNecesaria = (100 * nivel)*1.2;
    }
    return xpNecesaria
}