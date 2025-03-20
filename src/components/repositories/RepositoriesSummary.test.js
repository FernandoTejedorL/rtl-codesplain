import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('it displays the primary language of the repo', () => {
  const repository = {
    language: 'Javascript',
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  };
  render(<RepositoriesSummary repository={repository} />);

  const language = screen.getByText('Javascript');

  expect(language).toBeInTheDocument();
});
