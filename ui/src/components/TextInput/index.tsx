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
      />
      <button
        className={styles.submitButton}
        onClick={() => {
          onSubmit(content)
          setContent('')
        }}
      >
        {buttonContent || 'Submit'}
      </button>
      </div>
    </div>
  )
}

export default TextInput
