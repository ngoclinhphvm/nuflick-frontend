import styles from './Login.module.scss';
import SideLogin from './SideLogin.js';
import FormLogin from './FormLogin.js';

const Login = ({handleLogin}) => (
    <div className={styles['Login']}>
        <h1 className={styles['headingLogin']}>Movie</h1>
        <SideLogin/>
        <span className={styles['spanOr']}>hoặc</span>
        <FormLogin  onLoginSuccess={handleLogin} />
    </div>
);

export default Login;