import { cleanup, render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import SearchForm from './SearchForm';

const submitSpy = vi.fn();
const changeSty = vi.fn();

describe('SearchForm', () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
    vi.resetAllMocks();
  });

  it('should render the search from component', () => {
    render(
      <SearchForm searchValue={''} onSubmit={submitSpy} onChange={changeSty} />
    );
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('should search for Ironman', async () => {
    render(
      <SearchForm
        searchValue={'Ironman'}
        onSubmit={submitSpy}
        onChange={changeSty}
      />
    );

    const user = ue.setup();
    const input = screen.getByRole('searchbox');
    const button = screen.getByText(/search/i);

    expect(input).toBeInTheDocument();
    expect(submitSpy).not.toHaveBeenCalled();

    await user.type(input, 'Ironman');
    await user.click(button);

    expect(submitSpy).toHaveBeenCalled();
  });

  it('should not find apapapa', async () => {
    render(
      <SearchForm
        searchValue={'apapapa'}
        onSubmit={submitSpy}
        onChange={changeSty}
      />
    );

    const user = ue.setup();
    const input = screen.getByRole('searchbox');
    const button = screen.getByText(/search/i);

    expect(input).toBeInTheDocument();
    expect(submitSpy).not.toHaveBeenCalled();

    await user.type(input, 'apapapa');
    await user.click(button);

    expect(submitSpy).toHaveBeenCalled();
  });
});
