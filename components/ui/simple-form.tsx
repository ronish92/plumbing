// app/components/ui/simple-form.tsx
'use client'

import { useState } from 'react'
import { clsx } from 'clsx'

interface FormInputProps {
  name: string
  type?: string
  placeholder?: string
  label?: string

  required?: boolean
  rows?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function FormInput({
  name,
  type = 'text',
  placeholder,
  label,
  required,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      {/* {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )} */}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full h-15 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
      />
    </div>
  )
}

export function FormTextArea({
  name,
  placeholder,
  label,
  required,
  rows = 4,
  value,
  onChange,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      {/* {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )} */}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:border-transparent"
      />
    </div>
  )
}

export function FormButton({
  name,
  label,

  isLoading = false,
}: {
  name: string
  label: string
  isLoading?: boolean
}) {
  return (
    <button
      type="submit"
      name={name}
      disabled={isLoading}
      className="w-full py-3 px-4 bg-primary-foreground text-white rounded-lg hover:bg-pineapple disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? 'Sending...' : label}
    </button>
  )
}

// Main Form component
export function Form({ children, className }: { children: React.ReactNode; className?: string; }) {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        form.reset()
        setStatus('Message sent successfully!')
      } else {
        setStatus('Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
       <div className={clsx('mx-auto w-full', className || 'max-w-lg')}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {children}
      </form>
      {status && (
        <p className={clsx(
          'text-center text-sm mt-4',
          status.includes('success') ? 'text-green-600' : 'text-red-600'
        )}>
          {status}
        </p>
      )}
    </div>
  )
}