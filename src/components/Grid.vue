<template>
<div class="py-5 text-center">
    <h2>Consultar vistorias</h2>
</div>

<!-- {{ vistorias[0] }} -->
{{ selecao }}

<div class="card">
    <DataTable v-model:selection="selecao" :value="vistorias" dataKey="id" tableStyle="min-width: 50rem">
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="nome" header="Nome da vistoria"></Column>
        <Column field="locatario" header="Nome do Locatário"></Column>
        <Column field="rua" header="Rua"></Column>
        <Column field="bairro" header="Bairro"></Column>
        <Column field="apto" header="Apto"></Column>
    </DataTable>
</div>

<button @click="editar()">Editar</button>
<!-- <router-link class="w-100 btn btn-secondary btn-lg" style="margin-top: 6rem;" :to="{ name: 'formulario', params: { teste: this.selecao }}">Editar</router-link> -->
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; // optional
import Row from 'primevue/row'; // optional
import {
    db
} from '@/firebase/index.js'
import {
    collection,
    getDocs
} from "firebase/firestore";

export default {
    components: {
        DataTable,
        Column,
        ColumnGroup,
        Row

    },
    props: {

    },
    // emits: ['close', 'adicionarComodo'],
    data() {
        return {
            vistorias: [],
            selecao: [],
            teste: null

        };
    },
    methods: {
        editar() {
            let teste = this.dados;
            this.$router.push({
                name: 'formulario',
                query: {
                    teste: JSON.stringify(this.selecao),
                },
            });
        },
    },
    watch: {},
    async mounted() {
        const querySnapshot = await getDocs(collection(db, "vistorias"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const vistorias = doc.data();
            vistorias.id = doc.id;
            this.vistorias.push(vistorias);
        })

        // const querySnapshot2 = await getDocs(collection(db, "/vistorias/Yf3Bv4QHrrTdTZHJ23ic/comodos"));
        // querySnapshot2.forEach((doc) => {
        // // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // this.teste.comodos = doc.data();
        // this.vistorias.push(this.teste);

        // });
    },

}
</script>
