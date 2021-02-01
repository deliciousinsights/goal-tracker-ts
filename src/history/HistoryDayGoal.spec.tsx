import { render } from '@testing-library/react'

import HistoryDayGoal from './HistoryDayGoal'

describe('<HistoryDayGoal />', () => {
  const goal = { id: 'abcd', name: 'Demo goal', target: 5, units: 'wombats' }

  it('should match the expected snapshot', () => {
    const { container } = render(<HistoryDayGoal goal={goal} stats={[2, 5]} />)

    expect(container).toMatchSnapshot()
  })
})
