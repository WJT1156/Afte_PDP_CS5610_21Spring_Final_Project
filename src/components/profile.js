import {useEffect, useState} from "react";
import {bake_cookie, read_cookie} from "sfcookies";
import userService from "../services/user-service"


const Profile = () => {

    const [user, setUser] = useState({
        firstName: read_cookie("firstName"),
        lastName: read_cookie("lastName"),
        type: read_cookie("type"),
        userId: read_cookie("userId")
    })

    const updateInfo = () => {
        userService.updateUser(user)
        bake_cookie("firstName", user.firstName)
        bake_cookie("lastName", user.lastName)
        bake_cookie("type", user.type)
    }

    // useEffect(() => {
    //     const userId = read_cookie("userId")
    //     userService.findUserById(userId)
    //         .then(user => setUser(user))
    // }, [])

    if(read_cookie('loginCookie') !== true) {
        return (
            <h1>Please log in by clicking the button on the right head.</h1>
        )
    } else {
        return (

            <div>
                <h2>User Profile</h2>

                <form className="ml-5">
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="firstName"
                                   value={user.firstName}
                                   onChange={(e) => {
                                   setUser({...user, firstName: e.target.value})
                                   }}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="lastName"
                                   value={user.lastName}
                                   onChange={(e) => {
                                       setUser({...user, lastName: e.target.value})
                                   }}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-5">
                            <input type="text" readOnly className="form-control" id="staticEmail"
                                   value={read_cookie("email")}/>
                        </div>
                    </div>
                    <div className="form-group row">

                        <label className="col-sm-2 col-form-label" htmlFor="type">User Type</label>
                        <div className="col-sm-5">
                            <select className="custom-select"
                                    id="type" value={user.type}
                                    onChange={(e) => {
                                        setUser({...user, type: e.target.value})
                                    }}>
                                <option value="Guest">Guest</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label  className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-5">
                            <button className="btn btn-primary btn-block"
                                    onClick={() => {
                                        updateInfo()
                                    }}>update info</button>
                        </div>
                    </div>
                </form>
            </div>
        )}
}

export default Profile
