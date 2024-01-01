<template>
<Dialog v-model:visible="modal" position="top" modal header="Novo cômodo" :style="{ width: '70%' }" @hide="fecharModal">
    <div class="row">
        <div class="col">
            <label class="mx-2 inline">Tipo de cômodo: </label>
            <Dropdown v-model="dados.comodos.tipo" :options="comodos" showClear placeholder="Selecione um cômodo" class="w-full inline" />
        </div>
        <div class="col">
            <input type="text" class="form-control" v-model="dados.comodos.outros">
        </div>
    </div>

    <div class="card mt-3">
        <Accordion :activeIndex="0">
            <AccordionTab header="Portas e janelas">
                <div class="mb-1">
                    <label class="form-label">Portas: </label>
                    <input type="text" class="form-control" v-model="dados.comodos.portas">
                </div>

                <div class="mb-1">
                    <label class="form-label">Janelas: </label>
                    <input type="text" class="form-control" v-model="dados.comodos.janelas">
                </div>
            </AccordionTab>
            <AccordionTab header="Móveis">
                <label class="form-label">Situação dos móveis: </label>
                <textarea class="form-control" v-model="dados.comodos.moveis" rows="3"></textarea>
            </AccordionTab>
            <AccordionTab header="Teto e parede">
                <label class="form-label">Situação do teto: </label>
                <input type="text" class="form-control" v-model="dados.comodos.situacaoTeto">

                <label class="form-label">Situação da parede: </label>
                <input type="text" class="form-control" v-model="dados.comodos.situacaoParede">
            </AccordionTab>
            <AccordionTab header="Outras anotações do cômodo">
                <textarea class="form-control" v-model="dados.comodos.anotacoesComodo" rows="3"></textarea>
            </AccordionTab>
        </Accordion>
    </div>

    <template #footer>
        <Button label="Cancelar" icon="pi pi-times" @click="cancelar()" text />
        <Button label="Adicionar" icon="pi pi-check" @click="adicionarComodo(dados.comodos)" autofocus />
    </template>
</Dialog>
</template>

<script>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Listbox from 'primevue/listbox';

export default {
    components: {
        Accordion,
        AccordionTab,
        Calendar,
        Dialog,
        Button,
        Dropdown,
        InputNumber,
        Listbox
    },
    props: {
        visible: Boolean
    },
    emits: ['close', 'adicionarComodo'],
    data() {
        return {
            dados: {
                comodos: {
                    tipo: null,
                    outros: null,
                    portas: null,
                    janelas: null,
                    moveis: null,
                    situacaoTeto: null,
                    situacaoParede: null,
                    anotacoesComodo: null,
                }
            },
            modal: this.visible,
            comodos: [ //adicionar em constantes depois
                'Quarto',
                'Cozinha',
                'Sala',
                'Banheiro',
                'Sacada',
                'Pátio',
                'Entrada',
                'Garagem',
                'Área de Serviço',
                'Copa',
                'Corredor',
                'Escadas',
                'Closet'
            ],
            tipoImovel: [
                'Apartamento',
                'Galpão',
                'Casa',
                'Chácara',
                'Kitinete',
                'Sala comercial',
                'Terreno'
            ],
            situacao: [
                'Ligada',
                'Desligada',
                'Cortada'
            ],
            listaComodos: [],
            tipo: null,
        };
    },
    methods: {
        adicionarComodo(comodo) {
            this.$emit('adicionarComodo', comodo);
            this.dados.comodos = {};
            this.modal = false;
        },
        cancelar() {
            this.modal = false;
        },
        fecharModal() {
            this.modal = false;
            this.$emit('close');
        }
    },
    watch: {
        visible() {
            this.modal = this.visible;
        }
    }
}
</script>
