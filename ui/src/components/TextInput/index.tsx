import * as React from 'react'
import styles from './styles.module.scss'
import profanityFilter from '../../utils/profanityFilter'


type Props = {
  onSubmit: (content: string) => unknown,
  onChange?: (content: string) => unknown,
  buttonContent?: string,
  placeholder?: string,
  inputStyle?: Object
}

const defaultPlaceholder = "Join the conversation..."

type State = {
  content: string
}

class TextInput extends React.Component<Props, State> {
  state = {
    content: ''
  }

  onSubmit = () => {
    const { content } = this.state
    if (!content) return
    this.props.onSubmit(profanityFilter(content))
    this.setState({ content: '' })
  }

  render() {
    const { placeholder, buttonContent, inputStyle } = this.props
    const { content } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.inner}>
        <textarea
          className={styles.contentInput}
          placeholder={placeholder || defaultPlaceholder}
          onChange={e => {
            this.setState({ content: e.target.value })
            this.props.onChange && this.props.onChange(e.target.value)
          }}
          value={content}
          style={inputStyle}
        />
        <button
          className={styles.submitButton}
          onClick={this.onSubmit}
        >
          {buttonContent || 'Submit'}
        </button>
        </div>
      </div>
    )
  }
}

export default TextInput

