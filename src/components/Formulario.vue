
<template>
    <div class="container">
        <div class="py-5 text-center">
            <h2>Controle de vistorias</h2>
        </div>

        {{ dados }}
        {{ listaComodos }}


        <div class="mb-3 shadow-sm p-3 bg-body-tertiary rounded">
            <div class="pb-2">
                <h5>Dados do imóvel</h5>
            </div>
            <div class="pb-4">
                <label for="formGroupExampleInput2" class="form-label mx-2">Tipo imóvel: </label>
                <Dropdown v-model="dados.imovel" :options="tipoImovel" showClear placeholder="Selecione um cômodo"
                    class="w-full inline" />
            </div>

            <div class="mb-3">
                <!-- separar por rua, cidade... -->
                <label for="exampleFormControlInput1" class="form-label">Endereço do imóvel</label>
                <!-- <input type="text" class="form-control" > -->
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Rua" v-model="dados.rua">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Número" v-model="dados.numero">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Bairro" v-model="dados.bairro">
                    </div>

                </div>
                <div class="row mt-2">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Cidade" v-model="dados.cidade">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Estado" v-model="dados.estado">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="CEP" v-model="dados.cep">
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label ">Data da vistoria</label>
                <div>
                    <!-- traduzir -->
                    <Calendar v-model="dados.data" class="ml-2" dateFormat="dd/mm/yy" />
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Responsável</label>
                <input type="text" class="form-control" v-model="dados.responsavel">
            </div>
            <div class="mb-3">
                <label class="form-label">Anotações</label>
                <textarea class="form-control" v-model="dados.anotacoes" rows="3"></textarea>
            </div>

        </div>

        <div class="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
            <div class="pb-3">
                <h5>Medidores</h5>
            </div>
            <div class="pb-4 input-group">
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="inputPassword6" class="col-form-label">Leitura água: </label>
                    </div>
                    <div class="col-auto">
                        <input type="text" class="form-control" v-model="dados.leituraAgua">
                    </div>
                </div>

                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="inputPassword6" class="col-form-label">Situação água: </label>
                    </div>
                    <div class="col-auto">
                        <Dropdown v-model="dados.situacaoAgua" :options="situacao" showClear placeholder="Selecione"
                            class="w-full inline" />
                    </div>
                </div>
            </div>

            <div class="pb-4 input-group">
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="inputPassword6" class="col-form-label">Leitura energia: </label>
                    </div>
                    <div class="col-auto">
                        <input type="text" class="form-control">
                    </div>
                </div>


                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="inputPassword6" class="col-form-label">Situação energia: </label>
                    </div>
                    <div class="col-auto">
                        <Dropdown v-model="dados.situacaoEnergia" :options="situacao" showClear placeholder="Selecione"
                            class="w-full inline" />

                    </div>
                </div>
            </div>
        </div>

        <div class="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
            <div class="pb-3">
                <h5>Gerais</h5>
            </div>
            <div class="mb-3">
                <label class="form-label">Faxina: </label>
                <input type="text" class="form-control" v-model="dados.faxina">
            </div>
            <div class="mb-3">
                <label class="form-label">Entulhos: </label>
                <input type="text" class="form-control" v-model="dados.entulhos">
            </div>
            <div class="mb-3">
                <label class="form-label">Pintura: </label>
                <input type="text" class="form-control" v-model="dados.pintura">
            </div>
        </div>


        <!-- Button trigger modal -->
        <Button label="Adicionar cômodo" icon="pi pi-plus" style="background-color: var(--surface-500); border: black;"
            @click="visible = true" />



        <!-- tentar colocar em um componente separado -->
        <Dialog v-model:visible="visible" position="top" modal header="Novo cômodo" :style="{ width: '70%' }">
            <div class="row">
                <div class="col">
                    <label class="mx-2 inline">Tipo de cômodo: </label>
                    <Dropdown v-model="tipo" :options="comodos" showClear placeholder="Selecione um cômodo"
                        class="w-full inline	" />
                </div>
                <div class="col">
                    <input type="text" class="form-control" v-model="dados.comodos.outros">
                </div>
            </div>

            <div class="card mt-3">
                <Accordion :activeIndex="0">
                    <AccordionTab header="Portas e janelas">
                        <div class="flex mb-1">
                            <label class="form-label">Portas: </label>
                            <div class="pb-4 input-group">
                                <div class="row g-3 align-items-center">
                                    <div class="col-auto">
                                        <InputNumber v-model="value1" show-buttons style="width: 10%;" />
                                    </div>
                                </div>

                                <div class="row g-3 align-items-center">

                                    <div class="col-auto">
                                        <input type="text" class="form-control" v-model="dados.leituraAgua">
                                    </div>
                                </div>
                            </div>

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
                <Button label="Adicionar" icon="pi pi-check" @click="adicionarComodo(tipo)" autofocus />
            </template>
        </Dialog>

        <div v-for="c in listaComodos">
            <p>{{ c }}</p>
            <p>{{ c.tipo }}</p>
            <p>{{ c.outros }}</p>
            <p>{{ c.portas }}</p>
            <p>{{ c.janelas }}</p>
            <p>{{ c.moveis }}</p>
            <p>{{ c.situacaoTeto }}</p>
            <p>{{ c.situacaoParede }}</p>
            <p>{{ c.anotacoesComodo }}</p>

        </div>


        <div>
            <button class="w-100 btn btn-secondary btn-lg" style="margin-top: 6rem;" @click="teste()" type="submit">Continue
                to checkout</button>
        </div>


        <footer class="my-5 pt-5 text-body-secondary text-center text-small">
            <p class="mb-1">&copy; 2023 Elisandra Meyer</p>
        </footer>
    </div>
</template>
  
  
<script>
import Relatorio from './Relatorio.vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';


export default {
    components: { Relatorio, Accordion, AccordionTab, Calendar, Dialog, Button, Dropdown, InputNumber },
    data() {
        return {
            count: 0,
            teste_: false,
            dados: {
                imovel: null,
                rua: null,
                numero: null,
                bairro: null,
                cidade: null,
                estado: null,
                cep: null,
                data: new Date(),
                responsavel: null,
                anotacoes: null,
                leituraAgua: null,
                situacaoAgua: null,
                leituraEnergia: null,
                situacaoEnergia: null,
                faxina: null,
                entulhos: null,
                pintura: null,
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
            visible: false,
            comodos: [
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
            tipo: null
        };
    },
    methods: {
        teste() {
            let teste = this.dados;
            this.$router.push({ name: 'relatorio', params: { nome: this.dados } })
        },
        adicionarComodo(comodo) {
            console.log(comodo);
            this.listaComodos.push(comodo);
            this.visible = false;
            this.dados.comodos.tipo = null;
        },
        cancelar() {
            this.visible = false;
            // this.dados.comodos = null;
        }
    },
}
</script>
  
  
<style scoped></style>
  