<template>
    <div class="royalties">
        <div class="royalties__list">
            <div v-for="nobility in nobilities" :key="nobility.id" class="list">
                <div class="list-badge">
                    <div :style="`background-color: ${nobility.badge_color}`" class="circle"></div>
                </div>
                <div class="list-info">
                    <div class="name">{{ nobility.title }}</div>
                    <div class="detail">
                        <span class="label q-mr-sm">Required direct:</span>  
                        <span v-if="nobility.required_direct != 0" class="value"><b>{{ nobility.required_direct }} {{ nobility.required_rank_title }}</b></span>
                        <span v-if="nobility.required_direct == 0" class="value"><b>No Requirements</b></span>
                    </div>
                    <div class="detail" v-if="nobility.price != 0">
                        <span class="label q-mr-sm">Accelerate Price</span>  
                        <div class="value"><b>{{ $_formatNumber(nobility.price, { decimal: 8 }) }} UNIQ</b></div>
                        <div class="conversion"><b><k-amount-conversion :amount="nobility.price" coin="XAU"/></b></div>
                    </div>
                    <div class="detail">
                        <div class="label">Royalties:</div>
                        <div class="value"><b>{{ nobility.perks }}</b></div>
                    </div>
                    <div class="description">{{ nobility.details }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import styles           from './PMNobilitiesRoyalties.scss';
    import DB_NOBILITY      from "../../../models/DB_NOBILITY";

    export default
    {
        name: "PMNobilitiesRoyalties",
        data:  () => (
        { 
            nobilities: [],
        }),
        mounted()
        {
            this.getNobilities();
        },
        methods:
        {
            async getNobilities()
            {
                await this.$bind('nobilities', DB_NOBILITY.collection({ order_by: 'rank_order' }));
                console.log(this.nobilities);
            },
        },
    }
</script>