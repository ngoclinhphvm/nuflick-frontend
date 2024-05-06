import styles from "./SignUp.module.css";
import accountApi from "../../api/modules/account.api.js";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormSignup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        { username: '',email: '', password: '', confirmPassword: '', name: '', gender: null}
    );
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.password.length < 6) {
            setMessage("Mật khẩu tối thiểu 6 kí tự");
            setShowMessage(true);
        }
        else if (formData.password !== formData.confirmPassword) {
            setMessage("Mật khẩu xác nhận không khớp");
            setShowMessage(true);
        }
        else {
            const data = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                name: formData.name,
                gender: formData.gender
            }
            accountApi.signUp(data).then(res => {
                if (res === 0) {
                    setMessage("Email đã được sử dụng");
                    setShowMessage(true);
                } else {
                    accountApi.sendOTPVerify({email: formData.email}).then(res => {
                        if(res.success === "true") {
                            toast.success("Mã xác nhận đã được gửi đến email của bạn");
                            navigate('/verify-otp');
                        }else {
                            toast.error("Có lỗi xảy ra");
                        }
                    });
                    const user = {email: res.email, _id: res._id};
                    localStorage.setItem('user', JSON.stringify(user));
                    toast.success("Đăng ký thành công");
                    navigate('/login');
                }
            });
        }
    }

    const handleChange = (event) => {
        setShowMessage(false);
        setFormData({
                        ...formData,
                        [event.target.name]: event.target.value
                    });
    }

    return (
        <form className={styles['formGroup']} onSubmit={handleSubmit}>

            <div className={styles['formInput']}>
                <span className={styles['headInput']}>Username của bạn là gì?</span>
                <input type={'username'} name='username' className={styles['inputData']} placeholder='Nhập username của bạn.'
                    onChange={handleChange} required></input>
            </div>
            <div className={styles['formInput']}>
                <span className={styles['headInput']}>Email của bạn là gì?</span>
                <input type={'email'} name='email' className={styles['inputData']} placeholder='Nhập email của bạn.'
                    onChange={handleChange} required></input>
            </div>
            <div className={styles['formInput']}>
                <span className={styles['headInput']}>Tạo mật khẩu</span>
                <input type={'password'} name='password' className={styles['inputData']} placeholder='Tạo mật khẩu.'
                    onChange={handleChange} required></input>
            </div>
            <div className={styles['formInput']}>
                <span className={styles['headInput']}>Xác nhận lại mật khẩu</span>
                <input type={'password'} name='confirmPassword' className={styles['inputData']}
                    placeholder='Nhập lại mật khẩu.'
                    onChange={handleChange} required></input>
            </div>
            <div className={styles['formInput']}>
                <span className={styles['headInput']}>Họ tên của bạn</span>
                <input type={'text'} name='name' className={styles['inputData']} placeholder='Nhập họ tên của bạn .'
                    onChange={handleChange} required></input>
            </div>
            <div className={styles['inputGender']}>
                <span className={styles['headInputGender']}>Giới tính của bạn:</span>
                <div className={styles["radioInputGender"]}>
                    <input className={styles.radioInput} id="radioInputMale" name='gender' type="radio"
                        onChange={handleChange} value="male"></input>
                    <label className={styles["radio-label"]}>Nam</label>
                </div>
                <div className={styles["radioInputGender"]}>
                    <input className={styles.radioInput} id="radioInputFemale" name='gender' type="radio"
                        onChange={handleChange} value="female"></input>
                    <label className={styles["radio-label"]}>Nữ</label>
                </div>
                <div className={styles["radioInputGender"]}>
                    <input className={styles.radioInput} id="radioInputDiff" name='gender' type="radio"
                        onChange={handleChange} value="other"></input>
                    <label className={styles["radio-label"]}>Khác</label>
                </div>
            </div>
            {showMessage && <div className={styles['warning']}>{message}</div>}
            <button type='submit' className={styles['submitSignUp']}>Đăng ký
            </button>
            <span className={styles['hasAccount']}>
                {`Bạn có tài khoản? `}
                <Link className={styles['hasAccountLink']} to={'/login'}>Đăng nhập</Link>
            </span>

        </form>
    )
}
function SignUp() {
    return (
            <div className={styles['SignUp']}>
                <h1 className={styles['headingSignUp']}>
                Đăng ký tài khoản
                </h1>
                <FormSignup/>
            </div>
    );
}

export default SignUp;