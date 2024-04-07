import styles from './SignUp.module.scss';
import SideSignup from "./SideSignup.js";
import FormSignup from "./FormSignup.js";

function SignUp() {
    return (
        
            <div className={styles['SignUp']}>
                <SideSignup/>
                <span className={styles['spanOr']}>hoặc</span>
                <FormSignup/>
            </div>
       
    );
}

export default SignUp;
