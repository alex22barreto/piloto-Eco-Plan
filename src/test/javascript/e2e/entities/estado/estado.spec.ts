import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EstadoComponentsPage, EstadoDeleteDialog, EstadoUpdatePage } from './estado.page-object';

const expect = chai.expect;

describe('Estado e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let estadoComponentsPage: EstadoComponentsPage;
  let estadoUpdatePage: EstadoUpdatePage;
  let estadoDeleteDialog: EstadoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Estados', async () => {
    await navBarPage.goToEntity('estado');
    estadoComponentsPage = new EstadoComponentsPage();
    await browser.wait(ec.visibilityOf(estadoComponentsPage.title), 5000);
    expect(await estadoComponentsPage.getTitle()).to.eq('ecoplanApp.estado.home.title');
    await browser.wait(ec.or(ec.visibilityOf(estadoComponentsPage.entities), ec.visibilityOf(estadoComponentsPage.noResult)), 1000);
  });

  it('should load create Estado page', async () => {
    await estadoComponentsPage.clickOnCreateButton();
    estadoUpdatePage = new EstadoUpdatePage();
    expect(await estadoUpdatePage.getPageTitle()).to.eq('ecoplanApp.estado.home.createOrEditLabel');
    await estadoUpdatePage.cancel();
  });

  it('should create and save Estados', async () => {
    const nbButtonsBeforeCreate = await estadoComponentsPage.countDeleteButtons();

    await estadoComponentsPage.clickOnCreateButton();

    await promise.all([estadoUpdatePage.setIdTipoEstadoInput('5'), estadoUpdatePage.setNombreTipoEstadoInput('nombreTipoEstado')]);

    expect(await estadoUpdatePage.getIdTipoEstadoInput()).to.eq('5', 'Expected idTipoEstado value to be equals to 5');
    expect(await estadoUpdatePage.getNombreTipoEstadoInput()).to.eq(
      'nombreTipoEstado',
      'Expected NombreTipoEstado value to be equals to nombreTipoEstado'
    );

    await estadoUpdatePage.save();
    expect(await estadoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await estadoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Estado', async () => {
    const nbButtonsBeforeDelete = await estadoComponentsPage.countDeleteButtons();
    await estadoComponentsPage.clickOnLastDeleteButton();

    estadoDeleteDialog = new EstadoDeleteDialog();
    expect(await estadoDeleteDialog.getDialogTitle()).to.eq('ecoplanApp.estado.delete.question');
    await estadoDeleteDialog.clickOnConfirmButton();

    expect(await estadoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
