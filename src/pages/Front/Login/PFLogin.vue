<template>
  <q-page>
      <div class="q-pa-md heights" style="margin-top: 50px;">
         <div class="q-gutter-y-md" style="max-width: 600px">
          <img style="height: 50px; margin-top: 10px; margin-left: 20px" src=""/>
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

    <q-field outlined stack-label dense style=" cursor: text;">
        <template v-slot:control>
          <div class="flex-center flex self-center full-width no-outline" tabindex="0">https://krypto.one/</div>
        </template>
         <template v-slot:prepend>
          <q-icon color="red" size="15px" name="lock"/>
          <p style="font-size: 15px; margin-top: 17px; color: red;">Secure</p>
          <q-separator vertical inset class="q-mx-sm" style="margin-top: 0.8px;" />
        </template>
      </q-field>
          <q-banner v-if="!!loginError" inline-actions class="q-mb-md text-white bg-red">
        {{loginError}}
    </q-banner>

      <q-input
       class="input"
        placeholder="yourname@gmail.com"
        outlined
        type="email"
        v-model="login_form_data.email"
        :error="$v.login_form_data.email.$error"
        :error-message="emailError"
        @blur="$v.login_form_data.email.$touch()">
          <template v-slot:prepend>
          <q-icon  name="email"/>
        </template>
      </q-input>

      <q-input
     class="input"
     outlined
     autocomplete="password"
      placeholder="•••••••••••••••"
    v-model="login_form_data.password"
   :type="is_password ? 'password' : 'text'"
 :error="$v.login_form_data.password.$error"
    :error-message="passwordError"
  @blur="$v.login_form_data.password.$touch()">
         <template v-slot:append>
           <q-icon :name="is_password ? 'visibility_off' : 'visibility'"
                     class="cursor-pointer"
                    @click="is_password = !is_password"/>
              </template>
              <template v-slot:prepend>
          <q-icon  name="lock"/>
        </template>
      </q-input>

      <q-btn to="/forgotPassword" style="float: right; cursor: pointer;" flat no-caps>Forgot Password?</q-btn>

      <div>
        <q-btn
         label="Login" 
         style="width: 300px; 
         background: #0379ae; 
         color: white;"
          type="submit"
          unelevated
       @click="signInWithEmailAndPassword()"/>
      </div>
    </q-form>
     <q-btn to="register" label="Create an account" no-caps style="width: 300px" type="submit" flat color="black"/>
  </div>

  </q-page>
</template>

<script>
    import styles   from './PFLogin.scss';
    import DB_USER  from "../../../models/DB_USER"

    import {
        MUTATION_SET_CURRENT_AUTH_ID,
        MUTATION_SET_CURRENT_USER_DATA
    } from "../../../store/user-module/mutations";

    import {
        required,
        email,
        minLength
    } from "vuelidate/lib/validators";

    export default {
        name: "PFRegistration",
        data: () =>
        ({
            login_form_data:
            {
                email         : '',
                password      : '',
            },
            is_password      : true,
            unverified_email : '',
            login_error_code : ''
        }),
        isPwd: true,
         dense: true,
        computed: {
            emailError()
            {
                return !this.$v.login_form_data.email.required
                    ? 'Email is required'
                        :!this.$v.login_form_data.email.email
                    ? 'Invalid E-mail Address' : ''
            },
            passwordError()
            {
                return !this.$v.login_form_data.password.required
                    ? 'Password is required'
                       : !this.$v.login_form_data.email.minLength
                    ? 'Must be atleast 6 characters long.' : ''
            },
            loginError()
            {
                return !this.login_error_code
                    ? false
                        : this.login_error_code === 'auth/user-not-found'
                    ? 'E-mail and Password do not match.'
                        : this.login_error_code === 'auth/wrong-password'
                    ? 'E-mail and Password do not match.'
                        : 'Something went wrong. Please try again.'
            }
        },
        methods:
        {
            async signInWithEmailAndPassword()
            {
                this.$v.login_form_data.$touch();
                if(this.$v.login_form_data.$error) {return 0}

                // Start authenticating the user
                this.$_showPageLoading({message: 'Logging in...'});
                DB_USER.signIn(this.login_form_data.email, this.login_form_data.password)
                .then(async data =>
                {
                    if(!data) {return 0}

                    if(data)
                    {
                        // Get user data
                        let current_user = await DB_USER.doc(data.user.uid).get();
                        current_user = Object.assign(current_user.data(), {id: current_user.id});

                        // Update email
                        if(data.user.emailVerified && !current_user.email_verified)
                        {
                            DB_USER.doc(data.user.uid).update({email_verified: data.user.emailVerified})
                        }

                        // commit here
                        this.$store.commit(MUTATION_SET_CURRENT_AUTH_ID, data.user.uid);
                        this.$store.commit(MUTATION_SET_CURRENT_USER_DATA, current_user);

                        // Set local storage
                        localStorage.setItem('auth_id', data.user.uid);

                        // Redirect user
                        const route_name = !current_user.hasOwnProperty('roles') || !current_user.roles
                            ? 'member_dashboard'
                                : current_user.roles.includes('developer')
                            ? 'member_dashboard'
                                : current_user.roles.includes('admin')
                            ? 'member_dashboard'
                                : 'member_dashboard';

                        this.$router.push({name: route_name})
                    }
                    this.$_hidePageLoading();
                })
                .catch(error => {
                    console.log(error);

                    // if user is block
                    if (error.code == 'auth/user-disabled')
                    {
                        this.$router.push({name: 'front_block'});
                    }
                    // Show a snackbar here
                    this.login_error_code = error.code;
                    this.$_hidePageLoading();
                })
            }
        },
        validations: 
        {
            login_form_data:
            {
                email    : {required, email},
                password : {required, minLength: minLength(6)}
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
