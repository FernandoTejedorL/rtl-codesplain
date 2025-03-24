import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RepositoriesTable from './RepositoriesTable';

const mockRepositories = [
  { id: 1, full_name: 'devuser/project-alpha' },
  { id: 2, full_name: 'devuser/project-beta' },
];

test('shows links with correct attributes and name', () => {
  render(
    <MemoryRouter>
      <RepositoriesTable
        label="Mis repositorios"
        repositories={mockRepositories}
      />
    </MemoryRouter>
  );

  mockRepositories.forEach((repo) => {
    const link = screen.getByText(repo.full_name);
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(`/repositories/${repo.full_name}`);
  });
});
