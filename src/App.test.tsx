// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('public AI toolbox adoption office', () => {
  it('loads adoption cases from the Java API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'European benefits chatbot reuse assessment', owner: 'Interoperable Europe AI Team', status: 'Review', priority: 'High' }],
    }))
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(<QueryClientProvider client={client}><App /></QueryClientProvider>)
    expect(await screen.findByText('European benefits chatbot reuse assessment')).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Public AI Toolbox Adoption Office' })).toBeTruthy()
  })
})
