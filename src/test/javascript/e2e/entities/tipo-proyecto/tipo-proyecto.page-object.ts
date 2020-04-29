import { element, by, ElementFinder } from 'protractor';

export class TipoProyectoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tipo-proyecto div table .btn-danger'));
  title = element.all(by.css('jhi-tipo-proyecto div h2#page-heading span')).first();
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

export class TipoProyectoUpdatePage {
  pageTitle = element(by.id('jhi-tipo-proyecto-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nombreTipoProyectoInput = element(by.id('field_nombreTipoProyecto'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreTipoProyectoInput(nombreTipoProyecto: string): Promise<void> {
    await this.nombreTipoProyectoInput.sendKeys(nombreTipoProyecto);
  }

  async getNombreTipoProyectoInput(): Promise<string> {
    return await this.nombreTipoProyectoInput.getAttribute('value');
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

export class TipoProyectoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tipoProyecto-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoProyecto'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
