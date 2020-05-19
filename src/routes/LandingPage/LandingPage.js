import React, { Component } from 'react';

class LandingPage extends Component {

    render() {
        console.log('landing page is running...');
        return (

            <div>
                <header>
                    <h1>rmbrme</h1>
                    <h2>be a better buddy and bro</h2>
                </header>
                <section>
                <header>
                    <h3>Improve your listening skills</h3>
                </header>
                    <p>[ <em>placeholder for photo showing person with big ears</em> ]</p>
                    <p>rmbrme helps you remember things about your friends and family so you can be more engaged in their lives.</p>
            </section>
            <section>
                <header>
                    <h3>Never forget a detail</h3>
                </header>
                    <p>[ <em>placeholder for photo showing person with laser eyes</em> ]</p>
                    <p>Stay up-to-date on the people you love or like a lot.</p>
            </section>
            <section>
                <header>
                    <h3>Have better relationships</h3>
                </header>
                    <p>[ <em>placeholder for photo showing person hugging a bunch of people</em> ]</p>
                    <p>People will appreciate you more as you remember more about them.</p>
            </section>
            <section>
                <header>
                    <h3>Start remembering now!</h3>
                </header>
                <form>
                    <div>
                        <label htmlFor="first-name">First name</label>
                        <input placeholder="First Name" type="text" name="first-name" id="first-name"/>
                    </div>
                    <div>
                        <label for="username">Email</label>
                        <input type="text" name="username" id="username"/>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password"/>
                    </div>
                    <div>
                        <button type="submit">Get started</button>
                    </div>
                </form>
            </section>
            </div>

        )

    }

}

export default LandingPage
