import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

vi.mock('framer-motion', async () => await import('../../test/mocks/framer-motion'))
const reducedMotion = vi.fn(() => false)
vi.mock('../../hooks/useReducedMotion', () => ({ useReducedMotion: () => reducedMotion() }))

import { ContactForm } from './index'

const fetchMock = vi.fn()

function fill(name = 'Jane', email = 'jane@example.com', message = 'Hello there') {
  fireEvent.change(screen.getByLabelText('Name'), { target: { name: 'name', value: name } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: email } })
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { name: 'message', value: message },
  })
}

const submit = () => fireEvent.click(screen.getByRole('button', { name: /send message|sending/i }))

describe('ContactForm', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    reducedMotion.mockReturnValue(false)
    vi.stubGlobal('fetch', fetchMock)
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'https://example.com/contact')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('renders three inputs and a submit button', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument()
  })

  it('shows errors for all empty fields without posting', () => {
    render(<ContactForm />)
    submit()
    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Message is required')).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects invalid email without posting', () => {
    render(<ContactForm />)
    fill('Jane', 'not-an-email')
    submit()
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects names over 100 characters', () => {
    render(<ContactForm />)
    fill('a'.repeat(101))
    submit()
    expect(screen.getByText(/Name must be 100 characters or fewer/)).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects messages over 1000 characters', () => {
    render(<ContactForm />)
    fill('Jane', 'jane@example.com', 'a'.repeat(1001))
    submit()
    expect(screen.getByText(/Message must be 1000 characters or fewer/)).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('disables the button while submitting', async () => {
    fetchMock.mockReturnValue(new Promise(() => {}))
    render(<ContactForm />)
    fill()
    submit()
    const button = await screen.findByRole('button', { name: 'Sending...' })
    expect(button).toBeDisabled()
    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.com/contact',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Jane', email: 'jane@example.com', message: 'Hello there' }),
      })
    )
  })

  it('shows success message on 2xx, with and without reduced motion', async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200 })
    reducedMotion.mockReturnValue(true)
    render(<ContactForm />)
    fill()
    submit()
    expect(await screen.findByText('Message sent!')).toBeInTheDocument()
  })

  it('shows error on non-2xx response', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 })
    render(<ContactForm />)
    fill()
    submit()
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to send message')
  })

  it('shows error on network failure', async () => {
    fetchMock.mockRejectedValue(new Error('offline'))
    render(<ContactForm />)
    fill()
    submit()
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to send message')
  })

  it('shows config error when endpoint is unset', async () => {
    vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', '')
    render(<ContactForm />)
    fill()
    submit()
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to send message: configuration missing'
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('clears the form and returns to idle after success', async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200 })
    render(<ContactForm />)
    fill()
    submit()
    await screen.findByText('Message sent!')
    await waitFor(() => expect(screen.queryByText('Message sent!')).not.toBeInTheDocument(), {
      timeout: 3000,
    })
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled()
  })

  it('shows multiple field errors simultaneously', () => {
    render(<ContactForm />)
    fill('', 'bad', '')
    submit()
    expect(screen.getAllByText(/is required|valid email/)).toHaveLength(3)
  })

  it('allows retry after an error and clears the message on edit', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500 })
    render(<ContactForm />)
    fill()
    submit()
    await screen.findByRole('alert')
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { name: 'message', value: 'Retry' },
    })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled()
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200 })
    submit()
    await waitFor(() => expect(screen.getByText('Message sent!')).toBeInTheDocument())
  })
})
