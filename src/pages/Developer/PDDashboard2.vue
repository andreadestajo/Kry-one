<template>
    <div class="q-pa-md">
        <q-list bordered class="rounded-borders">
            <q-expansion-item expand-separator label="Users Collection">
                <q-card>
                    <q-card-section>
                        <q-btn flat color="primary" @click="addContactNumber">ADD CONTACT NUMBER</q-btn>
                        <q-btn flat color="primary" @click="addCreatedAt">ADD DATE REGISTERED</q-btn>
                        <q-btn flat color="primary" @click="addKycStatus">ADD KYC STATUS</q-btn>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
    </div>
</template>

<script>
    import DB_USER from '../../models/DB_USER'

    export default {
        name: "PDDashboard2",
        methods:
        {
            async addContactNumber()
            {
                this.$_showPageLoading();
                const users = await DB_USER.getMany();
                Promise.all(users.map(user =>
                {
                    return DB_USER.update(user.id, {contact_number: '1234567891'})
                }))
                .then(res =>
                {
                    this.$_notify({message: 'Successfully added contact number.'});
                    this.$_hidePageLoading();
                })
            },
            async addCreatedAt()
            {
                this.$_showPageLoading();
                const users = await DB_USER.getMany();
                Promise.all(users.map(user =>
                {
                    return DB_USER.update(user.id, {created_at: new Date()})
                }))
                    .then(res =>
                    {
                        this.$_notify({message: 'Successfully added created at.'});
                        this.$_hidePageLoading();
                    })
            },
            async addKycStatus()
            {
                this.$_showPageLoading();
                const users = await DB_USER.getMany();
                Promise.all(users.map(user =>
                {
                    return DB_USER.update(user.id, {kyc_status: 'pending'})
                }))
                    .then(res =>
                    {
                        this.$_notify({message: 'Successfully added pending kyc status.'});
                        this.$_hidePageLoading();
                    })
            }
        }
    }
</script>

<style scoped>

</style>
