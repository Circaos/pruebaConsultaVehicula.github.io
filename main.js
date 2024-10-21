"use strict";
// src/main.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d;
// import { Vehiculo } from './Vehiculo';
// const {Vehiculo} = require("./Vehiculo");
class Vehiculo {
    constructor(capacidad, chasis, estado, fabric, marca, nroResol, placa, resol, tipoConv) {
        this.capacidad = capacidad;
        this.chasis = chasis;
        this.estado = estado;
        this.fabric = fabric;
        this.marca = marca;
        this.nroResol = nroResol;
        this.placa = placa;
        this.resol = resol;
        this.tipoConv = tipoConv;
    }
    static fromJSON(json) {
        return new Vehiculo(json.capacidad, json.chasis, json.estado, json.fabric, json.marca, json.nroResol, json.placa, json.resol, json.tipoConv);
    }
}
// Función para mostrar pestañas y menú
function setActiveTab(tabId) {
    const tab1 = document.getElementById("sidebar1");
    const tab2 = document.getElementById("sidebar2");
    const pes1 = document.getElementById("tab1-link");
    const pes2 = document.getElementById("tab2-link");
    const rpt1 = document.getElementById("result1");
    const rpt2 = document.getElementById("result2");
    if (tabId === "tab1") {
        console.log("holiwis");
        tab1 === null || tab1 === void 0 ? void 0 : tab1.classList.remove("d-none");
        tab2 === null || tab2 === void 0 ? void 0 : tab2.classList.add("d-none");
        rpt1 === null || rpt1 === void 0 ? void 0 : rpt1.classList.remove("d-none");
        rpt2 === null || rpt2 === void 0 ? void 0 : rpt2.classList.add("d-none");
        pes2 === null || pes2 === void 0 ? void 0 : pes2.classList.remove("active");
        pes1 === null || pes1 === void 0 ? void 0 : pes1.classList.add("active");
    }
    else {
        tab1 === null || tab1 === void 0 ? void 0 : tab1.classList.add("d-none");
        tab2 === null || tab2 === void 0 ? void 0 : tab2.classList.remove("d-none");
        rpt1 === null || rpt1 === void 0 ? void 0 : rpt1.classList.add("d-none");
        rpt2 === null || rpt2 === void 0 ? void 0 : rpt2.classList.remove("d-none");
        pes1 === null || pes1 === void 0 ? void 0 : pes1.classList.remove("active");
        pes2 === null || pes2 === void 0 ? void 0 : pes2.classList.add("active");
    }
}
// Escuchando clics en las pestañas
(_a = document.getElementById("tab1-link")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => setActiveTab("tab1"));
(_b = document.getElementById("tab2-link")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => setActiveTab("tab2"));
// Lógica de llamada a la API
function fetchFromApi(endpoint, params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${endpoint}?${params}`);
            const data = yield response.json();
            document.getElementById("response").textContent = JSON.stringify(data);
        }
        catch (error) {
            console.error("Error en la consulta", error);
        }
    });
}
function fetchPostPlacayCodEmpresa(placa, empresa) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (placa.length >= 1 && empresa.length >= 1) {
                // console.log(`plca: ${placa.length}- ${empresa.length} `)
                const envioJson = {
                    placa: placa,
                    empresa: empresa
                };
                fetch("https://nodejsvehiculosprueba1.onrender.com/PlacaEmpresa/post", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(envioJson),
                })
                    .then(response => response.json()) // convierte la respuesta a JSON
                    .then(data => {
                    console.log('Éxito:', data); // manejar la respuesta
                    if (data.comentario == "OK") {
                        let rpt = data.rpt;
                        //   const jsonObject = JSON.parse(rpt)
                        const vehiculo = Vehiculo.fromJSON(rpt);
                        renderTable1([vehiculo]);
                    }
                    else {
                        renderError1(data.comentario);
                    }
                })
                    .catch((error) => {
                    console.error('Error:', error); // manejar el error
                });
            }
            else {
                renderError1("Debe ingresar Placa y Cod.Empresa");
            }
        }
        catch (error) {
            console.error("Error en la consulta", error);
        }
    });
}
function fetchPostPlacayDescriEmpresa(placa, descriEmpresa) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (placa.length >= 1 && descriEmpresa.length >= 1) {
                const envioJson = {
                    descriEmpresa: descriEmpresa,
                    placa: placa
                };
                fetch("https://nodejsvehiculosprueba1.onrender.com/DescriPlaca/post", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(envioJson),
                })
                    .then(response => response.json()) // convierte la respuesta a JSON
                    .then(data => {
                    console.log('Éxito:', data); // manejar la respuesta
                    if (data.comentario == "OK") {
                        let rpt = data.rpt;
                        let vehiculosFinales = [];
                        rpt.forEach(element => {
                            let vehi = Vehiculo.fromJSON(element);
                            vehiculosFinales.push(vehi);
                        });
                        if (vehiculosFinales.length >= 1) {
                            renderTable2(vehiculosFinales);
                        }
                        else {
                            renderError2("Ningun Vehiculo se encuentra en alguna empresa con esa descripción");
                        }
                    }
                    else {
                        renderError2(data.comentario);
                    }
                })
                    .catch((error) => {
                    console.error('Error:', error); // manejar el error
                });
            }
            else {
                renderError2("Debe ingresar Placa y Descripcion de placa");
            }
        }
        catch (error) {
            console.error("Error en la consulta", error);
        }
    });
}
// Evento de consulta en Pestaña 1
(_c = document.getElementById("button1")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    const inputPlacaP1 = document.getElementById("inputPlacaP1").value;
    const inputCodEmpresaP1 = document.getElementById("inputCodEmpresaP1").value;
    console.log(`Placa ${inputPlacaP1} - Empresa ${inputCodEmpresaP1}`);
    fetchPostPlacayCodEmpresa(inputPlacaP1, inputCodEmpresaP1);
    // const vehiculos: Vehiculo[] = [];
    // vehiculos.push(new Vehiculo("abab","sdsd","asads","asasas","ytre","fdsa","fdsa","gfds","fdfrrr"));
    // vehiculos.push(new Vehiculo("abab","sdsd","asads","asasas","ytre","fdsa","fdsa","gfds","fdfrrr"));
    // renderTable1(vehiculos)
});
// Evento de consulta en Pestaña 2
(_d = document.getElementById("button2")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    const inputPlacaP2 = document.getElementById("inputPlacaP2").value;
    const inputDescriEmpresaP2 = document.getElementById("inputDescriEmpresaP2").value;
    console.log(`Placa ${inputPlacaP2} - Descri Empresa ${inputDescriEmpresaP2}`);
    fetchPostPlacayDescriEmpresa(inputPlacaP2, inputDescriEmpresaP2);
});
// Función para renderizar los datos de la API en la tabla
function renderTable1(data) {
    const cardContainer = document.getElementById("response-cards-1");
    cardContainer.innerHTML = ""; // Limpiamos el contenedor antes de agregar nuevos datos
    // Por cada objeto en el array, creamos una tarjeta
    data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card col-12 m-2"; // Clase de Bootstrap para tarjetas
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        const placa = document.createElement("h5");
        placa.className = "card-title";
        placa.textContent = `PLACA: ${item.placa}`;
        const marca = document.createElement("p");
        marca.className = "card-title";
        marca.textContent = `Marca: ${item.marca}`;
        const chasis = document.createElement("p");
        chasis.className = "card-title";
        chasis.textContent = `Chasis: ${item.chasis}`;
        const fabric = document.createElement("p");
        fabric.className = "card-title";
        fabric.textContent = `Fabricante: ${item.fabric}`;
        const capacidad = document.createElement("p");
        capacidad.className = "card-title";
        capacidad.textContent = `Capacidad: ${item.capacidad}`;
        const tipoConv = document.createElement("p");
        tipoConv.className = "card-title";
        tipoConv.textContent = `Tipo Convenio: ${item.tipoConv}`;
        const resol = document.createElement("p");
        resol.className = "card-title";
        resol.textContent = `Resolucion: ${item.resol}`;
        const nroResol = document.createElement("p");
        nroResol.className = "card-title";
        nroResol.textContent = `N° Resolucion: ${item.nroResol}`;
        const estado = document.createElement("p");
        estado.className = "card-title";
        estado.textContent = `Estado: ${item.estado}`;
        // Agregamos los elementos al cuerpo de la tarjeta
        cardBody.appendChild(placa);
        cardBody.appendChild(marca);
        cardBody.appendChild(chasis);
        cardBody.appendChild(fabric);
        cardBody.appendChild(capacidad);
        cardBody.appendChild(tipoConv);
        cardBody.appendChild(resol);
        cardBody.appendChild(nroResol);
        cardBody.appendChild(estado);
        card.appendChild(cardBody);
        // Agregamos la tarjeta al contenedor
        cardContainer.appendChild(card);
    });
}
function renderError1(comentario) {
    const cardContainer = document.getElementById("response-cards-1");
    cardContainer.innerHTML = ""; // Limpiamos el contenedor antes de agregar nuevos datos
    // Por cada objeto en el array, creamos una tarjeta
    const card = document.createElement("div");
    card.className = "card col-12 m-2"; // Clase de Bootstrap para tarjetas
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const coment = document.createElement("h5");
    coment.className = "card-title";
    coment.textContent = ` ${comentario}`;
    cardBody.appendChild(coment);
    card.appendChild(cardBody);
    // Agregamos la tarjeta al contenedor
    cardContainer.appendChild(card);
}
function renderTable2(data) {
    const cardContainer = document.getElementById("response-cards-2");
    cardContainer.innerHTML = ""; // Limpiamos el contenedor antes de agregar nuevos datos
    // Por cada objeto en el array, creamos una tarjeta
    data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card col-12 m-2"; // Clase de Bootstrap para tarjetas
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        const placa = document.createElement("h5");
        placa.className = "card-title";
        placa.textContent = `PLACA: ${item.placa}`;
        const marca = document.createElement("p");
        marca.className = "card-title";
        marca.textContent = `Marca: ${item.marca}`;
        const chasis = document.createElement("p");
        chasis.className = "card-title";
        chasis.textContent = `Chasis: ${item.chasis}`;
        const fabric = document.createElement("p");
        fabric.className = "card-title";
        fabric.textContent = `Fabricante: ${item.fabric}`;
        const capacidad = document.createElement("p");
        capacidad.className = "card-title";
        capacidad.textContent = `Capacidad: ${item.capacidad}`;
        const tipoConv = document.createElement("p");
        tipoConv.className = "card-title";
        tipoConv.textContent = `Tipo Convenio: ${item.tipoConv}`;
        const resol = document.createElement("p");
        resol.className = "card-title";
        resol.textContent = `Resolucion: ${item.resol}`;
        const nroResol = document.createElement("p");
        nroResol.className = "card-title";
        nroResol.textContent = `N° Resolucion: ${item.nroResol}`;
        const estado = document.createElement("p");
        estado.className = "card-title";
        estado.textContent = `Estado: ${item.estado}`;
        // Agregamos los elementos al cuerpo de la tarjeta
        cardBody.appendChild(placa);
        cardBody.appendChild(marca);
        cardBody.appendChild(chasis);
        cardBody.appendChild(fabric);
        cardBody.appendChild(capacidad);
        cardBody.appendChild(tipoConv);
        cardBody.appendChild(resol);
        cardBody.appendChild(nroResol);
        cardBody.appendChild(estado);
        card.appendChild(cardBody);
        // Agregamos la tarjeta al contenedor
        cardContainer.appendChild(card);
    });
}
function renderError2(comentario) {
    const cardContainer = document.getElementById("response-cards-2");
    cardContainer.innerHTML = ""; // Limpiamos el contenedor antes de agregar nuevos datos
    // Por cada objeto en el array, creamos una tarjeta
    const card = document.createElement("div");
    card.className = "card col-12 m-2"; // Clase de Bootstrap para tarjetas
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const coment = document.createElement("h5");
    coment.className = "card-title";
    coment.textContent = ` ${comentario}`;
    cardBody.appendChild(coment);
    card.appendChild(cardBody);
    // Agregamos la tarjeta al contenedor
    cardContainer.appendChild(card);
}
