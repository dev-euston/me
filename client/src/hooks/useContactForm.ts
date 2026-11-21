import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

export type ContactFormState = 'idle' | 'submitting' | 'success' | 'error'

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

export const NAME_MAX_LENGTH = 100
export const MESSAGE_MAX_LENGTH = 1000
export const MISSING_ENDPOINT_ERROR = 'Unable to send message: configuration missing'
export const SEND_FAILED_ERROR = 'Unable to send message. Please try again.'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INITIAL_DATA: ContactFormData = { name: '', email: '', message: '' }

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const name = data.name.trim()
  const email = data.email.trim()
  const message = data.message.trim()

  if (!name) errors.name = 'Name is required'
  else if (name.length > NAME_MAX_LENGTH)
    errors.name = `Name must be ${NAME_MAX_LENGTH} characters or fewer`

  if (!email) errors.email = 'Email is required'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address'

  if (!message) errors.message = 'Message is required'
  else if (message.length > MESSAGE_MAX_LENGTH)
    errors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer`

  return errors
}

export function useContactForm(fetchFn: typeof fetch = (...args) => fetch(...args)) {
  const [state, setState] = useState<ContactFormState>('idle')
  const [errors, setErrors] = useState<ContactFormErrors & { submit?: string }>({})
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_DATA)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined, submit: undefined }))
    setState((prev) => (prev === 'error' ? 'idle' : prev))
  }

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()
    const validation = validateContactForm(formData)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined
    if (!endpoint) {
      setErrors({ submit: MISSING_ENDPOINT_ERROR })
      setState('error')
      return
    }

    setErrors({})
    setState('submitting')
    try {
      const response = await fetchFn(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setState('success')
    } catch {
      setErrors({ submit: SEND_FAILED_ERROR })
      setState('error')
    }
  }

  const reset = () => {
    setFormData(INITIAL_DATA)
    setErrors({})
    setState('idle')
  }

  return { state, errors, formData, handleChange, handleSubmit, reset }
}
