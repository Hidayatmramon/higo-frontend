import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProgressBar() {
  const [progress, setProgress] = useState({ current: 0, status: 'idle' });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get('https://backend.hidayatmramon.me:5000/api/customers/progress');
        setProgress(res.data);
      } catch (err) {
        console.error('Gagal ambil progress:', err.message);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <p>Status: {progress.status}</p>
      {progress.status === 'processing' && (
        <div style={{ width: '100%', background: '#eee', height: '20px' }}>
          <div
            style={{
              width: `${Math.min((progress.current / 9000000) * 100, 100)}%`,
              background: '#28a745',
              color: 'white',
              height: '100%',
              textAlign: 'center',
            }}
          >
            {progress.current.toLocaleString()} rows
          </div>
        </div>
      )}
      {progress.status === 'done' && <p>Proses selesai</p>}
      {progress.status === 'error' && <p>Gagal proses data</p>}
    </div>
  );
}
