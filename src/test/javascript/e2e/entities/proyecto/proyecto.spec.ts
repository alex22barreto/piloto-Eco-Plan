import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProyectoComponentsPage, ProyectoDeleteDialog, ProyectoUpdatePage } from './proyecto.page-object';

const expect = chai.expect;

describe('Proyecto e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let proyectoComponentsPage: ProyectoComponentsPage;
  let proyectoUpdatePage: ProyectoUpdatePage;
  let proyectoDeleteDialog: ProyectoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Proyectos', async () => {
    await navBarPage.goToEntity('proyecto');
    proyectoComponentsPage = new ProyectoComponentsPage();
    await browser.wait(ec.visibilityOf(proyectoComponentsPage.title), 5000);
    expect(await proyectoComponentsPage.getTitle()).to.eq('ecoplanApp.proyecto.home.title');
    await browser.wait(ec.or(ec.visibilityOf(proyectoComponentsPage.entities), ec.visibilityOf(proyectoComponentsPage.noResult)), 1000);
  });

  it('should load create Proyecto page', async () => {
    await proyectoComponentsPage.clickOnCreateButton();
    proyectoUpdatePage = new ProyectoUpdatePage();
    expect(await proyectoUpdatePage.getPageTitle()).to.eq('ecoplanApp.proyecto.home.createOrEditLabel');
    await proyectoUpdatePage.cancel();
  });

  it('should create and save Proyectos', async () => {
    const nbButtonsBeforeCreate = await proyectoComponentsPage.countDeleteButtons();

    await proyectoComponentsPage.clickOnCreateButton();

    await promise.all([
      proyectoUpdatePage.setCodigoInput('5'),
      proyectoUpdatePage.setNombreInput('nombre'),
      proyectoUpdatePage.setEstadoInput('estado'),
      proyectoUpdatePage.setTipoInput('tipo')
    ]);

    expect(await proyectoUpdatePage.getCodigoInput()).to.eq('5', 'Expected codigo value to be equals to 5');
    expect(await proyectoUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await proyectoUpdatePage.getEstadoInput()).to.eq('estado', 'Expected Estado value to be equals to estado');
    expect(await proyectoUpdatePage.getTipoInput()).to.eq('tipo', 'Expected Tipo value to be equals to tipo');

    await proyectoUpdatePage.save();
    expect(await proyectoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await proyectoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Proyecto', async () => {
    const nbButtonsBeforeDelete = await proyectoComponentsPage.countDeleteButtons();
    await proyectoComponentsPage.clickOnLastDeleteButton();

    proyectoDeleteDialog = new ProyectoDeleteDialog();
    expect(await proyectoDeleteDialog.getDialogTitle()).to.eq('ecoplanApp.proyecto.delete.question');
    await proyectoDeleteDialog.clickOnConfirmButton();

    expect(await proyectoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
