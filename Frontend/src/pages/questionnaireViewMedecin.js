import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const QuestionnaireView= ({patientId}) => {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
      const fetchResponse= async ()=>{
        const token = localStorage.getItem('jwt');
        const cleanedToken = token.replace('Bearer ', '');
  
        if (cleanedToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
        } else {
          delete axios.defaults.headers.common['Authorization'];
        }
  
          const response = await axios.get(`/medecin/questionnaire/reponse/${patientId}`);
          const data = await response.data

          setResponses(data.reponses)
         
      };
       fetchResponse()
  
    }, []);
  
    return (
        <div>
        <h2 className="title mb-2">Questionnaire</h2>
        {responses.length !== 0 ?(
            <>
            {responses.map((r) => (
            <Card key={r.question} className="mb-3">
                <Card.Body>
                <Card.Title>{r.question}</Card.Title>
                <ListGroup>
                    <ListGroup.Item>{r.reponse}</ListGroup.Item>
                </ListGroup>
                </Card.Body>
            </Card>
            ))}
            </>
        ):(
            <>
            <p> le patient n'a pas repondu au questionnaire</p>
            </>
        )}

      </div>
    );
  };
  
  export default QuestionnaireView;