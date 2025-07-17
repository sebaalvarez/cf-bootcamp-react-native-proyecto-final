import { IPlatos } from "../../types/index";
import CardPlatoList from "../../components/CardPlatoList";
import ContainerApp from "../../components/ContainerApp";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

const PAGE_SIZE = 10;

const Platos: IPlatos[] = [
  {
    id: 1,
    nombre: "Niños Envueltos (Parra)",
    descripcion: "Porción de 12 Niños envueltos en Hoja de parra",
    precio: 6000,
    uri_img: "nino_parra",
    cantidad: 0,
    stock: 20,
  },
  {
    id: 6,
    nombre: "Niños Envueltos (Repollo)",
    descripcion: "Porción de 12 Niños envueltos en Hoja de repollo",
    precio: 6000,
    uri_img: "nino_repollo",
    cantidad: 0,
    stock: 20,
  },
  {
    id: 2,
    nombre: "Empanadas Arabe (cocida)",
    descripcion: "Docena de empanadas árabes cocidas",
    precio: 7500,
    uri_img: "empanada",
    cantidad: 0,
    stock: 20,
  },
  {
    id: 3,
    nombre: "Kipe Relleno (cocido)",
    descripcion: "Porción de 3 Kipes cocidos",
    precio: 7500,
    uri_img: "kippe",
    cantidad: 0,
    stock: 20,
  },
  {
    id: 4,
    nombre: "Pure de Garbanzo",
    descripcion: "porcion de pure de garbanzo",
    precio: 1000,
    uri_img: "garbanzo",
    cantidad: 0,
    stock: 20,
  },
  {
    id: 5,
    nombre: "Pure de Berenjena",
    descripcion: "porción de pure de berenjena",
    precio: 700,
    uri_img: "berenjena",
    cantidad: 0,
    stock: 20,
  },

  {
    id: 7,
    nombre: "Tripa Rellena",
    descripcion: "Tripa rellena",
    precio: 6000,
    uri_img: "tripa",
    cantidad: 0,
    stock: 20,
  },
  {
    id: 8,
    nombre: "Pan Arabe",
    descripcion: "Por unidad, panes de 20 cm de diametro",
    precio: 400,
    uri_img: "pan",
    cantidad: 0,
    stock: 20,
  },
  {
    id: 9,
    nombre: "Empanadas Arabe (freezada)",
    descripcion: "Docena de empanadas árabe frezadas",
    precio: 6500,
    uri_img: "empanada",
    cantidad: 0,
    stock: 20,
  },
  {
    id: 10,
    nombre: "Kipe Relleno (freezado)",
    descripcion: "Porción de 3 Kipes Frezados",
    precio: 6500,
    uri_img: "kippe",
    cantidad: 0,
    stock: 20,
  },
];

export default function Menu() {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${PAGE_SIZE}&_page=${pageNumber}`
      );
      const newData = await response.json();

      if (newData.length < PAGE_SIZE) {
        setHasMore(false);
      }
      setData((prev) => [...prev, ...newData]);
    } catch (error) {
      console.error("Error al obtener los platos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchData(page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <ContainerApp>
      <FlatList
        data={Platos}
        keyExtractor={(item, index) => `plato-${item.id}-${index}`}
        renderItem={({ item }) => <CardPlatoList item={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </ContainerApp>
  );
}
