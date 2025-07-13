import { useState } from 'react';
import axios from 'axios';

export default function UploadForm({ onUploadStart, onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Pilih file dulu ya!');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus('Uploading...');
      setProgress(0);
      onUploadStart?.();

      await axios.post('https://backend.hidayatmramon.me/api/customers/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      setStatus('Upload selesai. Sedang diproses di server...');
      setTimeout(() => {
        onUploadComplete?.();
      }, 5000);
    } catch (err) {
      setStatus('Upload gagal: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>

      {progress > 0 && (
        <div style={{ width: '100%', background: '#ddd', height: '20px', marginTop: '10px' }}>
          <div
            style={{
              width: `${progress}%`,
              background: '#0070f3',
              height: '100%',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {progress}%
          </div>
        </div>
      )}
      <p>{status}</p>
    </form>
  );
}
