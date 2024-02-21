export function formatNumber(num) {
    // return (num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')).toString().replace(".", ",")
    return (num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1')).toString().replace(".", ",")
}