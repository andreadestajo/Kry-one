<template>
    <div class="invite">
        <div class="invite__image">
            <q-img class="img" :ratio="5/2" src="../statics/invite.jpg"></q-img>
        </div>
        <div class="invite__info">
            <div class="label">SHARE YOUR REFERRAL CODE</div>
            <div class="code">
                <div class="code-value">{{$_current_user_data.referral_code}}</div>
            </div>
            <div class="share">
                <q-btn @click="copyLink" color="primary">Copy Share Link</q-btn>
            </div>
            <div class="how">
                <div class="main">HOW IT WORKS</div>
                <div class="list">
                    <div v-for="step in $options.step_options" :key="step.step" class="list-container">
                        <div class="list-title">
                            <div class="number">{{ step.step }}</div>
                            <div class="value">{{ step.title }}</div>
                        </div>
                        <div class="list-detail">
                            {{ step.detail }}
                        </div>
                    </div>

                </div>
            </div>
        </div>


    </div>
</template>

<script>
import styles from './PMInvite.scss';
import KHeader from '../../../components/Member/KHeader';
import KCard from '../../../components/Member/KCard';

export default
{
    components: {KHeader, KCard},
    filters: { },
    data:() =>
    ({
    }),
    computed: { },
    methods:
    {
        copyLink () {
            // TODO Shareable link
            const resolved_route = (this.$router.resolve({
                name  : 'front_register',
                query : {refcode: this.$_current_user_data.referral_code}
            }));

            const el = document.createElement('textarea');
            el.value = resolved_route.href;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        },
    },
    mounted() { },
    step_options:
    [
        { step: 1, title: 'Share your referral code', detail: 'Share your referral link or sign up code to friends.' },
        { step: 2, title: 'Help Friends Sign Up', detail: 'Share your referral link or sign up code to friends.' },
        { step: 3, title: 'Get Rewards', detail: 'Share your referral link or sign up code to friends.' },
    ],
}
</script>
