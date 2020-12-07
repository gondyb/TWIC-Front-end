import { useState } from "react";
import Modal from "react-modal";

export default function EditModal(props) {
  const [ville, setVille] = useState(props.ville);

  if (props.ville === null) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const putMethod = {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(ville), // We send data in JSON format
    };

    fetch(`http://127.0.0.1:8080/villes/${ville.codeCommune}`, putMethod)
    .then(() => {
        props.closeModal();
    });
  };

  return (
    <Modal
      isOpen={props.isOpened}
      onAfterOpen={props.afterOpenModal}
      onRequestClose={props.closeModal}
      ville={props.ville}
    >
      <h2>Modifier ville</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomCommune" className="text-lg block">
            Nom commune
          </label>
          <input
            type="text"
            name="nomCommune"
            id="nomCommune"
            className="border"
            value={ville.nomCommune}
            onChange={(el) => {
              setVille({
                ...ville,
                nomCommune: el.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="codeCommune" className="text-lg block">
            Code commune
          </label>
          <input
            type="text"
            name="codeCommune"
            id="codeCommune"
            className="border"
            value={ville.codeCommune}
            onChange={(el) => {
              setVille({
                ...ville,
                codeCommune: el.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="codePostal" className="text-lg block">
            Code postal
          </label>
          <input
            type="text"
            name="codePostal"
            id="codePostal"
            className="border"
            value={ville.codePostal}
            onChange={(el) => {
              setVille({
                ...ville,
                codePostal: el.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="libelleAcheminement" className="text-lg block">
            Libelle Acheminement
          </label>
          <input
            type="text"
            name="libelleAcheminement"
            id="libelleAcheminement"
            className="border"
            value={ville.libelleAcheminement}
            onChange={(el) => {
              setVille({
                ...ville,
                libelleAcheminement: el.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="ligne" className="text-lg block">
            Ligne
          </label>
          <input
            type="text"
            name="ligne"
            id="ligne"
            className="border"
            value={ville.ligne}
            onChange={(el) => {
              setVille({
                ...ville,
                ligne: el.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="latitude" className="text-lg block">
            Latitude
          </label>
          <input
            type="text"
            name="latitude"
            id="latitude"
            className="border"
            value={ville.latitude}
            onChange={(el) => {
              setVille({
                ...ville,
                latitude: el.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="longitude" className="text-lg block">
            Longitude
          </label>
          <input
            type="text"
            name="longitude"
            id="longitude"
            className="border"
            value={ville.longitude}
            onChange={(el) => {
              setVille({
                ...ville,
                longitude: el.target.value,
              });
            }}
          />
        </div>
        <input
          type="submit"
          value="Valider"
          className="px-4 py-1 rounded-xl mt-3 bg-green-700 text-white"
        />
      </form>
    </Modal>
  );
}
