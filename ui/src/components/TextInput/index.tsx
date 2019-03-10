import React, { useState } from 'react'
import styles from './styles.module.scss'
import profanityFilter from '../../utils/profanityFilter'

const defaultPlaceholder = "Join the conversation..."

type Props = {
  onSubmit: (content: string) => unknown,
  onChange?: (content: string) => unknown,
  buttonContent?: string,
  placeholder?: string,
  inputStyle?: Object
}

function TextInput ({
  placeholder,
  buttonContent,
  inputStyle,
  onSubmit,
  onChange,
}: Props) {
  const [content, setContent] = useState('')

  const submit = () => {
    onSubmit(content)
    setContent('')
  }
  const submitOnCommandEnter = (e: any) => {
    if (e.keyCode === 13 && e.metaKey) {
      submit()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
      <textarea
        className={styles.contentInput}
        placeholder={placeholder || defaultPlaceholder}
        onChange={e => {
          setContent(e.target.value)
          onChange && onChange(e.target.value)
        }}
        value={content}
        style={inputStyle}
        onKeyDown={submitOnCommandEnter}
      />
      <button
        className={styles.submitButton}
        onClick={submit}
      >
        {buttonContent || 'Submit'}
      </button>
      </div>
    </div>
  )
}

export default TextInput
