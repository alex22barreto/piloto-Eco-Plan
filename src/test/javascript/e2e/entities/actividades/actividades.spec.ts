import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ActividadesComponentsPage, ActividadesDeleteDialog, ActividadesUpdatePage } from './actividades.page-object';

const expect = chai.expect;

describe('Actividades e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let actividadesComponentsPage: ActividadesComponentsPage;
  let actividadesUpdatePage: ActividadesUpdatePage;
  let actividadesDeleteDialog: ActividadesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Actividades', async () => {
    await navBarPage.goToEntity('actividades');
    actividadesComponentsPage = new ActividadesComponentsPage();
    await browser.wait(ec.visibilityOf(actividadesComponentsPage.title), 5000);
    expect(await actividadesComponentsPage.getTitle()).to.eq('ecoplanApp.actividades.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(actividadesComponentsPage.entities), ec.visibilityOf(actividadesComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Actividades page', async () => {
    await actividadesComponentsPage.clickOnCreateButton();
    actividadesUpdatePage = new ActividadesUpdatePage();
    expect(await actividadesUpdatePage.getPageTitle()).to.eq('ecoplanApp.actividades.home.createOrEditLabel');
    await actividadesUpdatePage.cancel();
  });

  it('should create and save Actividades', async () => {
    const nbButtonsBeforeCreate = await actividadesComponentsPage.countDeleteButtons();

    await actividadesComponentsPage.clickOnCreateButton();

    await promise.all([
      actividadesUpdatePage.setCodigoInput('5'),
      actividadesUpdatePage.setNombreInput('nombre'),
      actividadesUpdatePage.setFecInicioInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      actividadesUpdatePage.setFecFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      actividadesUpdatePage.estadoSelectLastOption(),
      actividadesUpdatePage.tipoSelectLastOption()
    ]);

    expect(await actividadesUpdatePage.getCodigoInput()).to.eq('5', 'Expected codigo value to be equals to 5');
    expect(await actividadesUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await actividadesUpdatePage.getFecInicioInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fecInicio value to be equals to 2000-12-31'
    );
    expect(await actividadesUpdatePage.getFecFinInput()).to.contain('2001-01-01T02:30', 'Expected fecFin value to be equals to 2000-12-31');
    const selectedConProveedor = actividadesUpdatePage.getConProveedorInput();
    if (await selectedConProveedor.isSelected()) {
      await actividadesUpdatePage.getConProveedorInput().click();
      expect(await actividadesUpdatePage.getConProveedorInput().isSelected(), 'Expected conProveedor not to be selected').to.be.false;
    } else {
      await actividadesUpdatePage.getConProveedorInput().click();
      expect(await actividadesUpdatePage.getConProveedorInput().isSelected(), 'Expected conProveedor to be selected').to.be.true;
    }

    await actividadesUpdatePage.save();
    expect(await actividadesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await actividadesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Actividades', async () => {
    const nbButtonsBeforeDelete = await actividadesComponentsPage.countDeleteButtons();
    await actividadesComponentsPage.clickOnLastDeleteButton();

    actividadesDeleteDialog = new ActividadesDeleteDialog();
    expect(await actividadesDeleteDialog.getDialogTitle()).to.eq('ecoplanApp.actividades.delete.question');
    await actividadesDeleteDialog.clickOnConfirmButton();

    expect(await actividadesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
