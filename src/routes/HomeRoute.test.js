import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeRoute from './HomeRoute';
import { createServer } from '../test/server';

createServer([
  {
    path: '/api/repositories',
    res: (req) => {
      const query = req.url.searchParams.get('q') || '';
      const match = query.match(/language:(\w+)/);
      const language = match?.[1] ?? 'unknown';
      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      };
    },
  },
]);

test('renders two links for each language', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // Esperar que cargue la UI
  await screen.findByText('Most Popular Javascript');

  const languages = [
    'javascript',
    'typescript',
    'rust',
    'go',
    'python',
    'java',
  ];

  for (let language of languages) {
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`),
    });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
  }
});
