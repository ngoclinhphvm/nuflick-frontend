import styles from "./Login.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import accountApi from "../../api/modules/account.api.js";
import {useAuth} from "../../hooks/AuthContext.js";

function FormLogin({ onLoginSuccess }) {
    // console.log("re-render login");
    const [showMess, setShowMess] = useState(false);
    const navigate = useNavigate();
    const { handleLogin } = useAuth();
    const [formData, setFormData] = useState(
        {email: '', password: ''}
    );
   // const onLoginSuccess = () => {  };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: formData.email,
            password: formData.password
        }
        const username = data.email.substring(0, data.email.indexOf('@'));
        accountApi.login(data).then((res) => {
            console.log(res);
            if (!res.success) {
                setShowMess(true);
            } else {
                localStorage.setItem('token', res.token);
                handleLogin(res.user);

                if (typeof onLoginSuccess === 'function') {
                    onLoginSuccess();
                }else{
                    console.log("not function");
                }
                
                navigate('/account/' + username);
            }
        })

    }

    const handleChange = (event) => {
        setShowMess(false);
        setFormData({
                        ...formData,
                        [event.target.name]: event.target.value
                    });
    }

    return (
        <form className={styles['formGroup']} onSubmit={handleSubmit}>
        
            <div className={styles['formInput']}>
                <span className={styles['headInput']}>Email của bạn là gì?</span>
                <input type={'email'} name={'email'} className={styles['inputData']} placeholder='Nhập email của bạn.'
                    onChange={handleChange} required></input>
            </div>
            <div className={styles['formInput']}>
                <span className={styles['headInput']}>Nhập mật khẩu</span>
                <input type={'password'} name={'password'} className={styles['inputData']} placeholder='Nhập mật khẩu.'
                    onChange={handleChange} required></input>
            </div>
            {showMess && <span className={styles['login-status']}>
                Đăng nhập thất bại, email hoặc mật khẩu không đúng
            </span>}
            <div className={styles['footerLogin']}>
                <span className={styles['fogotPassword']}>Bạn đã quên mật khẩu?</span>
                <button type='submit' className={styles['submitLogin']}>
                    Đăng nhập
                </button>
                <span className={styles['hasAccount']}>
                        Bạn chưa có tài khoản?
                        <Link className={styles['hasAccountLink']} to={'/signup'}> Đăng ký</Link>
                </span>
            </div>
        </form>
    )
}

export default FormLogin;