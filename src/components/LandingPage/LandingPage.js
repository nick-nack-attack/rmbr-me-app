import React, { Component } from 'react';
import never_forget from '../../assets/never_forget.png'
import listening_skills from '../../assets/listening_skills.png'
import have_better from '../../assets/have_better.png'
import { Section } from '../Utils/Utils'

export default class LandingPage extends Component {

    handleSignUpNowClick = () => {
        const { history } = this.props;
        const destination = '/sign-up';
        history.push(destination);
    }

    render() {
        return (
            <Section
                className='landing_page_section'
            >
                <header
                    className='landing_page_header'
                >
                    <h2>No more forgetting or regretting</h2>
                </header>
                <section>
                    <img
                        src={listening_skills}
                        alt='lightning bolt listening to a comment'
                    />
                    <header>
                        <h3>Improve your listening skills</h3>
                    </header>
                    <p>rmbrme helps you remember things about your friends and family so you can be more engaged in their lives.</p>
                </section>
                <section>
                    <img
                        src={never_forget}
                        alt='lightning bolt remembering a comment'
                    />
                    <header>
                        <h3>Never forget a detail</h3>
                    </header>
                    <p>Stay up-to-date on the people who matter to you.</p>
                </section>
                <section>
                    <img
                        src={have_better}
                        alt='lightning bolt remembering comment'
                    />
                    <header>
                            <h3>Have better relationships</h3>
                    </header>
                    <p>People will appreciate you more as you remember things they've said.</p>
                </section>
                <section>
                    <header
                        className='sign_up_cta'
                    >
                        <h3>No more forgetting or regretting</h3>
                    </header>
                    <button
                        onClick={() => this.handleSignUpNowClick()}
                        className='sign_up_button'
                    >
                        Sign Up Now
                    </button>
                </section>
            </Section>
        );
    };
};