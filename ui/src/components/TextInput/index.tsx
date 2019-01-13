import * as React from 'react'
import styles from './styles.module.scss'

type Props = {
  submit: (content: string) => unknown,
  placeholder?: string
}

const defaultPlaceholder = "Join the conversation..."

type State = {
  content: string
}

class TextInput extends React.Component<Props, State> {
  state = {
    content: ''
  }

  submit = () => {
    this.props.submit(this.state.content)
    this.setState({ content: '' })
  }

  render() {
    const { placeholder } = this.props
    const { content } = this.state

    return (
      <div>
        <textarea
          className={styles.contentInput}
          placeholder={placeholder || defaultPlaceholder}
          onChange={e => this.setState({ content: e.target.value })}
          value={content}
        />
        <button
          className={styles.submitButton}
          onClick={this.submit}
        >
          Submit
        </button>
      </div>
    )
  }
}

export default TextInput

