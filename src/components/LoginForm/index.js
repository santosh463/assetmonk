import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.push('/posts')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  // eslint-disable-next-line consistent-return
  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state

    const data = {
      email,
      password,
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ACCESS-TOKEN',
      },
      body: JSON.stringify(data),
    }

    const res = await fetch('https://reqres.in/api/register', options)
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData)
      })
    if (res === true) {
      this.onSubmitSuccess()
    }
  }

  onChangeUsername = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state
    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="email"
          id="email"
          className="username-input-filed"
          value={email}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const {history} = this.props
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderEmailField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button
            type="submit"
            className="login-button"
            onClick={() => {
              history.push('/posts')
            }}
          >
            Login
          </button>
          {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
