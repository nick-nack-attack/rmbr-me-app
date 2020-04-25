import React, { Component } from 'react'

class SignUpPage extends Component {
    render(){
        return(
            <div>
                <header>
                    Sign up
                </header>
                <form>
                    <div>
                        <label>First Name </label>
                        <input />
                    </div>
                    <div>
                        <label>Email </label>
                        <input />
                    </div>
                    <div>
                        <label>Password </label>
                        <input />
                    </div>
                    <div>
                        <button>Sign up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUpPage