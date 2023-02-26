import { test } from '../core';
import { HomePage, PatientListsPage } from '../pages';
import { expect } from '@playwright/test';
import {
  generateRandomPatient,
  deletePatient,
  Patient,
  generateRandomCohortType,
  CohortType,
  deleteCohortType,
} from '../commands';

let patient: Patient;
let cohortType: CohortType;

test.beforeEach(async ({ api }) => {
  patient = await generateRandomPatient(api);
  cohortType = await generateRandomCohortType(api);
});

test('should be able to create a patient list', async ({ page, api }) => {
  const patientListName = `Test Patient List ${Math.floor(Math.random() * 10000)}`;

  const patientListPage = new PatientListsPage(page);
  await patientListPage.goto();

  await patientListPage.addNewPatientList(`Test Patient List ${patientListName}`, 'Test Description', cohortType.name);

  // TODO: check the notification
  await expect(patientListPage.patientListsTable()).toHaveText(patientListName);
});

// test('should be able to edit the details of a patient list', async ({ page, api }) => {});

// test('should be able to display the patients of a patient list', async ({ page, api }) => {});

// test('should be able to delete a patient list', async ({ page, api }) => {});

test.afterEach(async ({ api }) => {
  await deletePatient(api, patient.uuid);
  await deleteCohortType(api, cohortType.uuid);
});
