import Layout from '../components/Layout';
import UploadForm from '../components/UploadForm';
import CustomerTable from '../components/CustomerTable';
import ProgressBar from '../components/ProgressBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [customers, setCustomers] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (pageNum = 1, search = searchTerm) => {
    try {
      const res = await axios.get(`https://backend.hidayatmramon.me:5000/api/customers?page=${pageNum}&limit=100&search=${encodeURIComponent(search)}`);
      setCustomers(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Gagal fetch data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchData(newPage);
    }
  };

  return (
    <Layout>
      <h1>Upload & Preview Data</h1>
      <UploadForm onUploadStart={() => setShowProgress(true)} onUploadComplete={() => fetchData(1)} />
      {showProgress && <ProgressBar />}

      <h2 style={{ marginTop: '30px' }}>Preview Data - Page {page}</h2>

      <input
        type="text"
        placeholder="Cari nama/email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && fetchData(1)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
      />

      <CustomerTable data={customers} />

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </Layout>
  );
}
