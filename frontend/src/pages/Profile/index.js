import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

import "../Profile/styles.css";

export default function Profile() {
  const [incidents, setIncidents] = useState([{}]);
  const [incidents2, setIncidents2] = useState([]);
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  useEffect(() => {
    const rawTodos2 = incidents;
    const arTodos2 = [];
    for (let key in rawTodos2) {
      arTodos2.push({
        id: rawTodos2["id"],
        title: rawTodos2["title"],
        description: rawTodos2["description"],
        value: rawTodos2["value"],
        ong_id: rawTodos2["ong_id"]
      });
    }
    setIncidents2(arTodos2);
  }, [incidents]);

  const handleDeleteIncident = async id => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      //setIncidents2(incidents2.filter(incident => incidents2.id !== id))
    } catch (error) {
      alert(`Erro ao deletar caso, tente novamente`);
    }
  };

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Heroes" />
        <span>Bem Vindo a, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button">
          <FiPower size={18} color="#E02041"></FiPower>
        </button>
      </header>

      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents2.map(incident => (
          <li Key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>
            <button onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 color="a8a8b3" size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
