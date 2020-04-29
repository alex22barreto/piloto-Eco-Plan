import { element, by, ElementFinder } from 'protractor';

export class TipoActividadComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-actividad div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-actividad div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class TipoActividadUpdatePage {
  pageTitle = element(by.id('jhi-tipo-actividad-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nombreTipoActividadInput = element(by.id('field_nombreTipoActividad'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreTipoActividadInput(nombreTipoActividad: string): Promise<void> {
    await this.nombreTipoActividadInput.sendKeys(nombreTipoActividad);
  }

  async getNombreTipoActividadInput(): Promise<string> {
    return await this.nombreTipoActividadInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TipoActividadDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoActividad-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoActividad'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
