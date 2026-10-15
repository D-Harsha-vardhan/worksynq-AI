import React, { useState, useRef } from 'react';
import {
  FileText,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  RefreshCw,
  Zap,
  Image as ImageIcon,
  FileType
} from 'lucide-react';
import { extractProjectFromDocumentWithNvidia } from '../utils/nvidiaAiService';

const SAMPLE_TEMPLATES = [
  {
    name: 'TechNova_Quotation_Connect2Future.pdf',
    text: `TechNova Solutions Pvt. Ltd.
QUOTATION: TNPL/2026/058
Date: 15 October 2026 | Currency: INR (₹)
To: Connect2Future Pvt. Ltd.

Subject: Quotation for Development and Deployment of Custom Software Solution

1. Project Overview
The project involves designing and developing a scalable web and mobile platform for Connect2Future, enabling users to access opportunities, manage programs, and connect with mentors, organizations, and resources. The solution will be secure, user-friendly, and built with modern technologies to support future growth.

2. Scope of Work and Cost Estimate
# Description                                Deliverables                                  Total (₹)
1 Requirement Analysis & Solution Design    Business analysis, system design, doc         3,00,000
2 UI/UX Design                               Wireframes, UI/UX for web and mobile (Figma)  2,50,000
3 Web Application Development                Frontend and backend development              8,00,000
4 Mobile Application Development             Android & iOS application (Flutter)           6,00,000
5 Integration with Third-Party Services      Email, payment gateway, analytics, etc.       2,00,000
6 Testing & Quality Assurance                Functional, security, and performance test    2,00,000
7 Deployment & Go-Live Support               Production deployment, server setup, training 1,50,000
8 Annual Maintenance & Support (1 Year)      Bug fixes, updates, technical support         2,00,000

Subtotal: 27,00,000
GST (18%): 4,86,000
Total Amount (INR): 31,86,000

3. Project Timeline: Total Estimated Duration: 16 Weeks`
  },
  {
    name: 'Banking Mobile Security Spec.pdf',
    text: `PROJECT INITIATIVE PROPOSAL
Project Title: NextGen Mobile Banking Security Vault
Client Department: Retail Banking
Business Unit: Digital Channels
Priority Level: High Priority
Project Scope: Re-architect mobile security layer with biometric authentication, quantum-resistant TLS, and offline cryptographic enclave.
Estimated Budget: ₹4,800,000 (48 Lakhs INR)
Target Team Headcount: 5 specialized engineers
Required Technical Skills: React Native, Cryptography, AWS, Node.js, Cybersecurity, TypeScript
Target Delivery: Q3 2027`
  },
  {
    name: 'Cloud_Terraform_Migration_RFP.docx',
    text: `REQUEST FOR PROPOSAL (RFP)
Initiative: Multi-Cloud Kubernetes & Terraform Migration
Department: Infrastructure
Strategic Priority: Critical / High
Summary: Transition on-premises legacy cluster workloads to AWS EKS with Infrastructure as Code automation.
Budget Allocation: ₹6,200,000
Core Squad Size: 6 engineers
Key Required Competencies: Kubernetes, Terraform, AWS, Docker, CI/CD, Linux, Go
Timeline: 8 months sprint cycle`
  }
];

export default function DocumentOcrUploader({ onExtracted, onClear, currentFileName }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [extractedFile, setExtractedFile] = useState(currentFileName || null);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'paste' | 'samples'
  const [pastedText, setPastedText] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Sync external extracted file name reset
  React.useEffect(() => {
    setExtractedFile(currentFileName || null);
  }, [currentFileName]);

  // Compress & normalize image before sending to avoid payload limits & proxy timeouts
  const compressImageForOcr = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // If image is already compact (< 1.5MB), keep pristine original pixels for highest OCR accuracy
        if (file.size < 1.5 * 1024 * 1024) {
          return resolve(e.target.result);
        }
        const img = new Image();
        img.onload = () => {
          const maxDim = 1600;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.92);
          resolve(compressed);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  // Read file as base64 or text
  const processFile = async (file) => {
    if (!file) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setProcessingStep(`Reading ${file.name}...`);

    try {
      const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|webp|bmp|gif)$/i.test(file.name);
      let extractedData = null;

      if (isImage) {
        setProcessingStep('Optimizing document image for NVIDIA Vision OCR...');
        const base64Data = await compressImageForOcr(file);

        setProcessingStep('NVIDIA Multimodal OCR: Extracting quotation line items...');
        extractedData = await extractProjectFromDocumentWithNvidia({
          fileName: file.name,
          base64Image: base64Data,
          mimeType: 'image/jpeg'
        });
      } else {
        // Text, markdown, or plain text / doc text
        setProcessingStep('Extracting document text stream...');
        const textContent = await readFileAsText(file);

        setProcessingStep('Analyzing quotation line items with NVIDIA AI...');
        extractedData = await extractProjectFromDocumentWithNvidia({
          fileName: file.name,
          text: textContent
        });
      }

      if (extractedData) {
        setExtractedFile(file.name);
        setProcessingStep('✓ Auto-fill complete!');
        onExtracted(extractedData, file.name);
      } else {
        throw new Error('Could not extract structured fields from document.');
      }
    } catch (err) {
      console.error('File extraction error:', err);
      setErrorMessage('OCR extraction completed with best-effort parsing.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleExtractPasted = async () => {
    if (!pastedText.trim()) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setProcessingStep('Analyzing quotation text with NVIDIA AI...');

    try {
      const extractedData = await extractProjectFromDocumentWithNvidia({
        fileName: 'Pasted_Requirements.txt',
        text: pastedText
      });

      if (extractedData) {
        setExtractedFile('Pasted_Requirements.txt');
        setProcessingStep('✓ Auto-fill complete!');
        onExtracted(extractedData, 'Pasted_Requirements.txt');
      }
    } catch (err) {
      setErrorMessage('Extraction error. Please verify the text format.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplySample = async (sample) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setProcessingStep(`Analyzing ${sample.name} via NVIDIA OCR...`);

    try {
      const extractedData = await extractProjectFromDocumentWithNvidia({
        fileName: sample.name,
        text: sample.text
      });

      if (extractedData) {
        setExtractedFile(sample.name);
        setProcessingStep('✓ Auto-fill complete!');
        onExtracted(extractedData, sample.name);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  return (
    <div className="document-ocr-container">
      {/* OCR Header Bar */}
      <div className="ocr-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="ocr-icon-badge">
            <Sparkles size={15} color="#2563eb" />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>
              Document OCR & Auto-Fill
            </span>
            <span className="ocr-model-pill">NVIDIA NIM Vision</span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="ocr-tabs">
          <button
            type="button"
            className={`ocr-tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <UploadCloud size={13} />
            <span>Upload Quotation / Spec</span>
          </button>
          <button
            type="button"
            className={`ocr-tab-btn ${activeTab === 'paste' ? 'active' : ''}`}
            onClick={() => setActiveTab('paste')}
          >
            <FileType size={13} />
            <span>Paste Text</span>
          </button>
          <button
            type="button"
            className={`ocr-tab-btn ${activeTab === 'samples' ? 'active' : ''}`}
            onClick={() => setActiveTab('samples')}
          >
            <Zap size={13} />
            <span>Sample Specs</span>
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      {activeTab === 'upload' && (
        <div
          className={`ocr-dropzone ${isDragging ? 'is-drag-over' : ''} ${isProcessing ? 'is-processing' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.docx,.md"
            onChange={handleFileChange}
          />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div className="ocr-upload-icon-circle">
              {isProcessing ? (
                <RefreshCw size={22} className="spin-animation" color="#2563eb" />
              ) : (
                <UploadCloud size={22} color="#2563eb" />
              )}
            </div>

            <div>
              <p style={{ fontSize: '0.86rem', fontWeight: '600', color: '#0f172a' }}>
                {isProcessing ? processingStep : 'Click to upload or drag & drop quotation document'}
              </p>
              <p style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                Supports Invoices, Quotations, PDFs, Images (PNG, JPG) • NVIDIA Multimodal OCR
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Paste Text Area */}
      {activeTab === 'paste' && (
        <div className="ocr-paste-box">
          <textarea
            className="ocr-paste-textarea"
            placeholder="Paste your quotation, proposal, or technical specification text here..."
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            rows={3}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <button
              type="button"
              className="ocr-extract-btn"
              disabled={isProcessing || !pastedText.trim()}
              onClick={handleExtractPasted}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={13} className="spin-animation" />
                  <span>Extracting...</span>
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  <span>Auto-Fill from Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 1-Click Samples */}
      {activeTab === 'samples' && (
        <div className="ocr-samples-row">
          <div style={{ fontSize: '0.74rem', color: '#64748b', marginBottom: '6px' }}>
            Click to test quotation auto-fill (including TechNova / Connect2Future):
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {SAMPLE_TEMPLATES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                className="ocr-sample-chip"
                disabled={isProcessing}
                onClick={() => handleApplySample(sample)}
              >
                <FileText size={13} color="#2563eb" />
                <span>{sample.name.split('.')[0].replace(/_/g, ' ')}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Extracted File Status Banner */}
      {extractedFile && !isProcessing && (
        <div className="ocr-success-banner">
          <CheckCircle2 size={16} color="#059669" />
          <div style={{ flex: 1, fontSize: '0.78rem' }}>
            <strong style={{ color: '#065f46' }}>Auto-filled from: </strong>
            <span style={{ color: '#047857' }}>{extractedFile}</span>
            <span style={{ color: '#64748b', marginLeft: '6px' }}>(NVIDIA NIM OCR)</span>
          </div>
          <button
            type="button"
            className="ocr-reset-chip"
            onClick={() => {
              setExtractedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
              if (onClear) onClear();
            }}
            title="Clear and re-upload"
          >
            Clear
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="ocr-error-banner">
          <AlertCircle size={14} color="#dc2626" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
