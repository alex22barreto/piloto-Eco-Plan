import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ActividadComponentsPage, ActividadDeleteDialog, ActividadUpdatePage } from './actividad.page-object';

const expect = chai.expect;

describe('Actividad e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let actividadComponentsPage: ActividadComponentsPage;
  let actividadUpdatePage: ActividadUpdatePage;
  let actividadDeleteDialog: ActividadDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Actividads', async () => {
    await navBarPage.goToEntity('actividad');
    actividadComponentsPage = new ActividadComponentsPage();
    await browser.wait(ec.visibilityOf(actividadComponentsPage.title), 5000);
    expect(await actividadComponentsPage.getTitle()).to.eq('ecoplanApp.actividad.home.title');
    await browser.wait(ec.or(ec.visibilityOf(actividadComponentsPage.entities), ec.visibilityOf(actividadComponentsPage.noResult)), 1000);
  });

  it('should load create Actividad page', async () => {
    await actividadComponentsPage.clickOnCreateButton();
    actividadUpdatePage = new ActividadUpdatePage();
    expect(await actividadUpdatePage.getPageTitle()).to.eq('ecoplanApp.actividad.home.createOrEditLabel');
    await actividadUpdatePage.cancel();
  });

  it('should create and save Actividads', async () => {
    const nbButtonsBeforeCreate = await actividadComponentsPage.countDeleteButtons();

    await actividadComponentsPage.clickOnCreateButton();

    await promise.all([
      actividadUpdatePage.setCodigoActividadInput('5'),
      actividadUpdatePage.setNombreInput('nombre'),
      actividadUpdatePage.setFecInicioInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      actividadUpdatePage.setFecFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      actividadUpdatePage.proyectoSelectLastOption(),
      actividadUpdatePage.tipoActividadSelectLastOption(),
      actividadUpdatePage.estadoSelectLastOption()
    ]);

    expect(await actividadUpdatePage.getCodigoActividadInput()).to.eq('5', 'Expected codigoActividad value to be equals to 5');
    expect(await actividadUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await actividadUpdatePage.getFecInicioInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fecInicio value to be equals to 2000-12-31'
    );
    expect(await actividadUpdatePage.getFecFinInput()).to.contain('2001-01-01T02:30', 'Expected fecFin value to be equals to 2000-12-31');
    const selectedConProveedor = actividadUpdatePage.getConProveedorInput();
    if (await selectedConProveedor.isSelected()) {
      await actividadUpdatePage.getConProveedorInput().click();
      expect(await actividadUpdatePage.getConProveedorInput().isSelected(), 'Expected conProveedor not to be selected').to.be.false;
    } else {
      await actividadUpdatePage.getConProveedorInput().click();
      expect(await actividadUpdatePage.getConProveedorInput().isSelected(), 'Expected conProveedor to be selected').to.be.true;
    }

    await actividadUpdatePage.save();
    expect(await actividadUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await actividadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Actividad', async () => {
    const nbButtonsBeforeDelete = await actividadComponentsPage.countDeleteButtons();
    await actividadComponentsPage.clickOnLastDeleteButton();

    actividadDeleteDialog = new ActividadDeleteDialog();
    expect(await actividadDeleteDialog.getDialogTitle()).to.eq('ecoplanApp.actividad.delete.question');
    await actividadDeleteDialog.clickOnConfirmButton();

    expect(await actividadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
