import React, { Component } from 'react';
import never_forget from '../../images/never_forget.png'
import listening_skills from '../../images/listening_skills.png'
import have_better from '../../images/have_better.png'

export default class UserLoggedOut extends Component {

    handleSignUpNowClick = () => {
        const { history } = this.props
        const destination = '/sign-up'
        history.push(destination)
    }

    render() {
        return (
            <div className='landing_page_div'>
                <header>
                    <h1>rmbrme</h1>
                    <h2>be a better buddy and bro</h2>
                </header>
                <section>
                    <img src={listening_skills}/>
                    <header>
                        <h3>Improve your listening skills</h3>
                    </header>
                    <p>rmbrme helps you remember things about your friends and family so you can be more engaged in their lives.</p>
                </section>
                <section>
                    <img src={never_forget}/>
                    <header>
                        <h3>Never forget a detail</h3>
                    </header>
                    <p>Stay up-to-date on the people you love or like a lot.</p>
                </section>
                <section>
                    <img src={have_better}/>
                    <header>
                        <h3>Have better relationships</h3>
                    </header>
                    <p>People will appreciate you more as you remember more about them.</p>
                </section>
                <section>
                    <header>
                        <h3>Start remembering now!</h3>
                    </header>
                    <button
                        onClick={() => this.handleSignUpNowClick()}
                    >
                        Sign Up Now
                    </button>
                </section>
            </div>

        )

    }

}