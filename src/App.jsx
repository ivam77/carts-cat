import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // Estado para almacenar los datos 
  const [catData, setCatData] = useState(null);
  // Lista de razas de gatos
  const catBreeds = ['Abyssinian', 'American Shorthair', 'Asian', 'Russian Blue'];
  // Estado para almacenar la raza de gato actual
  const [currentBreed, setCurrentBreed] = useState('Abyssinian');

  // Función para obtener datos 
  const fetchRandomCat = async () => {
    try {
      const apiKey = '2Tx+VxAGrxoS3MPYzMKc4g==7Lu3XUby1iJ0yHP0';
      const url = `https://api.api-ninjas.com/v1/cats?name=${currentBreed}`;

      // Realizar una solicitud GET a la API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener los datos del gato');
      }

      const data = await response.json();

      // Establecer los datos del primer gato obtenido en el estado
      setCatData(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  //cambia la raza de gato actual
  useEffect(() => {
    fetchRandomCat();
  }, [currentBreed]);

  const handleButtonClick = () => {
    // Generar un índice aleatorio de la lista
    const randomIndex = Math.floor(Math.random() * catBreeds.length);
    // Obtener la raza de gato
    const randomBreed = catBreeds[randomIndex];
    // raza aleatoria
    setCurrentBreed(randomBreed);
  };

  return (
    <div className="container">
      <div className="content">
        <div className="cat-image">
          <img src={catData?.image_link} alt={catData?.name} className="rounded-image" />
        </div>
        {catData && (
          <>
            <div className="cat-info">
              <h2>{catData.name}</h2>
              <p>Length: {catData.length}</p>
              <p>Origin: {catData.origin}</p>
            </div>
          </>
        )}
        <button className="refresh-button" onClick={handleButtonClick}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default App;