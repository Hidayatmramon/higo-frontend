import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from '../styles/layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <Navbar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
