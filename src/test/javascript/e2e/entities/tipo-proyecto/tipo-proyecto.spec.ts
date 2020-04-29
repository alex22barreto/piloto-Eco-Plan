import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoProyectoComponentsPage, TipoProyectoDeleteDialog, TipoProyectoUpdatePage } from './tipo-proyecto.page-object';

const expect = chai.expect;

describe('TipoProyecto e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoProyectoComponentsPage: TipoProyectoComponentsPage;
  let tipoProyectoUpdatePage: TipoProyectoUpdatePage;
  let tipoProyectoDeleteDialog: TipoProyectoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoProyectos', async () => {
    await navBarPage.goToEntity('tipo-proyecto');
    tipoProyectoComponentsPage = new TipoProyectoComponentsPage();
    await browser.wait(ec.visibilityOf(tipoProyectoComponentsPage.title), 5000);
    expect(await tipoProyectoComponentsPage.getTitle()).to.eq('ecoplanApp.tipoProyecto.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(tipoProyectoComponentsPage.entities), ec.visibilityOf(tipoProyectoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TipoProyecto page', async () => {
    await tipoProyectoComponentsPage.clickOnCreateButton();
    tipoProyectoUpdatePage = new TipoProyectoUpdatePage();
    expect(await tipoProyectoUpdatePage.getPageTitle()).to.eq('ecoplanApp.tipoProyecto.home.createOrEditLabel');
    await tipoProyectoUpdatePage.cancel();
  });

  it('should create and save TipoProyectos', async () => {
    const nbButtonsBeforeCreate = await tipoProyectoComponentsPage.countDeleteButtons();

    await tipoProyectoComponentsPage.clickOnCreateButton();

    await promise.all([tipoProyectoUpdatePage.setNombreTipoProyectoInput('nombreTipoProyecto')]);

    expect(await tipoProyectoUpdatePage.getNombreTipoProyectoInput()).to.eq(
      'nombreTipoProyecto',
      'Expected NombreTipoProyecto value to be equals to nombreTipoProyecto'
    );

    await tipoProyectoUpdatePage.save();
    expect(await tipoProyectoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoProyectoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoProyecto', async () => {
    const nbButtonsBeforeDelete = await tipoProyectoComponentsPage.countDeleteButtons();
    await tipoProyectoComponentsPage.clickOnLastDeleteButton();

    tipoProyectoDeleteDialog = new TipoProyectoDeleteDialog();
    expect(await tipoProyectoDeleteDialog.getDialogTitle()).to.eq('ecoplanApp.tipoProyecto.delete.question');
    await tipoProyectoDeleteDialog.clickOnConfirmButton();

    expect(await tipoProyectoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
