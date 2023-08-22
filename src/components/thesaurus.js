import React, {useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";

function Thesaurus() {
  const [word, setWord] = useState('');
  
  const fetchThesaurusData = async () => {
      if (word === '') return [];
      
      try {
          const response = await axios.get(`https://api.datamuse.com/words?ml=${word}`);
          return response.data;
        } catch (error) {
            throw new Error('Failed to fetch synonyms');
        }
    };
    
    const { data, isLoading, isError } = useQuery(['thesaurus', word], fetchThesaurusData);

    return (
        <div>
            <h1>Thesaurus</h1>
            <input 
            type = "text"
            placeholder="Enter a word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            />
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching synonyms</p>}
            <ul>
                {data?.map((item, index) => (
                    <li key = {index}>{item.word}</li>
                ))}
            </ul>
        </div>
    )
};

export default Thesaurus;

// import React from "react";

// function Helloworld() {
//     return(
//         <div>
//             Helloworld
//         </div>
//     )
// }

// export default Helloworld