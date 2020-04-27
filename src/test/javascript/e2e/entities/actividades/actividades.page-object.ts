import { element, by, ElementFinder } from 'protractor';

export class ActividadesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-actividades div table .btn-danger'));
  title = element.all(by.css('jhi-actividades div h2#page-heading span')).first();
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

export class ActividadesUpdatePage {
  pageTitle = element(by.id('jhi-actividades-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  codigoInput = element(by.id('field_codigo'));
  nombreInput = element(by.id('field_nombre'));
  fecInicioInput = element(by.id('field_fecInicio'));
  fecFinInput = element(by.id('field_fecFin'));
  conProveedorInput = element(by.id('field_conProveedor'));

  estadoSelect = element(by.id('field_estado'));
  tipoSelect = element(by.id('field_tipo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoInput(codigo: string): Promise<void> {
    await this.codigoInput.sendKeys(codigo);
  }

  async getCodigoInput(): Promise<string> {
    return await this.codigoInput.getAttribute('value');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async setFecInicioInput(fecInicio: string): Promise<void> {
    await this.fecInicioInput.sendKeys(fecInicio);
  }

  async getFecInicioInput(): Promise<string> {
    return await this.fecInicioInput.getAttribute('value');
  }

  async setFecFinInput(fecFin: string): Promise<void> {
    await this.fecFinInput.sendKeys(fecFin);
  }

  async getFecFinInput(): Promise<string> {
    return await this.fecFinInput.getAttribute('value');
  }

  getConProveedorInput(): ElementFinder {
    return this.conProveedorInput;
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

  async tipoSelectLastOption(): Promise<void> {
    await this.tipoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoSelectOption(option: string): Promise<void> {
    await this.tipoSelect.sendKeys(option);
  }

  getTipoSelect(): ElementFinder {
    return this.tipoSelect;
  }

  async getTipoSelectedOption(): Promise<string> {
    return await this.tipoSelect.element(by.css('option:checked')).getText();
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

export class ActividadesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-actividades-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-actividades'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
