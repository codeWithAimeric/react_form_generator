import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom'; 
import FormBuilder from '../App';
import configuration from '../utils/const'

const formConfig = configuration

const submitForm = vi.fn();

describe('FormBuilder', () => {
  beforeEach(() => {
    render(<FormBuilder formConfig={formConfig} submitForm={submitForm} />);
  });

  it('should render form fields correctly', () => {
    formConfig.fields.forEach((field) => {
      const fieldElement = screen.getByLabelText(field.label);
      expect(fieldElement).toBeInTheDocument();
    });
  });

  it('should update input values on change', () => {
    const firstNameInput = screen.getByLabelText('Prénom');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  it('should submit form with valid data', async () => {
    const firstNameInput = screen.getByLabelText('Prénom');
    const lastNameInput = screen.getByLabelText('Nom');
    const emailInput = screen.getByPlaceholderText('john.doe@example.com');
    const passwordInput = screen.getByLabelText('Mot de passe');
    const numberInput = screen.getByLabelText('Number');
    const dateInput = screen.getByLabelText('Date');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(numberInput, { target: { value: 123 } });
    fireEvent.change(dateInput, { target: { value: '2023-05-01' } });

    fireEvent.click(screen.getByText(formConfig.submitButton));

    await waitFor(() => {
      expect(submitForm).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        number: '123',
        date: '2023-05-01',
      });
    });
  });

  it('should show validation error for password too short', async () => {
    const passwordField = screen.getByLabelText('Mot de passe');
    fireEvent.change(passwordField, { target: { value: 'short' } });

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    fireEvent.click(screen.getByText(formConfig.submitButton));

    await waitFor(() => {
      const errorElement = screen.getByText('Le mot de passe doit faire au moins 8 caractères.');
      expect(errorElement).toBeInTheDocument();
    });
    consoleSpy.mockRestore();
  });

});
