import React, {useEffect, useState} from "react";
import {bake_cookie, read_cookie, delete_cookie} from 'sfcookies';
import userService from '../services/user-service'
import {GoogleLogin} from 'react-google-login';
import {Link} from "react-router-dom";

const Login = () => {

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const googleResponseSuccess = async (response) => {
        const givenName = response.profileObj.givenName
        const familyName = response.profileObj.familyName
        const email = response.profileObj.email
        const user = {
            fistName: givenName,
            lastName: familyName,
            userName: email,
            type: 'guest'
        }
        setUser(user)

        bake_cookie("firstName", givenName)
        bake_cookie("lastName", familyName)
        bake_cookie("email", email)
        bake_cookie("type", 'guest')

        const userId = await userService.createUser(user)
        bake_cookie("userId", userId)
        bake_cookie('loginCookie', true)

        setIsLoggedIn(true)
    }

    const googleResponseFail = (response) => {
        delete_cookie('loginCookie')
    }

    const removeCookies = () => {
        delete_cookie('fistName')
        delete_cookie('lastName')
        delete_cookie('email')
        delete_cookie('type')
        delete_cookie('userId')
        delete_cookie('loginCookie')

        setIsLoggedIn(false)
    }

    useEffect(() => {
        const isLogin = read_cookie('loginCookie')
        if (isLogin === true) {
            setIsLoggedIn(true)
        }
    }, [isLoggedIn])


    return (
        <div>
            {
                !isLoggedIn &&
                <GoogleLogin
                    clientId="519872074561-ss1f3872mr5lqv5adfo9ce3k8t0djsul.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={googleResponseSuccess}
                    onFailure={googleResponseFail}
                    cookiePolicy={"single_host_origin"}
                />
            }
            {
                isLoggedIn &&
                <div>
                    <Link to="/profile">
                        <button className="btn btn-light">
                            Profile
                        </button>
                    </Link>
                    <button className="btn btn-light"
                            onClick={removeCookies}>
                        Log out
                    </button>
                </div>

            }
        </div>
    )

}

// stpm dtpm??

export default Login