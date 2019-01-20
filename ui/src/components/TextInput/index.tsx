import * as React from 'react'
import styles from './styles.module.scss'
import profanityFilter from '../../utils/profanityFilter'


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
    const { content } = this.state
    if (!content) return
    this.props.submit(profanityFilter(content))
    this.setState({ content: '' })
  }

  render() {
    const { placeholder } = this.props
    const { content } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.inner}>
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
      </div>
    )
  }
}

export default TextInput

