<template>
    <div class="nobility">
        <k-header icon="fa fa-crown" detail="Explore different kinds of royalties.">Nobilities</k-header>
        
        <div>
            <k-card class="q-mt-md">
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                    <q-tab name="royalties" label="Royalties" />
                    <q-tab name="knight_match" label="Knight Match" />
                    <q-tab name="referral_bonus" label="Referral" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <!-- ROYALTIES -->
                    <q-tab-panel name="royalties">
                        <royalties />
                    </q-tab-panel>

                    <!-- KNIGHT MATCH -->
                    <q-tab-panel name="knight_match">
                        <knight-match />
                    </q-tab-panel>


                    <!-- REFERRAL BONUS -->
                    <q-tab-panel name="referral_bonus">
                        <referral />
                    </q-tab-panel>
                </q-tab-panels>
            </k-card>
        </div>
    </div>
</template>

<script>
import KHeader from '../../../components/Member/KHeader';
import KCard from '../../../components/Member/KCard';
import Royalties from './PMNobilitiesRoyalties';
import KnightMatch from './PMNobilitiesKnightMatch';
import Referral from './PMNobilitiesReferral';
import styles from './PMNobilities.scss';

export default
{
    components: { KHeader, KCard, Royalties, KnightMatch, Referral },
    filters: { },
    data:() =>(
    {
        tab: 'royalties',
    }),
    mounted() { },
    methods: { },
    computed: { }
}
</script>