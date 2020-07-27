<template>
  <q-page class="no-scroll">
      <div class="q-pa-md heights" style="margin-top: 50px;">
         <div class="q-gutter-y-md" style="max-width: 600px">
          <img style="height: 90px; margin-top: -40px;" src="../../../Crypto-img/Krypto01.png"/>
        </div>

          <q-btn class="ourstory" style="float: right; margin-top: -80px;" size="20px" flat icon="fas fa-bars" @click="open('top')"><q-tooltip :delay="200" anchor="bottom left" self="top left" transition-show="rotate" transition-hide="scale" content-style="font-size: 10px; width: 80px;">
          Our Story & Our Services
        </q-tooltip>
        </q-btn>

          <!-- Desktop Our story -->
        <q-dialog v-model="dialog" :position="position">
          <q-card flat class="fixed-right ourstory" style="width: 550px; padding-bottom: 1000px; background: rgba(0,0,0,0.6); overflow: hidden">
             <q-btn dense flat icon="close" class="q-pa-md" v-close-popup color="white" style="position: absolute;"/>
          <q-tabs v-model="tab" active-color="green" class="text-white tabs-ourstory" narrow-indicator no-caps style="float: left; margin-left: 20px; width: 500px; margin-top: 50px;">
            <q-tab style="font-size: 25px" name="story">Our Story</q-tab>
            <q-tab style="font-size: 25px" name="services">Our Services</q-tab>
          </q-tabs>

          <!-- Our Story -->

          <q-tab-panels v-model="tab" animated style="width: 450px; height: 500px; margin-left: 65px; background: transparent; color: white;">

            <q-tab-panel name="story">
              <div class="text-h6" style="font-size: 33px;"><b>OUR STORY</b></div>
              <img style="width: 400px; padding-top: 20px" src="../../../Crypto-img/buildings.jpg"/>
              <p style="width: 400px; text-align: justify">Our Group of Companies has over 50 years of combined experience in the crypto market, capital market, private hedge fund management, and online offshore banking</p>
              <p style="width: 400px; text-align: justify">Born and raised in London, UK, our group has established & developed its brand in the high- end market.</p>
              <p style="width: 400px; text-align: justify">As a conglomerate, we strive to continuously move forward and create innovations for high net worth businesses and individuals.</p>
              <q-separator color="white" style="width: 180px;"/>
              <br>
              <p><b>Late 2002 Capital Market</b></p>
              <p style="width: 400px; text-align: justify">Bear Mountain World was born in London, UK</p>
              <p><b>Feb 2016 Crypto Market</b></p>
              <p style="width: 400px; text-align: justify">BlackBear Ventures Capital Corp. was launched in Asia and Europe</p>
              <p><b>Aug 2017 Financial Technology (FinTech)</b></p>
              <a style="cursor: pointer; color: white" target="_blank" href="https:uniqx.co">UniQx.co</a>
              <p style="padding-top: 10px"><b>Sep 2018 Decentralized Technology Development</b></p>
              <a style="cursor: pointer; color: white" target="_blank" href="https://fedx.eu">FedX.eu</a>
              <p style="padding-top: 10px"><b>Oct 2019 Blockchain: Educational / Financial / Legal</b></p>
              <a style="cursor: pointer; color: white" target="_blank" href="https://krypto.one">Krypto.One</a>
              <p style="padding-top: 10px"><b>Jan 2020 Online Offshore Banking</b></p>
              <a style="cursor: pointer; color: white" target="_blank" href="http://lexiconbank.holdings">Lexiconbank.holdings </a>
            </q-tab-panel>

            <!-- Our Services -->

            <q-tab-panel name="services">
              <div class="text-h6" style="font-size: 33px;"><b>OUR SERVICES</b></div>
              <img  style="width: 400px; padding-top: 20px" src="../../../Crypto-img/bitcoin.jpg"/>
              <p class="text-h6" style="font-size: 25px; padding-top: 10px">Educational</p>
              <p style="width: 380px; text-align: justify">We provide introductory information on private and public use of blockchain to empower, build confidence, break down all the barriers and open the door for opportunity for a better life.</p>
              <p class="text-h6" style="font-size: 25px; padding-top: 10px">Financial</p>
              <p style="width: 380px; text-align: justify">We provide a number of specific skills and knowledge that enable businesses and individuals to make the right decisions with their crypto resources and to enable them to understand how digital assets work.</p>
              <p class="text-h6" style="font-size: 25px; padding-top: 10px">Legal</p>
               <p style="width: 380px; text-align: justify">We provide updated information and advisory on different blockchain related matters to enlighten businesses and individuals -- to comply with rules, regulations, and local laws.</p>
               <p class="text-h6" style="font-size: 25px; padding-top: 10px">Funded & Finished Projects</p>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://bmwinternationalcapital.com/">1. Bmwinternationalcapital.com</a>
               <br>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://Bbmarket.trade/">2. Bbmarket.trade</a>
               <br>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://UniQx.co/">3.	UniQx.co</a>
               <br>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://FedX.eu/">4.	FedX.eu</a>
               <br>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://Krypto.One/">5.	Krypto.One</a>
               <p class="text-h6" style="font-size: 25px; padding-top: 10px">Ongoing & Future Projects</p>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://Lexiconbank.holdings/">1.	Lexiconbank.holdings</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">2.	Quadrillon.capital</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">3.	BarterElite.Club</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">4.	Xchange.uno</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">5.	LifeChat.icu</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">6.	Medko.icu</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">7.	FastQueue.icu</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">8.	Barter.haus</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">9.	Pollished.monster</a>
               <p class="text-h6" style="font-size: 25px; padding-top: 10px; width: 380px">Planned Projects >> Feasibility on Progress</p>
                <a style="margin-left: 50px; color: white;" target="_blank" href="https://Lexiconbank.holdings/">1.	Vlotto.club</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">2.	Grambulance.com</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">3.	Aitech.trade</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">4.	Payme.monster</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">5.	Shopearnsave.online </a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">6.	Stealthy.cam</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">7.	Coinsure.pro</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">8.	Blocspace</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">9.	Propertyplanner</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">10.	Timeshare</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">11.	Blockshop</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">12.	Smartisland</a>
            </q-tab-panel>
          </q-tab-panels>
          </q-card>
        </q-dialog>

        <!-- q-dialog for phonw view -->
         <q-btn class="ourstory-phone" style="float: right; margin-top: -80px;" size="20px" flat icon="fas fa-bars" @click="layout = true"><q-tooltip :delay="200" anchor="bottom left" self="top left" transition-show="rotate" transition-hide="scale" content-style="font-size: 10px; width: 80px;">

        </q-tooltip>

            <q-dialog v-model="layout">
            <q-layout view="Lhh lpR fff" container style="background: rgba(0,0,0,0.7)">
              <q-header style="background: rgba(0,0,0,0.9);">
                <q-toolbar>
                  <q-space/>
                   <q-tabs v-model="tab" active-color="green" class="text-white tabs-ourstory q-pa-sm" narrow-indicator no-caps style="width: 100%; margin-left: -20px">
            <q-tab style="font-size: 20px" name="story">Our Story</q-tab>
            <q-tab style="font-size: 20px" name="services">Our Services</q-tab>
          </q-tabs>
                <q-btn flat v-close-popup round dense icon="close" />
                </q-toolbar>
              </q-header>

          <!-- Our Story -->

          <q-tab-panels v-model="tab" animated style="max-width: 100%; margin-top: 60px; background: transparent; color: white;">

            <q-tab-panel name="story">
              <div class="text-h6" style="font-size: 33px;"><b>OUR STORY</b></div>
              <img style="width: 100%; padding-top: 20px" src="../../../Crypto-img/buildings.jpg"/>
              <p style="width: 100%; text-align: justify">Our Group of Companies has over 50 years of combined experience in the crypto market, capital market, private hedge fund management, and online offshore banking</p>
              <p style="width: 100%; text-align: justify">Born and raised in London, UK, our group has established & developed its brand in the high- end market.</p>
              <p style="width: 100%; text-align: justify">As a conglomerate, we strive to continuously move forward and create innovations for high net worth businesses and individuals.</p>
              <q-separator color="white" style="width: 180px;"/>
              <br>
              <p><b>Late 2002 Capital Market</b></p>
              <p style="width: 100%; text-align: justify">Bear Mountain World was born in London, UK</p>
              <p><b>Feb 2016 Crypto Market</b></p>
              <p style="width: 100%; text-align: justify">BlackBear Ventures Capital Corp. was launched in Asia and Europe</p>
              <p><b>Aug 2017 Financial Technology (FinTech)</b></p>
              <a style="cursor: pointer; color: white" target="_blank" href="https:uniqx.co">UniQx.co</a>
              <p style="padding-top: 10px"><b>Sep 2018 Decentralized Technology Development</b></p>
              <a style="cursor: pointer; color: white" target="_blank" href="https://fedx.eu">FedX.eu</a>
              <p style="padding-top: 10px"><b>Oct 2019 Blockchain: Educational / Financial / Legal</b></p>
              <a style="cursor: pointer; color: white" target="_blank" href="https://krypto.one">Krypto.One</a>
              <p style="padding-top: 10px"><b>Jan 2020 Online Offshore Banking</b></p>
              <a style="cursor: pointer; color: white" target="_blank" href="http://lexiconbank.holdings">Lexiconbank.holdings </a>
            </q-tab-panel>

            <!-- Our Services -->

            <q-tab-panel name="services">
              <div class="text-h6" style="font-size: 33px;"><b>OUR SERVICES</b></div>
              <img style="width: 100%; padding-top: 20px" src="../../../Crypto-img/bitcoin.jpg"/>
              <p class="text-h6" style="font-size: 25px; padding-top: 10px">Educational</p>
              <p style="width: 100%; text-align: justify">We provide introductory information on private and public use of blockchain to empower, build confidence, break down all the barriers and open the door for opportunity for a better life.</p>
              <p class="text-h6" style="font-size: 25px; padding-top: 10px">Financial</p>
              <p style="width: 100%; text-align: justify">We provide a number of specific skills and knowledge that enable businesses and individuals to make the right decisions with their crypto resources and to enable them to understand how digital assets work.</p>
              <p class="text-h6" style="font-size: 25px; padding-top: 10px">Legal</p>
               <p style="width: 100%; text-align: justify">We provide updated information and advisory on different blockchain related matters to enlighten businesses and individuals -- to comply with rules, regulations, and local laws.</p>
               <p class="text-h6" style="font-size: 25px; padding-top: 10px">Funded & Finished Projects</p>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://bmwinternationalcapital.com/">1. Bmwinternationalcapital.com</a>
               <br>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://Bbmarket.trade/">2. Bbmarket.trade</a>
               <br>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://UniQx.co/">3.	UniQx.co</a>
               <br>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://FedX.eu/">4.	FedX.eu</a>
               <br>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://Krypto.One/">5.	Krypto.One</a>
               <p class="text-h6" style="font-size: 25px; padding-top: 10px">Ongoing & Future Projects</p>
               <a style="margin-left: 50px; color: white;" target="_blank" href="https://Lexiconbank.holdings/">1.	Lexiconbank.holdings</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">2.	Quadrillon.capital</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">3.	BarterElite.Club</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">4.	Xchange.uno</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">5.	LifeChat.icu</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">6.	Medko.icu</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">7.	FastQueue.icu</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">8.	Barter.haus</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">9.	Pollished.monster</a>
               <p class="text-h6" style="font-size: 25px; padding-top: 10px; width: 100%">Planned Projects >> Feasibility on Progress</p>
                <a style="margin-left: 50px; color: white;" target="_blank" href="https://Lexiconbank.holdings/">1.	Vlotto.club</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">2.	Grambulance.com</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">3.	Aitech.trade</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">4.	Payme.monster</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">5.	Shopearnsave.online </a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">6.	Stealthy.cam</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">7.	Coinsure.pro</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">8.	Blocspace</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">9.	Propertyplanner</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">10.	Timeshare</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">11.	Blockshop</a>
               <br>
               <a style="margin-left: 50px; color: white;" href="#">12.	Smartisland</a>
            </q-tab-panel>
          </q-tab-panels>
            </q-layout>
          </q-dialog>
         </q-btn>

        <p style="color: #e6e6e6;
         font-size: 250px;
          font-weight: bolder;
          position: absolute;
           margin-top: 80px;
            margin-left: 150px;
             z-index: -1;
             opacity: 0.3"
             ><strong>crypto</strong></p>
      </div>

      <div>
        <img class="remove"
        style="height: 170px;
         position: absolute;
          top: 180px;
           z-index: 2;"
            src="../../../Crypto-img/h7-slajder-img-5.png"/>
      </div>

       <div>
        <img class="remove"
        style="height: 400px
        ; position: absolute;
         top: 180px;
          left: -300px;
           z-index: 3;"
            src="../../../Crypto-img/Keyboard.png"/>
      </div>

      <div>
         <img class="remove"
         style="height: 150px;
          position: absolute;
           top: 80px;
            right: 50px;
             z-index: 4;
             " src="../../../Crypto-img/Eye-Glasses.png"/>
      </div>

      <div>
         <img class="remove"
         style="height: 300px;
          position: absolute;
           top: 260px;
            right: 0;
             z-index: 5;"
              src="../../../Crypto-img/Note.png"/>
      </div>

      <div>
        <img class="phony remove"
        style="height: 480px;
          position: absolute;
           top: 80px;
            right: 850px;
             z-index: 7;"
              src="../../../Crypto-img/Phone.png"/>
      </div>

       <div>
        <img class="phony2 remove"
        style="height: 388px;
          position: absolute;
           top: 120px;
            right: 874px;
             z-index: 6;"
              src="../../../img-on-phone/h7-slajder-img-16.png"/>
      </div>

       <div class="q-pa-sm forms" style="max-width: 320px; margin-top: -60px; margin-left: 550px; z-index: 10">
     <q-form class="q-pa-lg registration__form" v-if="!isRegistered" style="background-color: transparent;">
                <q-banner v-if="!!registrationError" inline-actions class="q-mb-md text-white bg-red">
                    {{registrationError}}
                </q-banner>
    <q-item>
  <q-item-section avatar>
    <q-icon color="red" name="warning"/>
  </q-item-section>
    <q-item-section style="font-weight: bold;">Please check that you are visiting</q-item-section>
  </q-item>

    <q-field outlined stack-label dense style=" cursor: text;">
        <template v-slot:control>
          <div class="flex-center flex self-center full-width no-outline" tabindex="0">https://krypto.one/</div>
        </template>
         <template v-slot:prepend>
          <q-icon color="green" size="15px" name="lock"/>
          <p style="font-size: 15px; margin-top: 17px; color: green;">Secure</p>
          <q-separator vertical inset class="q-mx-sm" style="margin-top: -0.2px;" />
        </template>
      </q-field>

       <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 330px; max-width: 300px; padding-right: 10px">

      <div class="q-pa-none q-pt-md label">
          Full Name
      </div>
      <q-input
      dense
       placeholder="Full Name"
       class="input"
       outlined
       stack-label
       :readonly="has_valid_eid"
       v-model="registration_form_data.full_name"
       :error="$v.registration_form_data.full_name.$error"
       :error-message="'full name is required'"
       @blur="$v.registration_form_data.full_name.$touch()"/>
          <template v-slot:prepend>
          <q-icon  name="people"/>
        </template>
      </q-input>

      <div class="q-pa-none label">
             Contact Number
      </div>
      <q-input
      dense
     placeholder="(+63) 9XX-XXX-XXXX"
     class="input"
     outlined
     stack-label
     v-model="registration_form_data.contact_number"
     :error="$v.registration_form_data.contact_number.$error"
     :error-message="'Contact Number is required'"
     @blur="$v.registration_form_data.contact_number.$touch()"/>
              <template v-slot:prepend>
          <q-icon  name="phone"/>
        </template>
      </q-input>

           <div class="label">
            E-mail
        </div>
       <q-input
       dense
       debounce="500"
    placeholder="yourname@gmail.com"
   class="input"
   outlined
   type="email"
   :readonly="has_valid_eid"
   v-model.lazy="registration_form_data.email"
   :error="$v.registration_form_data.email.$error"
   :error-message="emailError"
   :loading="$v.registration_form_data.email.$pending"
   @blur="$v.registration_form_data.email.$touch()"/>
              <template v-slot:prepend>
          <q-icon  name="email"/>
        </template>
      </q-input>

    <div class="label">
        Password
    </div>
    <q-input dense
   class="input"
   placeholder="•••••••••••••••"
   outlined
   autocomplete="password"
   :type="isPassword ? 'password' : 'text'"
   v-model="registration_form_data.password"
   :error="$v.registration_form_data.password.$error"
   :error-message="passwordError"
   @blur="$v.registration_form_data.password.$touch()">
        <template v-slot:append>
            <q-icon :name="isPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPassword = !isPassword"/>
        </template>
    </q-input>

     <div class="label">
          Country
      </div>
      <q-select outlined
      class="input"
      dense
      v-model="registration_form_data.country"
      :options="$options.country_options"
      option-value="code"
      option-label="name"
      :error="$v.registration_form_data.country.$error"
      :error-message="'Please select a country.'"
      @blur="$v.registration_form_data.country.$touch()">
  </q-select>

  <div class="label">
        Currency
    </div>
    <q-select outlined
    class="input"
    dense
    v-model="registration_form_data.currency"
    :options="$options.currency_options"
    option-value="value"
    option-label="label"
    :error="$v.registration_form_data.currency.$error"
    :error-message="'Please select a currency.'"
    @blur="$v.registration_form_data.currency.$touch()">
    </q-select>

    <div class="label">
            Referral Code
        </div>
        <q-input debounce="500"
       dense
       placeholder="KRPT01"
       class="input"
       outlined
       stack-label
       :readonly="has_valid_eid"
       v-model="registration_form_data.referral_code"
       :error="$v.registration_form_data.referral_code.$error"
       :error-message="$v.registration_form_data.referral_code.$pending ? '' : referralCodeError"
       :hint="$v.registration_form_data.referral_code.$pending ? '' : referralCodeError"
       :loading="$v.registration_form_data.referral_code.$pending"
       @blur="$v.registration_form_data.referral_code.$touch()"/>


        <q-checkbox class="q-py-sm"
                    right-label
                    v-model="registration_form_data.is_agree">
            I agree to the Kryptoknight's <br />
            <a href="">terms of service</a> and <a href="">privacy policy.</a>
        </q-checkbox>
        <div v-if="!registration_form_data.is_agree && $v.registration_form_data.$dirty"
             class="text-center"
             :style="{color: 'red'}">
            You must agree with our terms of service and privacy policy in order to proceed.
        </div>

      <div>
        <q-btn unelevated
               label="Create Account"
               type="submit"
               style="background: #0379ae;
               color: white;"
               class="full-width"
               @click="register()"></q-btn>
      </div>
     <q-btn unelevated
             label="Back"
             type="reset"
             color="grey"
             class="q-mt-sm full-width"
             @click="$router.push('/')"/>
   </q-scroll-area>
   </q-form>

    <p-f-registration-confirmation v-if="isRegistered"
                                           :email="registration_form_data.email"
                                           :full_name="registration_form_data.full_name"
                                           :has_valid_eid="has_valid_eid"/>


  </div>
  </q-page>
</template>


<script>
    import './PFRegistration.scss';
    import PFRegistrationConfirmation   from "./PFRegistrationConfirmation"
    import DB_USER                      from "../../../models/DB_USER"
    import DB_ENLIST_KNIGHT             from "../../../models/DB_ENLIST_KNIGHT"
    import {fbCall}                   from "../../../utilities/Callables";
    import {FN_REGISTER}                from "../../../references/refs_functions";
    import refs_countries               from "../../../references/refs_countries";
    import {currencies_list}            from "../../../references/refs_currencies";

    import {
        required,
        email,
        minLength
    } from "vuelidate/lib/validators";

    import { QSpinnerOval } from 'quasar'

    export default {
        name: "PFRegistration",
        components: {PFRegistrationConfirmation},
        data: () =>
        ({
            registration_form_data:
            {
                full_name      : '',
                contact_number : '',
                email          : '',
                password       : '',
                country        : '',
                currency       : '',
                referral_code  : '',
                is_agree       : ''
            },
             dialog: false,
             position: 'top',
             tab: 'story',
            isPassword         : true,
            isRegistered       : false,
            referral_name      : null,
            is_eligible        : false,
            registration_error :
            {
                code           : '',
                message        : ''
            },
            has_valid_eid: false,
            knight_data: null,
        contentStyle: {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
        },
         contentActiveStyle: {
        backgroundColor: '#eee',
        color: 'black'
      },

      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: 'grey',
        width: '5px',
        opacity: 0.75
      },
      layout: false,
        }),
        computed:
        {
            emailError()
            {
                return !this.$v.registration_form_data.email.required
                    ? 'Email is required'
                        : !this.$v.registration_form_data.email.email
                    ? 'Invalid E-mail Address'
                        : !this.$v.registration_form_data.email.isUnique
                    ? 'E-mail Address already exists' : ''
            },
            passwordError()
            {
                return !this.$v.registration_form_data.password.required
                    ? 'Password is required'
                        : !this.$v.registration_form_data.email.minLength
                    ? 'Must be atleast 6 characters long.' : ''
            },
            referralCodeError()
            {
                return !this.$v.registration_form_data.referral_code.$dirty
                    ? null
                        : !this.$v.registration_form_data.referral_code.required
                    ? 'Referral Code is required.'
                        : !this.$v.registration_form_data.referral_code.doesExists
                    ? 'Referral Code does not belong to anyone.'
                        : !this.$v.registration_form_data.referral_code.isEligible
                    ? 'Not Eligible to be a sponsor.'
                        :   `Referral from ${this.referral_name}`
            },
            registrationError()
            {
                return !this.registration_error.code
                    ? false
                        : this.registration_error.message === "TOO_SHORT"
                    ? "Invalid Phone Number"
                        : this.registration_error.code === "invalid-argument"
                    ? "Invalid Phone Number"
                        : this.registration_error.message
            }
        },
        methods:
        {
            async register()
            {
                this.$v.registration_form_data.$touch();
                if(this.$v.registration_form_data.$error || this.$v.registration_form_data.$pending) {return 0}

                this.$_showPageLoading({message: 'Creating an account.'});

                const registration_form_data     = Object.assign({}, this.registration_form_data);
                registration_form_data.currency   = this.registration_form_data.currency.value;

                // Do something if enlisted. Just in case u need, you can access knight_data,
                if(this.has_valid_eid)
                {
                    registration_form_data.knight_data = {
                        id  : this.$route.query.id,
                        eid : this.knight_data.eid,
                    };
                }

                await fbCall(FN_REGISTER, {registration_form_data: JSON.stringify(registration_form_data)})
                .then(data =>
                {
                    this.$_hidePageLoading();
                    this.isRegistered = true;
                })
                .catch(error =>
                {
                    this.registration_error.code    = error.code;
                    this.registration_error.message = error.message;
                    this.$_hidePageLoading();
                })
            },
        open (position) {
      this.position = position
      this.dialog = true
    }
        },
        async mounted()
        {
            if(this.$route.query.refcode)
            {
                this.registration_form_data.referral_code = this.$route.query.refcode
            }

            if(this.$route.query.hasOwnProperty('id') && this.$route.query.hasOwnProperty('eid'))
            {
                this.$_showPageLoading();
                const {id, eid} = this.$route.query;

                // Validate eid and id
                const knight_data = await DB_ENLIST_KNIGHT.getPendingEnlistment(id, eid);

                // Halt process if not valid
                if(!knight_data)
                {
                    console.log('invalid id or eid');
                    this.$_hidePageLoading();
                    return 0;
                }
                else
                {
                    this.knight_data                            = Object.assign({}, knight_data);
                    this.has_valid_eid                          = true;
                    this.registration_form_data.referral_code   = knight_data.sponsor;
                    this.registration_form_data.full_name       = knight_data.full_name;
                    this.registration_form_data.email           = knight_data.email;
                }

                this.$_hidePageLoading();
            }
        },
        validations()
        {
            return {
                registration_form_data:
                {
                    full_name      : { required },
                    contact_number : { required },
                    password       : { required, minLength: minLength(6) },
                    country        : { required },
                    currency       : { required },
                    email          :
                    {
                        required,
                        email,
                        isUnique(email)
                        {
                            if(email === '') {return true}

                            // Returns true if no user found, meaning the email is available.
                            return new Promise((resolve) => {
                                setTimeout(async () =>
                                {
                                    const user = await DB_USER.getUserByEmailAddress(email);
                                    let enlistKnight = await DB_ENLIST_KNIGHT.getEnlistmentByEmailAddress(email);

                                    if(this.knight_data)
                                    {
                                        console.log("From Enlist", this.knight_data);
                                        if(this.knight_data.email == enlistKnight.email)
                                        {
                                            enlistKnight = null;
                                        }
                                    }

                                    resolve(!user && !enlistKnight)
                                }, 500)
                            });
                        }
                    },
                    referral_code :
                    {
                        required,
                        doesExists(referral_code)
                        {
                            if(referral_code === '') {return true}

                            // Returns true if referral code belongs to an existing user.
                            return new Promise((resolve) => {
                                setTimeout(() =>
                                {
                                    DB_USER.getUserByReferralCode(referral_code).then(user =>
                                    {
                                        // check if eligible
                                        this.is_eligible  = user && !user.error ? user.nobility_info.rank_order > 1 : false;
                                        this.referral_name = this.is_eligible ? user.full_name : null;
                                        resolve(!!user)
                                    });
                                }, 500)
                            })
                        },
                        isEligible(referral_code) {
                            if(referral_code === '') {return true}
                            if(this.$v.registration_form_data.referral_code.doesExists.$pending) {return true}

                            return this.is_eligible
                        }
                    }
                }
            }
        },
        country_options  : refs_countries,
        currency_options : (() =>
        {
            return currencies_list.map(c => ({
                value: c.key,
                label: `${c.label} (${c.key})`
            }));
        })()
    }
</script>


<style>
::-webkit-scrollbar
{
	width: 3px;
	background-color: transparent;
}

::-webkit-scrollbar-thumb
{
	background-color: transparent;
	border: 2px solid white;
}
@media (max-width: 9999px)
{
  .forms
  {
    position: absolute;
    right: 500px;
  }
}
@media (max-width: 1528px)
{
  .forms
  {
    position: absolute;
    right: 500px;
  }
}
@media (max-width: 1446px)
{
  .forms
  {
    position: absolute;
    right: 500px;
  }
}
@media (max-width: 1302px)
{
  .forms
  {
    position: absolute;
    right: 400px;
  }
 .phony
  {
    left: 200px;
  }
   .phony2
  {
    left: 283px;
  }
}
@media (max-width: 1218px)
{
  .forms{
    position: absolute;
    right: 300px;
  }
}
@media (max-width: 1106px)
{
   .phony2
  {
    left: 203px;
  }
  .phony
  {
    left: 120px;
  }
}
@media (max-width: 1006px)
{
   .phony2
  {
    left: 123px;
  }
  .phony
  {
    left: 40px;
  }
}
@media (max-width: 944px)
{
   .phony2
  {
    left: 63px;
  }
  .phony
  {
    left: -20px;
  }
}
@media (max-width: 875px)
{
  .forms
  {
    position: absolute;
    right: 270px;
  }
  .remove
  {
    display: none;;
  }
}
@media (max-width: 789px)
{
  .forms
  {
    position: absolute;
    right: 250px;
  }
}
@media (max-width: 728px)
{
  .forms
  {
    position: absolute;
    right: 210px;
  }
}
@media (max-width: 680px)
{
  .forms
  {
    position: absolute;
    right: 180px;
  }
}
@media (max-width: 629px)
{
  .forms
  {
    position: absolute;
    right: 150px;
  }
}
@media (max-width: 629px)
{
  .forms
  {
    position: absolute;
    right: 120px;
  }
}
@media (min-width: 522px)
{
  .ourstory-phone
  {
    display: none;
  }
}
@media (max-width: 522px)
{
  .ourstory
  {
    display: none;
  }
}
@media (max-width: 493px)
{
  .forms
  {
    position: absolute;
    right: 100px;
  }
}
@media (max-width: 461px)
{
  .forms
  {
    position: absolute;
    right: 80px;
  }
}
@media (max-width: 418px)
{
  .forms
  {
    position: absolute;
    right: 50px;
  }
}
@media (max-width: 375px)
{
  .forms
  {
    position: absolute;
    right: 30px;
  }
}
@media (max-width: 343px)
{
  .forms
  {
    position: absolute;
    right: 0;
  }
}
</style>
