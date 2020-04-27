import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoActividadComponentsPage, TipoActividadDeleteDialog, TipoActividadUpdatePage } from './tipo-actividad.page-object';

const expect = chai.expect;

describe('TipoActividad e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoActividadComponentsPage: TipoActividadComponentsPage;
  let tipoActividadUpdatePage: TipoActividadUpdatePage;
  let tipoActividadDeleteDialog: TipoActividadDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoActividads', async () => {
    await navBarPage.goToEntity('tipo-actividad');
    tipoActividadComponentsPage = new TipoActividadComponentsPage();
    await browser.wait(ec.visibilityOf(tipoActividadComponentsPage.title), 5000);
    expect(await tipoActividadComponentsPage.getTitle()).to.eq('ecoplanApp.tipoActividad.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(tipoActividadComponentsPage.entities), ec.visibilityOf(tipoActividadComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TipoActividad page', async () => {
    await tipoActividadComponentsPage.clickOnCreateButton();
    tipoActividadUpdatePage = new TipoActividadUpdatePage();
    expect(await tipoActividadUpdatePage.getPageTitle()).to.eq('ecoplanApp.tipoActividad.home.createOrEditLabel');
    await tipoActividadUpdatePage.cancel();
  });

  it('should create and save TipoActividads', async () => {
    const nbButtonsBeforeCreate = await tipoActividadComponentsPage.countDeleteButtons();

    await tipoActividadComponentsPage.clickOnCreateButton();

    await promise.all([
      tipoActividadUpdatePage.setIdTipoActividadInput('5'),
      tipoActividadUpdatePage.setNombreTipoActividadInput('nombreTipoActividad')
    ]);

    expect(await tipoActividadUpdatePage.getIdTipoActividadInput()).to.eq('5', 'Expected idTipoActividad value to be equals to 5');
    expect(await tipoActividadUpdatePage.getNombreTipoActividadInput()).to.eq(
      'nombreTipoActividad',
      'Expected NombreTipoActividad value to be equals to nombreTipoActividad'
    );

    await tipoActividadUpdatePage.save();
    expect(await tipoActividadUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoActividadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoActividad', async () => {
    const nbButtonsBeforeDelete = await tipoActividadComponentsPage.countDeleteButtons();
    await tipoActividadComponentsPage.clickOnLastDeleteButton();

    tipoActividadDeleteDialog = new TipoActividadDeleteDialog();
    expect(await tipoActividadDeleteDialog.getDialogTitle()).to.eq('ecoplanApp.tipoActividad.delete.question');
    await tipoActividadDeleteDialog.clickOnConfirmButton();

    expect(await tipoActividadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
