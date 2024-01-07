<template>
<Dialog v-model:visible="modal" position="top" modal header="Novo cômodo" :style="{ width: '70%' }" @hide="fecharModal">
    <div class="row">
        <div class="col">
            <label class="mx-2 inline">Tipo de cômodo: </label>
            <Dropdown v-model="dados.comodos.tipo" filter optionLabel="nome" :options="comodos" showClear placeholder="Selecione um cômodo" class="w-full inline" />
        </div>
        <div class="col">
            <input type="text" class="form-control" v-model="dados.comodos.otipoutros">
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
            <AccordionTab header="Teto, parede e piso">
                <label class="form-label">Situação do teto: </label>
                <input type="text" class="form-control" v-model="dados.comodos.situacaoTeto">

                <label class="form-label">Situação da parede: </label>
                <input type="text" class="form-control" v-model="dados.comodos.situacaoParede">

                <label class="form-label">Situação do piso: </label>
                <input type="text" class="form-control" v-model="dados.comodos.situacaoPiso">
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
                    situacaoPiso: null,
                    anotacoesComodo: null,
                }
            },
            modal: this.visible,
            comodos: [
                { nome: 'Área de Embalagem' },
                { nome: 'Área de Estocagem' },
                { nome: 'Área de Manufatura' },
                { nome: 'Área de Montagem' },
                { nome: 'Área Fundos/Área de Serviço' },
                { nome: 'Área de Serviço' },
                { nome: 'Área de Testes' },
                { nome: 'Área Externa' },
                { nome: 'Armazém' },
                { nome: 'Banheiro' },
                { nome: 'Banheiro Suíte' },
                { nome: 'Banheiro Social' },
                { nome: 'Banheiro Comercial' },
                { nome: 'Central de Distribuição' },
                { nome: 'Clínica Odontológica' },
                { nome: 'Closet' },
                { nome: 'Cozinha' },
                { nome: 'Cozinha/Sala' },
                { nome: 'Cozinha/Refeitório' },
                { nome: 'Copa' },
                { nome: 'Corredor' },
                { nome: 'Depósito' },
                { nome: 'Entrada' },
                { nome: 'Escritório em Casa' },
                { nome: 'Espaço de Exposição' },
                { nome: 'Espaço Logístico' },
                { nome: 'Estabelecimento Comercial' },
                { nome: 'Estúdio Fotográfico' },
                { nome: 'Estúdio de Gravação' },
                { nome: 'Escadas' },
                { nome: 'Fábrica' },
                { nome: 'Fundos' },
                { nome: 'Galpão' },
                { nome: 'Garagem' },
                { nome: 'Geral' },
                { nome: 'Instalação de Fabricação' },
                { nome: 'Jardim' },
                { nome: 'Laboratório' },
                { nome: 'Laboratório Industrial' },
                { nome: 'Lavabo' },
                { nome: 'Linha de Produção' },
                { nome: 'Loja' },
                { nome: 'Lavanderia' },
                { nome: 'Oficina' },
                { nome: 'Oficina Mecânica' },
                { nome: 'Pátio' },
                { nome: 'Pátio frente' },
                { nome: 'Quarto' },
                { nome: 'Quarto Suíte' },
                { nome: 'Quarto de Criança' },
                { nome: 'Quarto de Hóspedes' },
                { nome: 'Quarto (fundos)' },
                { nome: 'Quarto (frente)' },
                { nome: 'Quarto (01)' },
                { nome: 'Quarto (02)' },
                { nome: 'Quarto (03)' },
                { nome: 'Quarto (04)' },
                { nome: 'Quarto (05)' },
                { nome: 'Recepção' },
                { nome: 'Sacada' },
                { nome: 'Sala' },
                { nome: 'Sala Primeiro Andar'},
                { nome: 'Sala Segundo Andar'},
                { nome: 'Salas' },
                { nome: 'Sala de Controle Industrial' },
                { nome: 'Sala de Espera' },
                { nome: 'Sala de Estar' },
                { nome: 'Sala de Jantar' },
                { nome: 'Sala de Reuniões' },
                { nome: 'Sala de Treinamento' },
                { nome: 'Salão de Beleza' },
                { nome: 'Suíte' },
                { nome: 'Unidade de Processamento' },
                { nome: 'Varanda' },
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
