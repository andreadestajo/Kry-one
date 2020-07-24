<template>
    <q-layout class="member" view="lHh Lpr lFf">
        <!-- HEADER -->
        <q-header>
            <q-toolbar>
              <img width="40px" v-if="project == 'krypto-one-live'" src="../iconkrypto.png"/>
                <p v-if="project == 'krypto-one-live'" style="margin-top: 10px; font-size: 20px;" class="text-overline text-sizings text-center">Krypto.One™</p>

                <img width="40px" v-if="project != 'krypto-one-live'" src="../iconkrypto.png"/>
                    <p v-if="project != 'krypto-one-live'" style="margin-top: 10px; font-size: 20px;" class="text-overline text-sizings text-center">KryptoKnight.Me</p>


                <q-space/>

                <q-chip class="sizings">
                 <q-avatar size="32px">
                    <q-img :src="$_current_user_data.photo_url ? $_current_user_data.photo_url : '../statics/boy.jpg'"></q-img>
                </q-avatar>

                <!-- Phone settings view-->

                 <q-btn-dropdown color="primary" class="sizing3" unelevated rounded flat>
                     <q-list>
                    <q-item clickable v-close-popup @click.native="$router.push({name: 'member_profile'})">
                      <q-item-section>
                        <q-item-label>Profile</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup @click.native="$router.push({name: 'logout'})">
                      <q-item-section>
                        <q-item-label>Logout</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

            <!-- Desktop settings view-->
                     
                     <q-btn-dropdown color="primary" class="sizing2" unelevated rounded flat :label="$_current_user_data ? $_current_user_data.full_name : ''">

                  <q-list>
                    <q-item clickable v-close-popup @click.native="$router.push({name: 'member_profile'})">
                      <q-item-section>
                        <q-item-label>Profile</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-separator/>

                    <q-item clickable v-close-popup @click="logout">
                      <q-item-section>
                        <q-item-label>Logout</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
            </q-chip>

                  <q-btn color="white" :icon="`img:https://www.countryflags.io/${$_current_user_data.country.code}/flat/64.png`" style="font-size: 0.8em" flat/>
                <q-btn @click="$router.push({ name: 'member_notification'})" flat round dense icon="notifications">
                    <q-badge floating color="red" v-if="$_current_user_data.notification_count">
                        {{$_current_user_data.notification_count}}
                    </q-badge>
                </q-btn>
            </q-toolbar>
        </q-header>

        <div style="margin-top: 50px;">
        <member-tabs/>
        </div>

    
            
        <!-- PAGES -->
        <q-page-container>
            <div class="page-wrapper">
                <router-view />
    <div class="site-footer" style="padding: 20px">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text" style="margin-top: 30px">Copyright &copy; 2020 All Rights Reserved by 
         <a href="#">KryptoOne</a>
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" target="_blank" href="https://www.facebook.com/KryptoOneAI/"><i class="fab fa-facebook-f"></i></a></li>
              <li><a class="telegram" target="_blank" href="https://l.facebook.com/l.php?u=https%3A%2F%2Ft.me%2Fjoinchat%2FILsVoVHNaTWYwRh0mlweaA%3Ffbclid%3DIwAR2WAeDe7lTMcdkyaB74DLTyF9M8xjpU3-3YvzjWGoJbYWMeiCgnKBc1zS8&h=AT1aJpEsOGlyQM0GcLFRW6ii_3JFXx3H9WKxjy2X580RYl8J1__6fuqmMogcutwDzAZYoSG3as-0QIkBktta8_MrKxnYHLEfAtNE1IAAlY6XJLeIiiHZ8QVjueGHMh6QD0j03A"><i class="fab fa-telegram-plane"></i></a></li>
              <li><a class="youtube" target="_blank" href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCWx3N7OhIgOlOsndE5aEXVg%3Ffbclid%3DIwAR38IZwTGbqLetmpnp4KbjWQHty128cA6_0FfU86-scdPNN_61uLR7NaARI&h=AT1aJpEsOGlyQM0GcLFRW6ii_3JFXx3H9WKxjy2X580RYl8J1__6fuqmMogcutwDzAZYoSG3as-0QIkBktta8_MrKxnYHLEfAtNE1IAAlY6XJLeIiiHZ8QVjueGHMh6QD0j03A"><i class="fab fa-youtube"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
</div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>
import styles from './MemberLayout.scss';
import DB_USER from '../models/DB_USER';
import MemberTabs from '../components/Member/MemberTabs';

export default
{
    name: 'AdminLayout',
    components: {MemberTabs,},
    data: () =>
    ({
        project : "krypto-one-live",
    }),
    mounted()
    {
        this.project = env('FIREBASE_PROJECTID');
    },
    methods:
    {
        logout()
        {
          DB_USER.signOut()
          .then(() => {
              this.$router.push({name: 'front_login'})
          });
            
        }
    }
}
</script>

<style>
    @media (min-width: 704px)
    {
        .phoneview
        {
            display: none;
        }
        .sizing3
        {
            display: none;
        }
    }
    @media (max-width: 704px)
    {
        .sizing2
        {
            display: none;
        }
        @media (max-width: 456px)
        {
            .text-sizings
            {
                display: none;
            }
        }
    }
.site-footer a
{
  color:#737373;
}
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links
{
  padding-left:0;
  list-style:none
}
.footer-links a
{
  color:#737373
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.site-footer .social-icons
{
  text-align:right
}
.site-footer .social-icons a
{
  width:40px;
  height:40px;
  line-height:40px;
  margin-left:6px;
  margin-right:0;
  border-radius:100%;
  background-color:#33353d
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:30px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text,.site-footer .social-icons
  {
    text-align:center
  }
}
.social-icons
{
  padding-left:0;
  margin-bottom:0;
  list-style:none
}
.social-icons li
{
  display:inline-block;
  margin-bottom:4px
}
.social-icons li.title
{
  margin-right:15px;
  text-transform:uppercase;
  color:#96a2b2;
  font-weight:700;
  font-size:13px
}
.social-icons a{
  background-color:#eceeef;
  color:#818a91;
  font-size:16px;
  display:inline-block;
  line-height:44px;
  width:44px;
  height:44px;
  text-align:center;
  margin-right:8px;
  border-radius:100%;
  -webkit-transition:all .2s linear;
  -o-transition:all .2s linear;
  transition:all .2s linear
}
.social-icons a:active,.social-icons a:focus,.social-icons a:hover
{
  color:#fff;
  background-color:#29aafe
}
.social-icons.size-sm a
{
  line-height:34px;
  height:34px;
  width:34px;
  font-size:14px
}
.social-icons a.facebook:hover
{
  background-color:#3b5998
}
.social-icons a.telegram:hover
{
  background-color:#00aced
}
.social-icons a.youtube:hover
{
  background-color: #FF0000
}
@media (max-width:767px)
{
  .social-icons li.title
  {
    display:block;
    margin-right:0;
    font-weight:600
  }
}
</style>