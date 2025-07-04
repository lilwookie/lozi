import NavBar from '@/components/navbar/navbar'; // adjust path if needed
import styles from './layout.module.css'; // optional custom styles

export default function PreviewLayout({ children }) {
  return (
    <div className={styles.previewLayout}>
      <NavBar className={styles.navbar} />
        <main className={styles.main}>{children}</main>
    </div>
  );
}
