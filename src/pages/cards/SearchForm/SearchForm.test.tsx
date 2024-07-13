import useStorage from '@/shared/hooks/useStorage/useStorage';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SearchForm from './SearchForm';

const submitSpy = vi.fn();
const changeSty = vi.fn();

describe('SearchForm', () => {
  const { setStorage, getStorage } = useStorage('searchValue');

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
    const form = screen.getByTestId('form-test');
    const input = screen.getByRole('searchbox');

    expect(input).toBeInTheDocument();
    expect(submitSpy).not.toHaveBeenCalled();

    await user.type(input, 'Ironman');
    fireEvent.submit(form);

    expect(submitSpy).toHaveBeenCalled();
    setStorage('Ironman');
    expect(getStorage()).toBe('Ironman');
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

    const form = screen.getByTestId('form-test');

    expect(input).toBeInTheDocument();
    expect(submitSpy).not.toHaveBeenCalled();

    await user.type(input, 'apapapa');

    fireEvent.submit(form);

    expect(submitSpy).toHaveBeenCalled();
    setStorage('apapapa');
    expect(getStorage()).toBe('apapapa');
  });
});
