<template>
  <q-page>
      <div class="q-pa-md heights" style="margin-top: 50px;">
         <div class="q-gutter-y-md" style="max-width: 600px">
          <img style="height: 50px; margin-top: 10px; margin-left: 20px" src="../../krypto01.png"/>
        </div>
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

       <div class="q-pa-sm forms" style="max-width: 320px; margin-top: 0; margin-left: 550px; z-index: 10;">
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
          <q-icon color="red" size="15px" name="lock"/>
          <p style="font-size: 15px; margin-top: 17px; color: red;">Secure</p>
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
            is_email_sent : false
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
            }
        },
        validations:
        {
            email : {required, email},
        }
    }
</script>



<style>
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
    right: 90px;
  }
}
@media (max-width: 375px)
{
  .forms
  {
    position: absolute;
    right: 70px;
  }
}
@media (max-width: 325px)
{
  .forms
  {
    position: absolute;
    right: 35px;
  }
}
</style>
