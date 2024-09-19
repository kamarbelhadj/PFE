import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../component/style/dossierView.css';

const LettreDeReferenceComponent = ({patientId}) => {
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await axios.get(`/medecin/refDoc?patientId=${patientId}`);
      setAnalyses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = (fileName) => {
    axios.get(`/medecin/AfficheDoc/${fileName}` )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {analyses.length === 0 ? (
        <p>Aucun Lettre De Reference disponible.</p>
      ) : (
        <div className="container">
          <div className="row">
            {analyses.map((analysis) => (
              <div key={analysis.fileName} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{analysis.fileName}</h5>
                    <p className="card-text">Description: {analysis.description}</p>
                    <p className="card-text">Medecin: {analysis.Medecin}</p>
                    <p className="card-text">Date: {analysis.Date}</p>
                    <button
                      className="btn btn-primary"
                      style={{ width: "10rem" }}
                      onClick={() => handleDownload(analysis.path)}
                    >
                      View File
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
        };

const RapportMedicaleComponent = ({patientId}) => {
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await axios.get(`/medecin/rapportDoc?patientId=${patientId}`);
      setAnalyses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = (fileName) => {
    axios.get(`/medecin/AfficheDoc/${fileName}` )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {analyses.length === 0 ? (
        <p>Aucun rapport disponible.</p>
      ) : (
        <div className="container">
          <div className="row">
            {analyses.map((analysis) => (
              <div key={analysis.fileName} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{analysis.fileName}</h5>
                    <p className="card-text">Description: {analysis.description}</p>
                    <p className="card-text">Medecin: {analysis.Medecin}</p>
                    <p className="card-text">Date: {analysis.Date}</p>
                    <button
                      className="btn btn-primary"
                      style={{ width: "10rem" }}
                      onClick={() => handleDownload(analysis.path)}
                    >
                      View File
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
            }
  

const OrdonnanceComponent = ({patientId}) => {
  const [analyses, setAnalyses] = useState([]);
  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await axios.get(`/medecin/ordDoc?patientId=${patientId}`);
      setAnalyses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = (fileName) => {
    axios.get(`/medecin/AfficheDoc/${fileName}` )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        
      })
      .catch((error) => {
        console.error(error);
      });
        };

        return (
          <>
            {analyses.length === 0 ? (
              <p>Aucune ordonnance disponible.</p>
            ) : (
              <div className="container">
                <div className="row">
                  {analyses.map((analysis) => (
                    <div key={analysis.fileName} className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{analysis.fileName}</h5>
                          <p className="card-text">Description: {analysis.description}</p>
                          <p className="card-text">Medecin: {analysis.Medecin}</p>
                          <p className="card-text">Date: {analysis.Date}</p>
                          <button
                            className="btn btn-primary"
                            style={{ width: "10rem" }}
                            onClick={() => handleDownload(analysis.path)}
                          >
                            View File
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        );
        
};


const AnalyseComponent = ({ patientId }) => {
  const [analyses, setAnalyses] = useState([]);
  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await axios.get(`/medecin/analyseDoc?patientId=${patientId}`);
      setAnalyses(response.data);
    } catch (error) {
      console.error(error);
    }
    
  };

  const handleDownload = (fileName) => {
    axios.get(`/medecin/AfficheDoc/${fileName}` )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
      if (analyses.length === 0) {
        return <p>Aucune analyse disponible.</p>;
      }
  };

  return (
    <>
      {analyses.length === 0 ? (
        <p>Aucune analyse disponible.</p>
      ) : (
        <div className="container">
          <div className="row">
            {analyses.map((analysis) => (
              <div key={analysis.fileName} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{analysis.fileName}</h5>
                    <p className="card-text">Description: {analysis.description}</p>
                    <p className="card-text">Medecin: {analysis.Medecin}</p>
                    <p className="card-text">Date: {analysis.Date}</p>
                    <button
                      className="btn btn-primary"
                      style={{ width: "10rem" }}
                      onClick={() => handleDownload(analysis.path)}
                    >
                      View File
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
  
};



const DossierView = ({patientId}) => {
  console.log(patientId)
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [selectedFileType, setSelectedFileType] = useState('analyse');
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handleUpload = () => {

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('date', new Date().toISOString());
      formData.append('contentType', selectedFileType);
      formData.append('description', description);
      formData.append('patientId', patientId);
  
      axios.post('/medecin/upload/doc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          console.log('Upload successful:', response.data);
          // Handle any success actions
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          // Handle any error actions
        });
  
      setSelectedFile(null);
      setDescription('');
    };
  
    const handleFileTypeChange = (event) => {
      setSelectedFileType(event.target.value);
    };
  const [activeComponent, setActiveComponent] = useState('dossierView');
  const handleFileUpload = async (fileType, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (fileType === 'lettreDeReference') {
        setActiveComponent('lettreDeReference');
      } else if (fileType === 'rapport') {
        setActiveComponent('rapport');
      } else if (fileType === 'ordonnance') {
        setActiveComponent('ordonnance');
      } else if (fileType === 'analyse') {
        setActiveComponent('analyse');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Render the active component based on the current state
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'lettreDeReference':
        return <LettreDeReferenceComponent patientId={patientId} />;
      case 'rapport':
        return <RapportMedicaleComponent patientId={patientId} />;
      case 'ordonnance':
        return <OrdonnanceComponent patientId={patientId} />;
      case 'analyse':
        return <AnalyseComponent patientId={patientId}/>;
      default:
        return null; // Return null to hide the dossier-view-container
    }
  };

  return (
    <>
    <div className="file-description-component">
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <div className="mb-3">
              <select className="form-select" value={selectedFileType} onChange={e=>{
                setSelectedFileType(e.target.value)
              }}>
                <option value="rapport">Rapport</option>
                <option value="analyse">Analyse</option>
                <option value="ordonnance">Ordonnance</option>
                <option value="lettreDeReference">Lettre de réferance</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" onClick={handleUpload} style={{ width: '10rem', margin: '0px' }}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    <div>
      <div className="line-divider"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="upload-section">

              <div className="upload-buttons" style={{ margin: '0px' }}>
                <button className="btn btn-primary upload-button reference-button" onClick={() => handleFileUpload('lettreDeReference')}>
                  Lettre de Référence
                </button>
                <button className="btn btn-primary upload-button medical-button" onClick={() => handleFileUpload('rapport')}>
                  Rapport Médical
                </button>
                <button className="btn btn-primary upload-button ordonnance-button" onClick={() => handleFileUpload('ordonnance')}>
                  ordonnance
                </button>
                <button className="btn btn-primary upload-button analyse-button" onClick={() => handleFileUpload('analyse')}>
                  Analyse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderActiveComponent()}
    </div>
    </>  );
};

export default DossierView;
