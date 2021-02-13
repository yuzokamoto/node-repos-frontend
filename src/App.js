import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', {
        title: `Repositório ${Date.now()}`,
        url: 'https://github.com/yuzokamoto',
        techs: ['react', 'node'],
      });
      
      setRepositories([...repositories, response.data])
    } catch (error) {
      console.log(error.response);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      const removedRepositoryIndex = repositories.map(repository => repository.id).indexOf(id);
      const updatedRepositories = [...repositories];

      updatedRepositories.splice(removedRepositoryIndex, 1);

      setRepositories(updatedRepositories);

    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        ))}
      </ul>

      {!repositories.length && <p>Nenhum repositório encontrado.</p>}

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
