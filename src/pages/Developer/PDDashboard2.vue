<template>
    <div class="q-pa-md">
        <q-list bordered class="rounded-borders">
            <q-expansion-item expand-separator label="Users Collection">
                <q-card>
                    <q-card-section>
                        <q-btn flat color="primary" @click="addFilters">ADD FILTERS</q-btn>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
            <q-expansion-item expand-separator label="Enlist Knights Collection">
                <q-card>
                    <q-card-section>
                        <q-btn flat color="primary" @click="updateEnlistKnights">ADD COLOR AND TITLE</q-btn>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
    </div>
</template>

<script>
    import DB_USER from '../../models/DB_USER'
    import DB_ENLIST_KNIGHT from "../../models/DB_ENLIST_KNIGHT";
    import DB_NOBILITY from "../../models/DB_NOBILITY";

    export default {
        name: "PDDashboard2",
        methods:
        {
            async addFilters()
            {
                this.$_showPageLoading();
                const users = await DB_USER.getMany();
                Promise.all(users.map(user =>
                {
                    const filters = [
                        String(user.email).trim().toLowerCase(),
                        user.referral_code,
                        String(user.full_name).trim().toLowerCase()
                    ];
                    return DB_USER.update(user.id, {filters})
                }))
                    .then(res =>
                    {
                        this.$_notify({message: 'Successfully updated filters.'});
                        this.$_hidePageLoading();
                    })
            },
            async updateEnlistKnights()
            {
                this.$_showPageLoading();

                const enlisted = await DB_ENLIST_KNIGHT.getMany();

                Promise.all(enlisted.map(async item =>
                {

                    const nobility = await DB_NOBILITY.get(item.nobility);


                    const data = {
                        nobility_badge_color: nobility.badge_color,
                        nobility_title: nobility.title
                    };

                    return DB_ENLIST_KNIGHT.update(item.id, data)
                }))
                .then(res =>
                {
                    this.$_notify({message: 'Successfully updated knights.'});
                    this.$_hidePageLoading();
                })

            }
        }
    }
</script>

<style scoped>

</style>
