import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AvailableVacanciesComponent } from './components/available-vacancies/available-vacancies.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FullLoadingComponent } from './components/full-loading/full-loading.component';

import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { menuButtonWide,star,tags,houseDoor,dashCircle,plusCircle,bookFill,mapFill,compass,envelope,pinMapFill,peopleFill,telephone, geoAltFill,personPlus,briefcaseFill, cardImage, genderAmbiguous,search, eye, cardText, doorOpenFill, lockFill,personCircle, boxArrowRight, personBadgeFill, diagram2Fill, calendarCheck, cardChecklist, checkCircleFill, bookmarkCheckFill, currencyDollar, alarmFill, arrowClockwise, journalCheck,exclamationOctagon, chatLeftTextFill, exclamationDiamondFill, listCheck,xCircle,cashCoin, listOl, truck } from 'ngx-bootstrap-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PersonalDataComponent } from './components/register-user/personal-data/personal-data.component';
import { ContactComponent } from './components/register-user/contact/contact.component';
import { AddressComponent } from './components/register-user/address/address.component';
import { FormationComponent } from './components/register-user/formation/formation.component';
import { ExperienceComponent } from './components/register-user/experience/experience.component';
import { ModalGlobalComponent } from './components/modal-global/modal-global.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DetailsVacancieComponent } from './components/available-vacancies/details-vacancie/details-vacancie.component';
import { MyInscriptionsComponent } from './components/home/my-inscriptions/my-inscriptions.component';
import { MyCredentialsComponent } from './components/home/my-credentials/my-credentials.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';

const icons = {
  menuButtonWide,
  star,
  tags,
  houseDoor,
  dashCircle,
  plusCircle,
  bookFill,
  mapFill,
  compass,
  envelope,
  pinMapFill,
  briefcaseFill,
  personPlus,
  geoAltFill,
  telephone,
  peopleFill,
  genderAmbiguous,
  search,
  eye,
  doorOpenFill,
  lockFill,
  personCircle,
  boxArrowRight,
  personBadgeFill,
  diagram2Fill,
  calendarCheck,
  cardChecklist,
  cardImage,
  checkCircleFill,
  bookmarkCheckFill,
  cardText,
  currencyDollar,
  alarmFill,
  arrowClockwise,
  journalCheck,
  exclamationOctagon,
  chatLeftTextFill,
  exclamationDiamondFill,
  listCheck,
  xCircle,
  cashCoin,
  listOl,
  truck
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AvailableVacanciesComponent,
    LoginComponent,
    HomeComponent,
    FullLoadingComponent,
    RegisterUserComponent,
    PersonalDataComponent,
    ContactComponent,
    AddressComponent,
    FormationComponent,
    ExperienceComponent,
    ModalGlobalComponent,
    LoadingComponent,
    NotFoundComponent,
    DetailsVacancieComponent,
    MyInscriptionsComponent,
    MyCredentialsComponent,
    RecoveryPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(icons),
    NgxMaskModule.forRoot(), 
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CurrencyMaskModule
  ],
  providers: [ LoadingComponent,RegisterUserComponent,ModalGlobalComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }