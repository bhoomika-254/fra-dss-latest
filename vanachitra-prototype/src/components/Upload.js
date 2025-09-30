import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload = () => {
    const navigate = useNavigate();
    const [pdfFile, setPdfFile] = useState(null);
    const [shapeFile, setShapeFile] = useState(null);
    const [results, setResults] = useState(null);
    const [processing, setProcessing] = useState(false);

    const goBack = () => {
        navigate('/');
    };

    const handleFileSelect = (file, type) => {
        if (type === 'pdf') {
            setPdfFile(file);
        } else {
            setShapeFile(file);
        }
    };

    const processFiles = () => {
        if (!pdfFile || !shapeFile) return;
        setProcessing(true);
        
        // Simulate processing
        setTimeout(() => {
            setResults({
                claim_id: "IFR001-TG",
                name: "Sample Claimant",
                village: "Sample Village",
                status: "Approved"
            });
            setProcessing(false);
        }, 2000);
    };

    const FileUploadArea = ({ type, file, onFileSelect }) => {
        const handleFileChange = (e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                onFileSelect(selectedFile, type);
            }
        };

        return (
            <div className="file-upload-area">
                <h3>{type === 'pdf' ? 'PDF Document' : 'Shapefile'}</h3>
                <input
                    type="file"
                    accept={type === 'pdf' ? '.pdf' : '.shp,.zip'}
                    onChange={handleFileChange}
                    className="file-input"
                />
                {file && (
                    <div className="file-info">
                        <p>✅ {file.name}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="upload-page" id="uploadPage">
            <div className="upload-header">
                <button className="back-btn" onClick={goBack}>← Back</button>
                <h1>🌲 FRA Document Upload</h1>
                <p>Upload PDF documents and shapefiles for AI-powered analysis</p>
            </div>

            <div className="upload-content">
                <div className="upload-grid">
                    <div className="upload-section">
                        <FileUploadArea type="pdf" file={pdfFile} onFileSelect={handleFileSelect} />
                    </div>
                    <div className="upload-section">
                        <FileUploadArea type="shape" file={shapeFile} onFileSelect={handleFileSelect} />
                    </div>
                </div>

                <div className="process-section">
                    <button 
                        className={`process-btn ${processing ? 'processing' : ''}`}
                        onClick={processFiles} 
                        disabled={!pdfFile || !shapeFile || processing}
                    >
                        {processing ? 'Processing...' : 'Process Documents'}
                    </button>
                </div>

                {results && (
                    <div className="results-section">
                        <h3>Results</h3>
                        <div className="result-item">
                            <p><strong>Claim ID:</strong> {results.claim_id}</p>
                            <p><strong>Name:</strong> {results.name}</p>
                            <p><strong>Village:</strong> {results.village}</p>
                            <p><strong>Status:</strong> {results.status}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Upload;
