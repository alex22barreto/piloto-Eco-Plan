import { element, by, ElementFinder } from 'protractor';

export class ProyectoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-proyecto div table .btn-danger'));
  title = element.all(by.css('jhi-proyecto div h2#page-heading span')).first();
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

export class ProyectoUpdatePage {
  pageTitle = element(by.id('jhi-proyecto-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  codigoProyectoInput = element(by.id('field_codigoProyecto'));
  nombreInput = element(by.id('field_nombre'));

  empresaSelect = element(by.id('field_empresa'));
  tipoProyectoSelect = element(by.id('field_tipoProyecto'));
  estadoSelect = element(by.id('field_estado'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoProyectoInput(codigoProyecto: string): Promise<void> {
    await this.codigoProyectoInput.sendKeys(codigoProyecto);
  }

  async getCodigoProyectoInput(): Promise<string> {
    return await this.codigoProyectoInput.getAttribute('value');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async empresaSelectLastOption(): Promise<void> {
    await this.empresaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async empresaSelectOption(option: string): Promise<void> {
    await this.empresaSelect.sendKeys(option);
  }

  getEmpresaSelect(): ElementFinder {
    return this.empresaSelect;
  }

  async getEmpresaSelectedOption(): Promise<string> {
    return await this.empresaSelect.element(by.css('option:checked')).getText();
  }

  async tipoProyectoSelectLastOption(): Promise<void> {
    await this.tipoProyectoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoProyectoSelectOption(option: string): Promise<void> {
    await this.tipoProyectoSelect.sendKeys(option);
  }

  getTipoProyectoSelect(): ElementFinder {
    return this.tipoProyectoSelect;
  }

  async getTipoProyectoSelectedOption(): Promise<string> {
    return await this.tipoProyectoSelect.element(by.css('option:checked')).getText();
  }

  async estadoSelectLastOption(): Promise<void> {
    await this.estadoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async estadoSelectOption(option: string): Promise<void> {
    await this.estadoSelect.sendKeys(option);
  }

  getEstadoSelect(): ElementFinder {
    return this.estadoSelect;
  }

  async getEstadoSelectedOption(): Promise<string> {
    return await this.estadoSelect.element(by.css('option:checked')).getText();
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

export class ProyectoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-proyecto-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-proyecto'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
