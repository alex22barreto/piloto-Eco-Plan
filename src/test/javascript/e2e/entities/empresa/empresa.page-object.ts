import { element, by, ElementFinder } from 'protractor';

export class EmpresaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-empresa div table .btn-danger'));
  title = element.all(by.css('jhi-empresa div h2#page-heading span')).first();
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

export class EmpresaUpdatePage {
  pageTitle = element(by.id('jhi-empresa-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  tipoIdentInput = element(by.id('field_tipoIdent'));
  identificacionInput = element(by.id('field_identificacion'));
  razonSocialInput = element(by.id('field_razonSocial'));
  celularInput = element(by.id('field_celular'));
  emailInput = element(by.id('field_email'));
  personaContactoInput = element(by.id('field_personaContacto'));

  personaContactoSelect = element(by.id('field_personaContacto'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTipoIdentInput(tipoIdent: string): Promise<void> {
    await this.tipoIdentInput.sendKeys(tipoIdent);
  }

  async getTipoIdentInput(): Promise<string> {
    return await this.tipoIdentInput.getAttribute('value');
  }

  async setIdentificacionInput(identificacion: string): Promise<void> {
    await this.identificacionInput.sendKeys(identificacion);
  }

  async getIdentificacionInput(): Promise<string> {
    return await this.identificacionInput.getAttribute('value');
  }

  async setRazonSocialInput(razonSocial: string): Promise<void> {
    await this.razonSocialInput.sendKeys(razonSocial);
  }

  async getRazonSocialInput(): Promise<string> {
    return await this.razonSocialInput.getAttribute('value');
  }

  async setCelularInput(celular: string): Promise<void> {
    await this.celularInput.sendKeys(celular);
  }

  async getCelularInput(): Promise<string> {
    return await this.celularInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setPersonaContactoInput(personaContacto: string): Promise<void> {
    await this.personaContactoInput.sendKeys(personaContacto);
  }

  async getPersonaContactoInput(): Promise<string> {
    return await this.personaContactoInput.getAttribute('value');
  }

  async personaContactoSelectLastOption(): Promise<void> {
    await this.personaContactoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async personaContactoSelectOption(option: string): Promise<void> {
    await this.personaContactoSelect.sendKeys(option);
  }

  getPersonaContactoSelect(): ElementFinder {
    return this.personaContactoSelect;
  }

  async getPersonaContactoSelectedOption(): Promise<string> {
    return await this.personaContactoSelect.element(by.css('option:checked')).getText();
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

export class EmpresaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-empresa-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-empresa'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
