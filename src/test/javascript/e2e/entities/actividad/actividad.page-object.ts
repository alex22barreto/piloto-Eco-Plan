import { element, by, ElementFinder } from 'protractor';

export class ActividadComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-actividad div table .btn-danger'));
  title = element.all(by.css('jhi-actividad div h2#page-heading span')).first();
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

export class ActividadUpdatePage {
  pageTitle = element(by.id('jhi-actividad-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  codigoActividadInput = element(by.id('field_codigoActividad'));
  nombreInput = element(by.id('field_nombre'));
  fecInicioInput = element(by.id('field_fecInicio'));
  fecFinInput = element(by.id('field_fecFin'));
  conProveedorInput = element(by.id('field_conProveedor'));

  proyectoSelect = element(by.id('field_proyecto'));
  tipoActividadSelect = element(by.id('field_tipoActividad'));
  estadoSelect = element(by.id('field_estado'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodigoActividadInput(codigoActividad: string): Promise<void> {
    await this.codigoActividadInput.sendKeys(codigoActividad);
  }

  async getCodigoActividadInput(): Promise<string> {
    return await this.codigoActividadInput.getAttribute('value');
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

  async proyectoSelectLastOption(): Promise<void> {
    await this.proyectoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async proyectoSelectOption(option: string): Promise<void> {
    await this.proyectoSelect.sendKeys(option);
  }

  getProyectoSelect(): ElementFinder {
    return this.proyectoSelect;
  }

  async getProyectoSelectedOption(): Promise<string> {
    return await this.proyectoSelect.element(by.css('option:checked')).getText();
  }

  async tipoActividadSelectLastOption(): Promise<void> {
    await this.tipoActividadSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tipoActividadSelectOption(option: string): Promise<void> {
    await this.tipoActividadSelect.sendKeys(option);
  }

  getTipoActividadSelect(): ElementFinder {
    return this.tipoActividadSelect;
  }

  async getTipoActividadSelectedOption(): Promise<string> {
    return await this.tipoActividadSelect.element(by.css('option:checked')).getText();
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

export class ActividadDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-actividad-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-actividad'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
