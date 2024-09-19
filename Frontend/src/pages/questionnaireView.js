import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const QuestionnaireViewPatient = ({MedecinId}) => {
  const [questions, setQuestions] = useState([]);
  const [formValues, setFormValues] = useState([]);
  const [questionnaireId, setQuestionnaireId]= useState('');

  const handleInputChange = (questionId, value) => {
    setFormValues(prevState => ({
      ...prevState,
      [questionId]: value,
    }));
  };
  const revertFormValuesArray = (responses) => {
    const revertedFormValues = {};
  
    responses.forEach(item => {
      const { question, response } = item;
      revertedFormValues[question] = response;
    });
  
    setFormValues(revertedFormValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const formValuesArray = Object.entries(formValues).map(([questionId, response]) => ({
      question: questionId,
      reponse: response,
    }));
    console.log(formValuesArray)
    console.log(questionnaireId)
    console.log(MedecinId)
    const response = await axios.post('/patient/reponse-questionaire',{
      reponses: formValuesArray,
      medecinId: MedecinId,
      questionnaire: questionnaireId
    })
    console.log(response.data.reponses)
    revertFormValuesArray(response.data.reponses)
    console.log(formValuesArray)

  };
  useEffect(() => {
    // Simulating the fetching of questionnaire data
    const fetchData = async () => {

      const token = localStorage.getItem('jwt');
      const cleanedToken = token.replace('Bearer ', '');

      if (cleanedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
      const response = await axios.get(`/patient/questionnaire/${MedecinId}`);
      const data = await response.data
      console.log('data=>', data.Questions)
      setQuestions(data.Questions);
      setQuestionnaireId(data._id);
      fetchResponse(data._id);
    };
    const fetchResponse= async (id)=>{
      const token = localStorage.getItem('jwt');
      const cleanedToken = token.replace('Bearer ', '');

      if (cleanedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }

        const response = await axios.get(`/patient/questionnaire-reponses/${id}`);
        console.log('respounse',response)
        const data = await response.data
        console.log('data=>', data.reponses)
        revertFormValuesArray(response.data.reponses)


      
    }
    fetchData();

  }, []);

  return (
    <div>
      <h2 className="title">Questionnaire</h2>
      <Container fluid className='mx-2'>
      <Form onSubmit={handleSubmit}>
      {questions.map(question => (
        <Form.Group key={question._id} controlId={question._id}>
          <Form.Label>{question.question}</Form.Label>
          {question.type === 'text' ? (
            <Form.Control
              type="text"
              value={formValues[question.question] || ''}
              onChange={event =>
                handleInputChange(question.question, event.target.value)
              }
            />
          ) : question.type === 'radio' ? (
            question.options.map(option => (
              <Form.Check
                key={option}
                type="radio"
                id={`${question._id}-${option}`}
                label={option}
                name={question._id}
                value={option}
                checked={formValues[question.question] === option}
                onChange={() => handleInputChange(question.question, option)}
              />
            ))
          ) : null}
        </Form.Group>
      ))}
      <Button variant="primary"  type="submit">
        Submit
      </Button>
      </Form>
      </Container>
    </div>
  );
};

export default QuestionnaireViewPatient;
