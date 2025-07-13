import { useState } from 'react';

export default function CustomerTable({ data }) {
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey]?.toString().toLowerCase();
    const valB = b[sortKey]?.toString().toLowerCase();
    if (sortOrder === 'asc') return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div style={{ overflowX: 'auto', marginTop: '20px' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        {Array.isArray(data) && data.length > 0 ? (
          <>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    style={{
                      border: '1px solid #ccc',
                      padding: '8px',
                      background: '#f4f4f4',
                      cursor: 'pointer',
                    }}
                  >
                    {key} {sortKey === key ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} style={{ border: '1px solid #ccc', padding: '8px', fontSize: '0.9rem' }}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td colSpan="100%" style={{ padding: '20px', textAlign: 'center' }}>
                Tidak ada data untuk ditampilkan.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
