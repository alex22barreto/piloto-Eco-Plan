import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PersonaComponentsPage, PersonaDeleteDialog, PersonaUpdatePage } from './persona.page-object';

const expect = chai.expect;

describe('Persona e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personaComponentsPage: PersonaComponentsPage;
  let personaUpdatePage: PersonaUpdatePage;
  let personaDeleteDialog: PersonaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Personas', async () => {
    await navBarPage.goToEntity('persona');
    personaComponentsPage = new PersonaComponentsPage();
    await browser.wait(ec.visibilityOf(personaComponentsPage.title), 5000);
    expect(await personaComponentsPage.getTitle()).to.eq('ecoplanApp.persona.home.title');
    await browser.wait(ec.or(ec.visibilityOf(personaComponentsPage.entities), ec.visibilityOf(personaComponentsPage.noResult)), 1000);
  });

  it('should load create Persona page', async () => {
    await personaComponentsPage.clickOnCreateButton();
    personaUpdatePage = new PersonaUpdatePage();
    expect(await personaUpdatePage.getPageTitle()).to.eq('ecoplanApp.persona.home.createOrEditLabel');
    await personaUpdatePage.cancel();
  });

  it('should create and save Personas', async () => {
    const nbButtonsBeforeCreate = await personaComponentsPage.countDeleteButtons();

    await personaComponentsPage.clickOnCreateButton();

    await promise.all([
      personaUpdatePage.setIdPersonaInput('5'),
      personaUpdatePage.setIdentificacionInput('5'),
      personaUpdatePage.setNombreInput('nombre'),
      personaUpdatePage.setApellidoInput('apellido')
    ]);

    expect(await personaUpdatePage.getIdPersonaInput()).to.eq('5', 'Expected idPersona value to be equals to 5');
    expect(await personaUpdatePage.getIdentificacionInput()).to.eq('5', 'Expected identificacion value to be equals to 5');
    expect(await personaUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await personaUpdatePage.getApellidoInput()).to.eq('apellido', 'Expected Apellido value to be equals to apellido');

    await personaUpdatePage.save();
    expect(await personaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await personaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Persona', async () => {
    const nbButtonsBeforeDelete = await personaComponentsPage.countDeleteButtons();
    await personaComponentsPage.clickOnLastDeleteButton();

    personaDeleteDialog = new PersonaDeleteDialog();
    expect(await personaDeleteDialog.getDialogTitle()).to.eq('ecoplanApp.persona.delete.question');
    await personaDeleteDialog.clickOnConfirmButton();

    expect(await personaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
