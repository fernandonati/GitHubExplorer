import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight }  from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Title, Form, Repositories,Error } from './styles';

import api from '../../services/api';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}


const Dashboard: React.FC = () => {  //can define the type of component.
   const [newRepo,setNewRepo] = useState('');
   const [inputError, setinputError] = useState('');
   const [repositories , setRepositories] = useState<Repository[]>(() =>{
       const storageRepositories = localStorage.getItem('@GitHubExplorer:repositories');
       if (storageRepositories) {
           return JSON.parse(storageRepositories);
       }
       else {
           return [];
       }
   });

   useEffect(() => {
       localStorage.setItem('@GitHubExplorer:repositories',JSON.stringify(repositories));
   },[repositories]);

   async function handleAddRepository(event:FormEvent<HTMLFormElement>): Promise<void> {

      event.preventDefault();  //to prevent normal form submit.

      if(!inputError) {
        setinputError('Enter with Author/Repository name.');
        return; //to stop code.
      }

      try {
         //add repository.
         const response = await api.get(`repos/${newRepo}`);

         const repository = response.data;

         setRepositories([...repositories,repository]);
         setNewRepo(''); //to clean field.
         setinputError('');
      }
      catch (err) {
        setinputError('Invalid Repository.');
      }
   }

   return (
    <>
      <img src={logoImg} alt="Github explorer"/>
      <Title>Explore repositories on GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
          <input
            value = {newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
            placeholder="Enter the name of the repository" />
          <button type="submit">Search</button>
      </Form>


     {inputError && <Error>{inputError}</Error> }

      <Repositories>
       {repositories.map(repository =>(
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img src={repository.owner.avatar_url}
                 alt={repository.owner.login}/>
            <div>
               <strong>{repository.full_name}</strong>
               <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20}></FiChevronRight>
          </Link>
       ))}
      </Repositories>
    </>
   );
}

export default Dashboard;
