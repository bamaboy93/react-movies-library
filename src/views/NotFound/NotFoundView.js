import errorImage from '../../Images/empty.webp';
import styles from './NotFoundView.module.css';

export default function NotFoundView() {
  return (
    <div className={styles.wrapper}>
      <img
        src={errorImage}
        width="250"
        alt="nothing-found"
        style={{ marginTop: 50, width: 400 }}
      ></img>
    </div>
  );
}
