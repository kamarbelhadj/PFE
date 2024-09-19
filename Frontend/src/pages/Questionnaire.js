import React, { useEffect, useState } from 'react';
import "../component/style/questionnaire.css"
import axios from 'axios';


let QuestionnaireExist= false;
const QuestionnaireForm = () => {
  const [questionnaire, setQuestionnaire] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    type: 'text',
    options: [],
  });
  const [editIndex, setEditIndex] = useState(-1);
  useEffect(()=>{
    const token = localStorage.getItem('jwt');
    const cleanedToken = token.replace('Bearer ', '');
  
    if (cleanedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    const fetchQuestionnaire = async () => {
      try {
        const response = await axios.get('/medecin/questionnaire');
        const questions = response.data.Questions  
        if(questions.length !== 0) QuestionnaireExist = true;
        setQuestionnaire(questions)
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    fetchQuestionnaire();
  },[])
  
  const handleQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      [e.target.name]: e.target.value
    });
  };

  const handleTypeChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      type: e.target.value,
      options: []
    });
  };

  const handleOptionChange = (index, e) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = e.target.value;

    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions
    });
  };

  const addQuestion = () => {
    setQuestionnaire([...questionnaire, currentQuestion]);
    setCurrentQuestion({
      question: '',
      type: 'text',
      options: [],
    });
  };
  const EditQuestion = (index)=>{
    questionnaire[index] = currentQuestion
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      let response ={}
      if(!QuestionnaireExist){
         response = axios.post('/medecin/questionnaire',questionnaire);
      }else{
        response = axios.patch('/medecin/questionnaire',questionnaire);
      }
      
      console.log(response.data)
      setQuestionnaire(response.data.Questions)
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
    console.log('questionnare',questionnaire);
    // Reset questionnaire
    // setQuestionnaire([]);
  };

  const handleEditQuestion = (index) => {
    setEditIndex(index);
    console.log('questionnaire[index] ',questionnaire[index] )

    setCurrentQuestion(questionnaire[index]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestionnaire = [...questionnaire];
    updatedQuestionnaire.splice(index, 1);
    setQuestionnaire(updatedQuestionnaire);
  };

  return (
    <>
      <h3>Créer votre propre questionnaire qui sera visible a tous vos patients.<br/>
      Ajouter tous les questions que vous voulez savoir de vos patients.</h3>
      <div className="questionnaire-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              name="question"
              value={currentQuestion.question}
              onChange={handleQuestionChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              value={currentQuestion.type}
              onChange={handleTypeChange}
            >
              <option value="text">Text</option>
              <option value="radio">Radio</option>
            </select>
          </div>
          {currentQuestion.type === 'radio' && (
            <div className="form-group">
              <label>Options:</label>
              {currentQuestion.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e)}
                  />
                </div>
              ))}
              <button
              className='buttonQuestionaire '
                type="button"
                onClick={() =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    options: [...currentQuestion.options, '']
                  })
                }
              >
                Add Option
              </button>
            </div>
          )}
          {editIndex === -1 ? (
                      <button className='buttonQuestionaire ' type="button" onClick={addQuestion}>
                        Ajouter Question
                      </button>
          ) : (
            <button className='buttonQuestionaire ' type="button" onClick={EditQuestion(editIndex)}>
            Modifier Question
          </button>
          )}

          {questionnaire.length > 0 && (
  <div className="questionnaire-preview">
    <h3>Aperçu du questionnaire :</h3>
    <table>
      <thead>
        <tr>
          <th>Question</th>
          <th>Type</th>
          <th>Options</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {questionnaire.map((question, index) => (
          <tr key={index}>
            <td>{question.question}</td>
            <td>{question.type}</td>
            <td>
              {question.type === 'radio' ? question.options.join(', ') : '-'}
            </td>
            <td>
              <button
                type="button"
                className="edit-button"
                onClick={() => handleEditQuestion(index)}
              >
                Modifier
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDeleteQuestion(index)}
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

          {!QuestionnaireExist? (
            <button type="submit" className='buttonQuestionaire ' onClick={handleSubmit} >Soumettre le questionnaire</button>
          ):(
            <button type="submit" className='buttonQuestionaire ' onClick={handleSubmit} >modifier le questionnaire</button>
          )
            }
        </form>
      </div>
    </>
  );
};

export default QuestionnaireForm;

