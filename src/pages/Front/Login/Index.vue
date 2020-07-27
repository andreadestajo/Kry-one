<template>
  <q-page>
      <div class="q-pa-md">
         <div class="q-gutter-y-md" style="max-width: 600px">
          <img style="height: 50px; margin-top: 30px; margin-left: 20px" src="../krypto01.png"/>
        </div>
        <p style="color: #f5f5f5;
         font-size: 250px;
          font-weight: bolder;
          position: absolute;
           margin-top: 80px;
            margin-left: 150px;
             z-index: -1;
             opacity: 0.8"
             ><strong>crypto</strong></p>
      </div>

      <div>
        <img class="remove"
        style="height: 170px;
         position: absolute;
          top: 180px;
           z-index: 2;"
            src="../Crypto-img/h7-slajder-img-5.png"/>
      </div>

       <div>
        <img class="remove"
        style="height: 400px
        ; position: absolute;
         top: 180px;
          left: -300px;
           z-index: 3;"
            src="../Crypto-img/Keyboard.png"/>
      </div>

      <div>
         <img class="remove"
         style="height: 150px;
          position: absolute;
           top: 80px;
            right: 50px;
             z-index: 4;
             " src="../Crypto-img/Eye-Glasses.png"/>
      </div>

      <div>
         <img class="remove"
         style="height: 300px;
          position: absolute;
           top: 260px;
            right: 0;
             z-index: 5;"
              src="../Crypto-img/Note.png"/>
      </div>

      <div>
        <img class="phony remove"
        style="height: 480px;
          position: absolute;
           top: 80px;
            right: 850px;
             z-index: 7;"
              src="../Crypto-img/Phone.png"/>
      </div>

       <div>
        <img class="phony2 remove"
        style="height: 388px;
          position: absolute;
           top: 120px;
            right: 874px;
             z-index: 6;"
              src="../img-on-phone/h7-slajder-img-16.png"/>
      </div>

       <div class="q-pa-sm forms" style="max-width: 320px; margin-top: 0; margin-left: 550px; z-index: 10">
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

    <q-field outlined stack-label :dense="dense" style=" cursor: text;">
        <template v-slot:control>
          <div class="flex-center flex self-center full-width no-outline" tabindex="0">https://krypto.one/</div>
        </template>
         <template v-slot:prepend>
          <q-icon color="red" size="15px" name="lock"/>
          <p style="font-size: 15px; margin-top: 19px; color: red;">Secure</p>
          <q-separator vertical inset class="q-mx-sm" style="margin-top: 0.8px;" />
        </template>
      </q-field>

      <q-input
        outlined
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[ val => val && val.length > 15 || 'Email is required']">
          <template v-slot:prepend>
          <q-icon  name="email"/>
        </template>
      </q-input>

      <q-input
        outlined
        :type="isPwd ? 'password' : 'text'"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Password is required']">
        <template v-slot:prepend>
          <q-icon  name="lock"/>
        </template>
          <template v-slot:append>
        <q-icon 
        :name="isPwd ? 'visibility_off' : 'visibility'"
        @click="isPwd = !isPwd"/>
          </template>
      </q-input>

      <q-btn @click="layout4 = true" style="float: right; cursor: pointer;" flat no-caps>Forgot Password?</q-btn>

      <div>
        <q-btn label="Login" style="width: 300px; background: #0379ae; color: white;" type="submit"/>
      </div>
    </q-form>
     <q-btn label="Create an account" no-caps style="width: 300px" type="submit" flat color="black"  @click="layout = true"/>




      <q-dialog v-model="layout">
      <q-layout view="Lhh lpR fff" container class="bg-white" style="overflow: hidden;">
         <q-page class="flex flex-center">
             <q-toolbar>
             <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
                <div class="q-pa-sm" style="max-width: 315px">
              <q-item-section class="flex flex-center" style="font-weight: bold; font-size: 20px;">SIGN UP FOR A FREE ACCOUNT</q-item-section>

       <q-select 
       outlined v-model="model" 
       :options="options" 
       label="Location"
        :rules="[ val => val && val.length > 1 || 'Location is required']">
       <template v-slot:prepend>
          <q-icon  name="place"/>
        </template>
       </q-select>

      <q-input
        outlined 
        clearable
        clear-icon="close"
        v-model="name"
        label="Full Name"
        lazy-rules
        :rules="[ val => val && val.length > 4 || 'Name is required']">
        <template v-slot:prepend>
          <q-icon  name="people"/>
        </template>
      </q-input>

       <q-input
        outlined 
         clearable
         suffix="@gmail.com"
         type="email"
        clear-icon="close"
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[ val => val && val.length > 4 || 'Email is required']">
        <template v-slot:prepend>
          <q-icon  name="email"/>
        </template>
      </q-input>

       <q-input
        outlined 
        :type="isPwd ? 'password' : 'text'"
        v-model="password"
        label="Password"
        lazy-rules
        :rules="[ val => val && val.length > 3 || 'Password is required']">
        <template v-slot:prepend>
          <q-icon  name="lock"/>
        </template>
          <template v-slot:append>
        <q-icon 
        :name="isPwd ? 'visibility_off' : 'visibility'"
        @click="isPwd = !isPwd"/>
          </template>
      </q-input>

       <q-input
        outlined
        v-model="confimation"
        type="password"
        label="Confirm Password"
        lazy-rules
        :rules="[ val => val && val.length > 3 || 'Confirmation is required']">
        <template v-slot:prepend>
          <q-icon  name="lock"/>
        </template>
      </q-input>

      <div>
        <q-btn @click="layout2 = true" label="Continue" v-close-popup no-caps style="width: 300px" type="submit" color="primary"/>
      </div>
      <p style="text-align: center;">Already have an account? <q-btn flat color="primary"  v-close-popup style="cursor: pointer;" to="/">Sign In</q-btn></p>
      
  </div>
  </q-page>
      </q-layout>
      </q-dialog>




        <q-dialog v-model="layout2">
      <q-layout view="Lhh lpR fff" container class="bg-white">
         <q-page class="flex flex-center" style="margin-top: -50px">
             <q-toolbar>
             <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
                <div class="q-pa-sm" style="max-width: 315px">

                    <q-item-section class="flex flex-center" style="text-align: center;">We sent you an email verification code<br>Please enter the code below:</q-item-section>


      <q-input
        
        v-model="code"
        label="Email Verification Code"
        lazy-rules
        :rules="[ val => val && val.length > 3 || 'Please type the code']">
          <template v-slot:prepend>
          <q-icon  name="code"/>
        </template>
      </q-input>

    
      <div>
        <q-btn  @click="layout3 = true"  v-close-popup label="Verify" style="width: 300px" type="submit" color="primary"/>
      </div>
      <p style="text-align: center;">Haven't receive your code? <br> Check your Spam folder or<br><q-btn flat color="primary" style="cursor: pointer;">Resend Email</q-btn></p>

                  </div>
          </q-page>
        </q-layout>
      </q-dialog>
      
         <q-dialog v-model="layout3">
      <q-layout view="Lhh lpR fff" container class="bg-white">
         <q-page class="flex flex-center" style="margin-top: -50px">
             <q-toolbar>
             <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
                <div class="q-pa-sm" style="max-width: 315px">

                        <q-icon size="80px" style="margin-left: 90px; color: #1976D2;" name="shield"/>
      <q-icon size="60px" style="margin-left: -69px; margin-top: 10px; position: absolute; color: white;" name="check"/>
      <h4 class="flex flex-center" style="font-weight: bold; color: #1976D2;">Congratulation!</h4>
     <q-item-section class="flex flex-center" style="font-weight: bold;">Hi (Full Name).</q-item-section>
  <q-item-section class="flex flex-center" style="text-align: center;">Your email address has been verified.<br>Please login to process your account.</q-item-section>

    
      <div>
        <q-btn v-close-popup label="Login" style="width: 300px" type="submit" color="primary"/>
      </div>

    <div class="flex flex-center" style="color: #BBBBBB;">
    <q-icon name="copyright"/><a>2020 Copyright. Alright reserved</a>
  </div>

                  </div>
          </q-page>
        </q-layout>
      </q-dialog>

         <q-dialog v-model="layout4">
      <q-layout view="Lhh lpR fff" container class="bg-white">
         <q-page class="flex flex-center" style="margin-top: -50px">
             <q-toolbar>
             <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
                <div class="q-pa-sm" style="max-width: 315px">

                     <q-item-section class="flex flex-center" style="font-weight: bold;">Password Reset</q-item-section>
  <q-item-section class="flex flex-center" style="text-align: center;">Enter the email you use for Lexicon Bank<br> and we'll send you instructions<br> to reset your password</q-item-section>


      <q-input
        outlined
        v-model="email"
        label="Email"
        lazy-rules
        :rules="[ val => val && val.length > 15 || 'Please type your email']">
          <template v-slot:prepend>
          <q-icon  name="email"/>
        </template>
      </q-input>

      <q-field filled stack-label >
        <template v-slot:control>
          <q-item>
           <q-checkbox v-model="accept" />
          <div class="self-center full-width no-outline" tabindex="0">I'm not a robot</div>
          </q-item>
            <img style="width: 50px; margin-left: 60px;" src="../captcha.png"/>
        </template>
      </q-field>
      
      <div>
        <q-btn @click="layout5 = true" v-close-popup label="Reset Password" style="width: 300px" type="submit" color="primary"/>
      </div>
      <p style="text-align: center;">You don't have a Lexicon Bank yet? <br> Please sign up instead. <q-btn flat color="primary" style="cursor: pointer;" v-close-popup @click="layout = true">Sign Up here</q-btn></p>
                  </div>
          </q-page>
        </q-layout>
      </q-dialog>


     <q-dialog v-model="layout5">
      <q-layout view="Lhh lpR fff" container class="bg-white">
         <q-page class="flex flex-center" style="margin-top: -50px">
             <q-toolbar>
             <q-btn flat v-close-popup round dense icon="close" />
          </q-toolbar>
                <div class="q-pa-sm" style="max-width: 315px">

                     <q-icon style="margin-left: 125px;" size="50px" name="email"/>
     <h4 style="font-weight: bold; text-align: center;">Check your email!</h4>
        <p style="text-align: center;">We just sent you an email with a link to reset your password</p>
     <q-btn v-close-popup style="margin-left: 90px;" color="primary" label="Back to login"/>

                  </div>
          </q-page>
        </q-layout>
      </q-dialog>

  </div>

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
<script>
export default {
  data () {
    return {
      email: null,
      password: null,
      isPwd: true,
      dense: true,
      name: null,
      code: null,
      confirmation: null,
      model: null,
      layout: false,
      layout2: false,
      layout3: false,
      layout4: false,
      layout5: false,
      accept: false,

        options: [
        '	Afghanistan',
         'Albania',
          'Algeria',
           'Andorra',
            'Angola',
            'Antigua',
            'Argentina',
            'Armenia',
            'Australia',
            'Austria',
            'Azerbaijan',
            'Bahamas',
            'Bahrain',
            'Bangladesh',
            'Barbados',
            'Belarus',
            'Belgium',
            'Belize',
            'Benin',
            'Bhutan',
            'Bolivia',
            'Bosnia',
            'Botswana',
            'Brazil',
            'Brunei',
            'Bulgaria',
            'Burkina Faso',
            'Burundi',
            'Cambodia',
            'Cameroon',
            'Canada',
            'Central African Republic	',
            'Chad',
            'Chile',
            'China',
            'Colombia',
            'Comoros',
            'Costa Rica',
            'Croatia',
            'Cuba',
            'Cyprus',
            'Czechia (Czech Republic)',
            'Denmark',
            'Dominica',
            'Dominican Republic',
            'Ecuador',
            'Egypt',
            'Finland',
            'France',
            'Georgia',
            'Germany',
            'Greece',
            'Guinea',
            'Hungary',
            'Iceland',
            'India',
            'Indonesia',
            'Iran',
            'Iraq',
            'Ireland',
            'Israel',
            'Italy',
            'Jamaica',
            'Japan',
            'Jordan',
            'Kazakhstan',
            'Kuwait',
            'Laos',
            'Liberia',
            'Libya',
            'Madagascar',
            'Malaysia',
            'Maldives',
            'Mexico',
            'Monaco',
            'Mongolia',
            'Morocco',
            'Myanmar',
            'Nepal',
            'Netherlands',
            'New Zealand',
            'Nigeria',
            'North Korea',
            'Norway',
            'Oman',
            'Pakistan',
            'Palau',
            'Peru',
            'Philippines',
            'Poland',
            'Portugal',
            'Qatar',
      ],
    }
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
