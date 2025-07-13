import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import styles from '../styles/dashboard.module.css';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get('https://backend.hidayatmramon.me/api/customers/stats')
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) return <Layout><p style={{ padding: '2rem' }}>Loading statistik...</p></Layout>;

  const createChartData = (label, data) => ({
    labels: data.map((item) => item._id || 'Other'),
    datasets: [
      {
        label,
        data: data.map((item) => item.count),
        backgroundColor: [
          '#4dc9f6',
          '#f67019',
          '#f53794',
          '#537bc4',
          '#acc236',
          '#166a8f',
        ],
      },
    ],
  });

  return (
    <Layout>
      <div className={styles.dashboard}>
        <h1 className={styles.heading}>Statistik Customer</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Gender</h3>
            <Pie data={createChartData('Gender', stats.gender)} />
          </div>

          <div className={styles.card}>
            <h3>Usia (Tahun Lahir)</h3>
            <Bar data={createChartData('Age', stats.age)} />
          </div>

          <div className={styles.card}>
            <h3>Brand Device</h3>
            <Bar data={createChartData('Brand Device', stats.brandDevice)} />
          </div>

          <div className={styles.card}>
            <h3>Minat Digital</h3>
            <Pie data={createChartData('Digital Interest', stats.digitalInterest)} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
