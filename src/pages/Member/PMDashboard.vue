<template>
    <div class="dashboard">
        <div class="dashboard__header"></div>
        <div class="dashboard__nobility member__card q-mt-md">
            <div class="group">
                <div class="group-label">Your current nobility</div>
                <div class="group-value current">PLEDGER</div>
            </div>
            <div class="group">
                <div class="group-label">Your next target</div>
                <div class="group-value next">KNIGHT</div>
            </div>
            <div class="action">
                <q-btn flat class="action-button">Nobility</q-btn>
                <q-btn flat class="action-button">Accelerate</q-btn>
            </div>
        </div>

    </div>
</template>

<script>
import styles from './PMDashboard.scss';

export default
{
    name: "PMDashboard"
}
</script>

<style scoped>

</style>
