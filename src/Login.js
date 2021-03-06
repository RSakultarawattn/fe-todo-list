import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        loading: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const user = await request
            .post('https://radiant-hamlet-61264.herokuapp.com/auth/signin')
            .send(this.state);

        this.setState({ loading: false })

        this.props.changeTokenAndUsername(user.body.email, user.body.token);

        this.props.history.push('/todos');
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Log in</h2>
                    <label>
                        Email:
                        <input
                            onChange={(e) => this.setState({ email: e.target.value })}
                            value={this.state.email} />
                    </label>
                    <label>
                        Password:
                        <input
                            onChange={(e) => this.setState({ password: e.target.value })}
                            value={this.state.password} type="password" />
                    </label>
                    {
                        this.state.loading
                            ? 'Spinnnerrrr'
                            : <button>
                                Log In!
                        </button>
                    }
                </form>
            </div>
        )
    }
}