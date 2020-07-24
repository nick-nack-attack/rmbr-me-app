// this component explains the functionality of the app
import React, { Component } from 'react';

// utils
import { Section } from '../../Utils/Utils';

// assets & style
import never_forget from '../../../assets/never_forget.png';
import listening_skills from '../../../assets/listening_skills.png';
import have_better from '../../../assets/have_better.png';
import '../Page.scss';

export default class LandingPage extends Component {

    handleSignUpNowClick = () => {
        const { history } = this.props;
        const destination = '/sign-up';
        history.push(destination);
    }

    render() {
        return (
            <div className="landing-page-div">
                <Section className="landing-page-section">
                    <img src={listening_skills} alt='lightning bolt listening to a comment'/>
                    <h3>Improve your listening skills</h3>
                    <p>rmbrme helps you remember things about your friends and family so you can be more engaged in their lives.</p>
                </Section>
                <Section className="landing-page-section">
                    <img src={never_forget} alt='lightning bolt remembering a comment'/>
                    <h3>Never forget a detail</h3>
                    <p>Stay up-to-date on the people who matter to you.</p>
                </Section>
                <Section className="landing-page-section">
                    <img src={have_better} alt='lightning bolt remembering comment'/>
                    <h3>Have better relationships</h3>
                    <p>People will appreciate you more as you remember things they've said.</p>
                </Section>
                <Section className="landing-page-section last-section">
                    <div className="cta-div">
                        <h3>No more forgetting or regretting</h3>
                            <button
                                onClick={() => this.handleSignUpNowClick()}
                                className='sign_up_button'
                            >
                                Sign Up Now
                            </button>
                    </div>
                </Section>
            </div>
        );
    };
};