import { Page } from '@playwright/test';

export class PatientListsPage {
  constructor(readonly page: Page) {}

  readonly patientListsTable = () => this.page.locator('[data-testid="patientListsTable"]');

  async goto() {
    await this.page.goto('patient-list');
  }

  async addNewPatientList(listName: string, description: string, cohortType: string) {
    await this.page.getByRole('button', { name: 'New List' }).click();
    await this.page.getByLabel('List name').type(listName);
    await this.page.getByLabel('Description').type(description);
    await this.page.getByRole('button', { name: 'Select patient list type' }).click();
    await this.page.getByText(cohortType).click();
    await this.page.getByRole('button', { name: 'Create list' }).click();
  }
}
