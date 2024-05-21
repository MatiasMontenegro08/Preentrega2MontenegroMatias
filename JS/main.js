let pedidosDiarios = [];
let pagado = 0;
let cobrado = 0;
let ganancia = 0;
let propina = 0;
let total = 0;
let respuesta = "no";


do {
    respuesta = prompt("Realizo un pedido nuevo? (si/no)");
    if (respuesta.toLowerCase() === "si") {
        do {
            pagado = parseFloat(prompt("Cuánto pagaste por el pedido?"));
        } while (isNaN(pagado) || pagado === "" || pagado === null);

        do {
            cobrado = parseFloat(prompt("Cuánto cobraste por el pedido?"));
        } while (isNaN(cobrado) || cobrado === "" || cobrado === null);
        let respuestaPropina = prompt("Obtuviste propina? (si/no)");

        if (respuestaPropina.toLowerCase() === "si") {
            do {
                propina = parseFloat(prompt("Cuánta propina obtuviste?"));
            } while (isNaN(propina) || propina === "" || propina === null);
        }

        let nuevoPedido = {
            costo: pagado,
            venta: cobrado,
            extra: propina
        }
        pedidosDiarios.push(nuevoPedido);
    }
} while (respuesta.toLowerCase() === "si" || respuesta.toLowerCase() !== "no" || respuesta === null);


let contenedorPedidosDiarios = document.querySelector("#pedidos-diarios");
pedidosDiarios.forEach((registro) => {
    let div = document.createElement("div");
    div.classList.add("pedido");
    div.innerHTML = `
    <p>Costo del pedido: $${registro.costo}</p>
    <p>Venta del pedido: $${registro.venta}</p>
    <p>Propina del pedido: $${registro.extra}</p>
    `;
    contenedorPedidosDiarios.append(div);
})


console.log(calcularTotales());
/* FIN */

/*Funciones */
function calcularTotales() {
    let pedido = pedidosDiarios.length;
    let gastoTotal = pedidosDiarios.reduce((i, gasto) => i + gasto.costo, 0);
    let ventaTotal = pedidosDiarios.reduce((i, venta) => i + venta.venta, 0);
    let propinaTotal = pedidosDiarios.reduce((i, propina) => i + propina.extra, 0);
    imprimirResultados(pedido, gastoTotal, ventaTotal, propinaTotal, calcularGanancia(ventaTotal, gastoTotal));
}

function calcularGanancia(val1, val2) {
    total = val1 - val2;
    return total.toFixed(2);
}

function imprimirResultados(p, gt, vt, pt, g) {
    console.log("Cantidad de pedidos: " + p);
    console.log("Gasto total en los pedidos: $" + gt.toFixed(2));
    console.log("Venta total de los pedidos: $" + vt.toFixed(2));
    console.log("Propina total de los pedidos: $" + pt.toFixed(2));
    console.log("Ganancia del día: $" + g);
    alert("Cantidad de pedido: " + p +
        "\nGasto total en los pedidos: $" + gt.toFixed(2) +
        "\nVenta total de los pedidos: $" + vt.toFixed(2) +
        "\nPropina total de los pedidos: $" + pt.toFixed(2) +
        "\nGanancia del día: $" + g
    );
    let contenedorPedidosTotal = document.querySelector("#total-cantidad");
    contenedorPedidosTotal.innerHTML = "Cantidad de pedidos: " + p;

    let contenedorCostoTotal = document.querySelector("#total-gastos");
    contenedorCostoTotal.innerHTML = "Gasto total en los pedidos: $" + gt;

    let contenedorVentaTotal = document.querySelector("#total-ventas");
    contenedorVentaTotal.innerHTML = "Venta total en los pedidos: $" + vt;

    let contenedorPropinaTotal = document.querySelector("#total-propina");
    contenedorPropinaTotal.innerHTML = "Propina total en los pedidos: $" + pt;

    let contenedorGanancia = document.querySelector("#total-ganancia");
    contenedorGanancia.innerHTML = "Ganancia del día: $" + g;
}