<template>
  <q-page class="no-scroll">
      <div class="q-pa-md heights" style="margin-top: 50px;">
         <div class="q-gutter-y-md" style="max-width: 600px">
          <img style="height: 100px; margin-top: -40px; margin-left: 20px" src="../../Crypto-img/Krypto01.png"/>
        </div>
        
        <q-btn style="float: right; margin-top: -80px;" size="20px" flat icon="fas fa-bars" @click="open('top')"><q-tooltip :delay="200" anchor="bottom left" self="top left" transition-show="rotate" transition-hide="scale" content-style="font-size: 10px; width: 80px;">
          Our Story & Our Services
        </q-tooltip>
        </q-btn>

        <q-dialog v-model="dialog" :position="position">
          <q-card flat class="fixed-right" style="width: 550px; padding-bottom: 1000px; background: rgba(0,0,0,0.6); overflow: hidden">
             <q-btn dense flat icon="close" class="q-pa-md" v-close-popup color="white" style="position: absolute;"/>
          <q-tabs v-model="tab" active-color="green" class="text-white" narrow-indicator no-caps style="float: left; margin-left: 20px; width: 500px; margin-top: 50px;">
            <q-tab style="font-size: 25px" name="story">Our Story</q-tab>
            <q-tab style="font-size: 25px" name="services">Our Services</q-tab>
          </q-tabs>

          <!-- Our Story -->

          <q-tab-panels v-model="tab" animated style="width: 550px; height: 500px; margin-left: 65px; background: transparent; color: white;">

            <q-tab-panel name="story">
              <div class="text-h6" style="font-size: 33px;"><b>OUR STORY</b></div>
              <img style="width: 400px; padding-top: 20px" src="../../Crypto-img/buildings.jpg"/>
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
            src="../../Crypto-img/h7-slajder-img-5.png"/>
      </div>

       <div>
        <img class="remove"
        style="height: 400px
        ; position: absolute;
         top: 180px;
          left: -300px;
           z-index: 3;"
            src="../../Crypto-img/Keyboard.png"/>
      </div>

      <div>
         <img class="remove"
         style="height: 150px;
          position: absolute;
           top: 80px;
            right: 50px;
             z-index: 4;
             " src="../../Crypto-img/Eye-Glasses.png"/>
      </div>

      <div>
         <img class="remove"
         style="height: 300px;
          position: absolute;
           top: 260px;
            right: 0;
             z-index: 5;"
              src="../../Crypto-img/Note.png"/>
      </div>

      <div>
        <img class="phony remove"
        style="height: 480px;
          position: absolute;
           top: 80px;
            right: 850px;
             z-index: 7;"
              src="../../Crypto-img/Phone.png"/>
      </div>

       <div>
        <img class="phony2 remove"
        style="height: 388px;
          position: absolute;
           top: 120px;
            right: 874px;
             z-index: 6;"
              src="../../img-on-phone/h7-slajder-img-16.png"/>
      </div>

    <div class="forgot_responsive">
       <div class="q-pa-sm forms" style="max-width: 320px; margin-top: -20px; margin-left: 550px; z-index: 10;">
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
    <q-item>
  <q-item-section avatar>
    <q-icon color="red" name="warning"/>
  </q-item-section>
    <q-item-section style="font-weight: bold;">Please check that you are visiting</q-item-section>
  </q-item>

    <q-field outlined stack-label dense style=" cursor: text;" class="full-width">
        <template v-slot:control>
          <div class="flex-center flex self-center full-width no-outline" tabindex="0">https://krypto.one/</div>
        </template>
         <template v-slot:prepend>
          <q-icon color="green" size="15px" name="lock"/>
          <p style="font-size: 15px; margin-top: 17px; color: green;">Secure</p>
          <q-separator vertical inset class="q-mx-sm" style="margin-top: 0.8px;" />
        </template>
      </q-field>
      <h5 style="text-align: center;"><b><strong>FORGOT PASSWORD?</strong></b></h5>

                   <div>
                    E-mail
                </div>
      <q-input
        outlined
         type="email"
         class="q-pb-lg full-width"
         placeholder= "Enter your email"
         v-model="email"
         :error="$v.email.$error"
         :error-message="emailError"
         @blur="$v.email.$touch()">
          <template v-slot:prepend>
          <q-icon  name="email"/>
        </template>
      </q-input>

    <q-btn unelevated
           label="Submit"
           type="submit"
           style="background: #0379ae; 
           color: white;"
           class="full-width"
           @click="forgotPassword()"/>

     <q-btn unelevated
           label="Back"
           type="reset"
           color="grey"
           class="q-mt-sm full-width"
           @click="$router.go(-1)"/>

         <q-banner v-if="is_email_sent" inline-actions class="q-pa-md full-width text-white bg-green">
            An email for resetting your password has been successfully sent.
        </q-banner>

    </q-form>
  </div>
    </div>
  </q-page>
</template>

<script>
    import {fbCall}            from "../../utilities/Callables";
    import {FN_RESET_PASSWORD} from "../../references/refs_functions";

    import {required, email} from "vuelidate/lib/validators";

    export default {
        name: "PFForgotPassword",
        data: () =>
        ({
            email         : '',
            is_email_sent : false,
            tab: 'story',
            dialog: false,
            positin: 'top'
        }),
        computed:
        {
            emailError()
            {
                return !this.$v.email.required
                    ? 'Email is required'
                        : !this.$v.email.email
                    ? 'Invalid E-mail Address' : ''
            },
        },
        methods:
        {
            async forgotPassword()
            {
                this.$v.email.$touch();
                if(this.$v.email.$error) {return 0}

                this.$_showPageLoading();
                await fbCall(FN_RESET_PASSWORD, {email: this.email})
                .then(data =>
                {
                    this.is_email_sent = true;
                })
                .catch(error => {
                    console.log(error);
                });

                this.$_hidePageLoading();
            },
            open (position) {
                  this.position = position
                     this.dialog = true
          }
        },
        validations:
        {
            email : {required, email},
        }
    }
</script>



<style>
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
    width: 50%;
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
@media (min-width: 875px)
{
  .forgot_responsive
  {
    margin-top: -50px;
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
    display: none;
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
    width: 100%;
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
@media (max-width: 493px)
{
  .forms
  {
    position: absolute;
    right: 90px;
  }
}
@media (max-width: 461px)
{
  .forms
  {
    position: absolute;
    right: 60px;
  }
}
@media (max-width: 418px)
{
  .forms
  {
    position: absolute;
    right: 30px;
  }
}
@media (max-width: 375px)
{
  .forms
  {
    position: absolute;
    right: 20px;
  }
}
@media (max-width: 366px)
{
  .forms
  {
    position: absolute;
    right: 15px;
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
@media (max-width: 329px)
{
  .forms
  {
    position: absolute;
    width: 95%;
  }
}
</style>
