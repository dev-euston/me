import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useContactForm } from '../../hooks/useContactForm'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const SUCCESS_RESET_DELAY_MS = 2000

const fieldClass =
  'w-full rounded-lg bg-transparent border border-[var(--color-muted)] px-4 py-2 text-left focus:outline-none focus:border-[var(--color-accent)]'
const errorClass = 'mt-1 text-sm text-left text-red-500'

export function ContactForm() {
  const { state, errors, formData, handleChange, handleSubmit, reset } = useContactForm()
  const reducedMotion = useReducedMotion()
  const submitting = state === 'submitting'

  useEffect(() => {
    if (state !== 'success') return
    const timer = setTimeout(reset, SUCCESS_RESET_DELAY_MS)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset only calls stable state setters
  }, [state])

  const messageMotion = {
    initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.3 },
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 mb-8">
      {state === 'success' && (
        <motion.div role="status" className="text-[var(--success)]" {...messageMotion}>
          Message sent!
        </motion.div>
      )}
      {state === 'error' && errors.submit && (
        <motion.div role="alert" className="text-red-500" {...messageMotion}>
          {errors.submit}
        </motion.div>
      )}

      <div>
        <label htmlFor="contact-name" className="block mb-1 text-left text-[var(--color-muted)]">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={submitting}
          aria-invalid={Boolean(errors.name)}
          className={fieldClass}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="block mb-1 text-left text-[var(--color-muted)]">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={submitting}
          aria-invalid={Boolean(errors.email)}
          className={fieldClass}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="block mb-1 text-left text-[var(--color-muted)]">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          disabled={submitting}
          aria-invalid={Boolean(errors.message)}
          className={fieldClass}
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-8 py-3 rounded-full bg-[var(--color-accent)] text-white disabled:opacity-60 transition-opacity"
      >
        {submitting ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
