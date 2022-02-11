import React, {useEffect} from "react";
import styles from "./App.module.scss"
import {HashRouter, Link, Route, Routes} from "react-router-dom";
import {LoginPage} from "./components/pages/p1- loginization/l1-login/login-page";
import {RegistrationPage} from "./components/pages/p1- loginization/l2-registration/registration-page";
import {ProfilePage} from "./components/pages/p2-profile/profile-page";
import {CreateNewPassPage} from "./components/pages/p1- loginization/l4-create-new-pass/create-new-pass-page";
import {PassRecoveryPage} from "./components/pages/p1- loginization/l3-pass-recovery/pass-recovery-page";
import {Error404Page} from "./components/pages/p3-error/error404-page";
import {TestPage} from "./components/pages/p4-test/test-page";
import {useDispatch, useSelector} from "react-redux";
import {isAuthUserT, logoutUserT} from "./components/bll/b1-reducers/app/app-reducer";
import {AppStateType} from "./components/bll/b2-store/store";
import {Preloader} from "./common/c2-components/c4-Preloader/Preloader";
import SuperButton from "./common/c2-components/c2-SuperButton/SuperButton";

export const App = () => {

    const dispatch = useDispatch()
    const isFetching = useSelector<AppStateType, boolean>(state => state.app.isFetching)
    const isLoggedIn = useSelector<AppStateType, boolean>((state => state.login.isLoggedIn))

    useEffect(() => {
        dispatch(isAuthUserT())
    }, [])

    if (isFetching) {
        return <Preloader/>
    }

    const logout = () => {
        dispatch(logoutUserT())
    }

    return (
        <div className={styles.container}>
            <HashRouter>
                <nav>
                    <Link to={"login"}>Login</Link>
                    <Link to={"registration"}>Registration</Link>
                    <Link to={"recovery"}>Recovery pass</Link>
                    <Link to={"pass"}>New Pass</Link>
                    <Link to={"error"}>404</Link>
                    <Link to={"test"}>Test</Link>
                    <Link to={"profile"}>Profile</Link>
                </nav>


                {
                    isLoggedIn && <SuperButton onClick={logout}>
                        Logout
                    </SuperButton>
                }

                <div className={styles.contentContainer}>
                    <Routes>
                        <Route path={"login"} element={<LoginPage/>}/>
                        <Route path={"registration"} element={<RegistrationPage/>}/>
                        <Route path={"profile"} element={<ProfilePage/>}/>
                        <Route path={"recovery"} element={<PassRecoveryPage/>}/>
                        <Route path={"pass/:token"} element={<CreateNewPassPage/>}/>
                        <Route path={"error"} element={<Error404Page/>}/>
                        <Route path={"test"} element={<TestPage/>}/>
                    </Routes>
                </div>
            </HashRouter>
        </div>
    );
}
