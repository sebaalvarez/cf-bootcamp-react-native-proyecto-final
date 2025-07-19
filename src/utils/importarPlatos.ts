import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const platos = [
  {
    nombre: "Niños Envueltos (Parra)",
    descripcion: "Porción de 12 Niños envueltos en Hoja de parra",
    precio: 6000,
    uri_img: "nino_parra",
    cantidad: 0,
    stock: 10,
  },
  {
    nombre: "Niños Envueltos (Repollo)",
    descripcion: "Porción de 12 Niños envueltos en Hoja de repollo",
    precio: 6000,
    uri_img: "nino_repollo",
    cantidad: 0,
    stock: 0,
  },
  {
    nombre: "Empanadas Arabe (cocida)",
    descripcion:
      "Docena de empanadas árabes cocidas Docena de empanadas árabes cocidas Docena de empanadas árabes cocidas Docena de árabes árabes empanadas árabes cocidas Docena de empanadas árabes cocidas Docena de empanadas árabes cocidas Docena de árabes árabes empanadas árabes cocidas Docena de empanadas árabes cocidas Docena de empanadas árabes cocidas Docena de empanadas árabes cocidas Docena de empanadas árabes cocidas",
    precio: 7500,
    uri_img: "empanada",
    cantidad: 0,
    stock: 10,
  },
  {
    nombre: "Kipe Relleno (cocido)",
    descripcion: "Porción de 3 Kipes cocidos",
    precio: 7500,
    uri_img: "kippe",
    cantidad: 0,
    stock: 0,
  },
  {
    nombre: "Pure de Garbanzo",
    descripcion: "porcion de pure de garbanzo",
    precio: 1000,
    uri_img: "garbanzo",
    cantidad: 0,
    stock: 10,
  },
  {
    nombre: "Pure de Berenjena",
    descripcion: "porción de pure de berenjena",
    precio: 700,
    uri_img: "berenjena",
    cantidad: 0,
    stock: 10,
  },

  {
    nombre: "Tripa Rellena",
    descripcion: "Tripa rellena",
    precio: 6000,
    uri_img: "tripa",
    cantidad: 0,
    stock: 10,
  },
  {
    nombre: "Pan Arabe",
    descripcion: "Por unidad, panes de 20 cm de diametro",
    precio: 400,
    uri_img: "pan",
    cantidad: 0,
    stock: 10,
  },
  {
    nombre: "Empanadas Arabe (freezada)",
    descripcion: "Docena de empanadas árabe frezadas",
    precio: 6500,
    uri_img: "empanada",
    cantidad: 0,
    stock: 10,
  },
  {
    nombre: "Kipe Relleno (freezado)",
    descripcion: "Porción de 3 Kipes Frezados",
    precio: 6500,
    uri_img: "kippe",
    cantidad: 0,
    stock: 10,
  },
];

export const importarPlatos = async () => {
  try {
    const platosCollection = collection(db, "platos");

    for (const plato of platos) {
      await addDoc(platosCollection, plato);
    }

    console.log("✅ Platos importados correctamente.");
  } catch (error) {
    console.error("❌ Error al importar platos:", error);
  }
};
