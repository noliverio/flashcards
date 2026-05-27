import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Management from '../Management'
import { App } from '../../App'

describe('Management UI', () => {
  it('renders management interface with mock data', () => {
    render(<Management />)
    expect(screen.getByText('Management')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Cards')).toBeInTheDocument()
    expect(screen.getByText('Math')).toBeInTheDocument()
    expect(screen.getByText('2+2')).toBeInTheDocument()
  })

  it('opens management from App when clicking Management button', async () => {
    const user = userEvent.setup()
    render(<App />)
    const btn = screen.getByRole('button', { name: /Management/i })
    await user.click(btn)
    expect(screen.getByTestId('management-root')).toBeInTheDocument()
  })
})
