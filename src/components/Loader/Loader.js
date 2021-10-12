import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from '../Loader/Loader.module.css';

function Spinner() {
  return (
    <div className={styles.loaderContainer}>
      <Loader
        className="Loader"
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div>
  );
}

export default Spinner;
