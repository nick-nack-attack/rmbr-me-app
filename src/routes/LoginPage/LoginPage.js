import React, { Component } from 'react'

class LoginPage extends Component {
    render(){
        return(
            <div>
                <header>
                    Log in
                </header>
                <form>
                    <div>
                        <label>Email </label>
                        <input />
                    </div>
                    <div>
                        <label>Password </label>
                        <input />
                    </div>
                    <div>
                        <button>Log in</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginPage