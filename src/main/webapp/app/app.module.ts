import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EcoplanSharedModule } from 'app/shared/shared.module';
import { EcoplanCoreModule } from 'app/core/core.module';
import { EcoplanAppRoutingModule } from './app-routing.module';
import { EcoplanHomeModule } from './home/home.module';
import { EcoplanEntityModule } from './entities/entity.module';
import { EcoplanVistaProyectosModule } from './vista-proyectos/vista-proyectos.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    EcoplanSharedModule,
    EcoplanCoreModule,
    EcoplanHomeModule,
    EcoplanVistaProyectosModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EcoplanEntityModule,
    EcoplanAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class EcoplanAppModule {}
