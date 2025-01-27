import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import IconClear from '../../../src/components/icon-clear' // Adjust the path as necessary

describe('IconClear Component', () => {
  test("render IconClear when is day", () => {
    render(<IconClear isDay={true} />)
    expect(screen.getByTestId('iconClear')).toBeDefined()
    expect(screen.getByTestId('iconClearDay')).toBeDefined()
  })

  test("render IconClear when is night", () => {
    render(<IconClear isDay={false} />)
    expect(screen.getByTestId('iconClear')).toBeDefined()
    expect(screen.getByTestId('iconClearNight')).toBeDefined()
  })
})