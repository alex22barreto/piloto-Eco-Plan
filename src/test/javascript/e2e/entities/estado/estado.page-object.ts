import { element, by, ElementFinder } from 'protractor';

export class EstadoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-estado div table .btn-danger'));
  title = element.all(by.css('jhi-estado div h2#page-heading span')).first();
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

export class EstadoUpdatePage {
  pageTitle = element(by.id('jhi-estado-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idTipoEstadoInput = element(by.id('field_idTipoEstado'));
  nombreTipoEstadoInput = element(by.id('field_nombreTipoEstado'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdTipoEstadoInput(idTipoEstado: string): Promise<void> {
    await this.idTipoEstadoInput.sendKeys(idTipoEstado);
  }

  async getIdTipoEstadoInput(): Promise<string> {
    return await this.idTipoEstadoInput.getAttribute('value');
  }

  async setNombreTipoEstadoInput(nombreTipoEstado: string): Promise<void> {
    await this.nombreTipoEstadoInput.sendKeys(nombreTipoEstado);
  }

  async getNombreTipoEstadoInput(): Promise<string> {
    return await this.nombreTipoEstadoInput.getAttribute('value');
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

export class EstadoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-estado-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-estado'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
