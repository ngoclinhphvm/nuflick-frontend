import styles from "./Login.module.scss";

function SideLogin() {
    return(
        <div className={styles['buttons']}>
            <button type='button' className={styles['btnLoginFacebook']}>
                <i className={`${styles.iconLogin} fa-brands fa-facebook`}></i>
                Đăng nhập bằng Facebook
            </button>

            <button type='button' className={styles['btnLoginGoogle']}>
                <i className={`${styles.iconGoogleLogin} fa-brands fa-google`}></i>
                Đăng nhập bằng Google
            </button>
        </div>
    )
}

export default SideLogin;