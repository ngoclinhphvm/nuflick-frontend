import styles from "./SignUp.module.scss";

function SideSignup() {
    return (
        <div>
            <h1 className={styles['headingSignUp']}>
                Movie
            </h1>
            <div className={styles['buttons']}>
                <button type='button' className={styles['btnSignUpFacebook']}>
                    <i className={`${styles.iconFacebookSignUp} fa-brands fa-facebook`}></i>
                    Đăng ký bằng Facebook
                </button>

                <button type='button' className={styles['btnSignUpGoogle']}>
                    <i className={`${styles.iconGoogleSignUp} fa-brands fa-google`}></i>
                    Đăng ký bằng Google
                </button>
            </div>
        </div>
    )
}

export default SideSignup;